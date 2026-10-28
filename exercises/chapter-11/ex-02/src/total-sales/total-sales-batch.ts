import { TotalSalesCallback, type Transaction } from "../types";
import { totalSales as totalSalesRaw } from "./total-sales";

const runningRequests = new Map<
  Transaction["product"] | null,
  Array<TotalSalesCallback>
>();

export function totalSalesBatch(
  product: Transaction["product"] | null,
  cb: TotalSalesCallback,
) {
  if (runningRequests.has(product)) {
    const runningRequest = runningRequests.get(product);
    return runningRequest?.push(cb);
  }

  const totalSalesRawCb = createTotalSalesBatchCb(product);

  totalSalesRaw(product, totalSalesRawCb);
  runningRequests.set(product, [cb]);
}

function createTotalSalesBatchCb(
  product: Transaction["product"] | null,
): TotalSalesCallback {
  return (err, sum) => {
    const runningRequest = runningRequests.get(product);
    runningRequests.delete(product);

    if (err) {
      return runningRequest?.forEach((cb) => cb(err));
    }

    runningRequest?.forEach((cb) => cb(null, sum));
  };
}
