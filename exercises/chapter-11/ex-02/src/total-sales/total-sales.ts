import { Readable } from "node:stream";
import { Level } from "level";
import type { TotalSalesCallback, Transaction } from "../types";

const db = new Level<string, Transaction>("sales", { valueEncoding: "json" });

export function totalSales(
  product: Transaction["product"] | null,
  cb: TotalSalesCallback,
) {
  const dbStream = Readable.from(db.iterator());
  const now = Date.now();

  dbStream
    .reduce(
      (acc, [_transactionId, transaction]) =>
        (acc +=
          !product || transaction.product === product ? transaction.amount : 0),
      0,
    )
    .then((sum) => {
      console.log(`totalSales() took: ${Date.now() - now}ms`);
      cb(null, sum);
    }, cb);
}
