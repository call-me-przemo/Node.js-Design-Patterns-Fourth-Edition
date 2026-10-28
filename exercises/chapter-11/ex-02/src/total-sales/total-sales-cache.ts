import { totalSales as totalSalesRaw } from "../total-sales";
import { TotalSalesCallback, type Transaction } from "../types";

const CACHE_TTL = 30 * 1000;
const cache = new Map<Transaction["product"] | null, number>();
const runningRequests = new Map<
  Transaction["product"] | null,
  Array<TotalSalesCallback>
>();

export function totalSalesCache(
  product: Transaction["product"] | null,
  cb: TotalSalesCallback,
) {
  if (cache.has(product)) {
    return queueMicrotask(() => cb(null, cache.get(product)));
  }

  if (runningRequests.has(product)) {
    const runningRequest = runningRequests.get(product);
    return runningRequest?.push(cb);
  }

  const totalSalesRawCb = createTotalSalesCacheCb(product);

  totalSalesRaw(product, totalSalesRawCb);
  runningRequests.set(product, [cb]);
}

function createTotalSalesCacheCb(
  product: Transaction["product"] | null,
): TotalSalesCallback {
  return (err, sum) => {
    const runningRequest = runningRequests.get(product);
    runningRequests.delete(product);

    if (err) {
      return runningRequest?.forEach((cb) => cb(err));
    }

    runningRequest?.forEach((cb) => cb(null, sum));
    cache.set(product, sum!);
    setTimeout(() => {
      cache.delete(product);
    }, CACHE_TTL);
  };
}
