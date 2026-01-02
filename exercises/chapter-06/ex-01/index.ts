import { createReadStream } from "node:fs";
import { resolve } from "node:path";
import { benchmarkBrotliCompress } from "./brotli-benchmark";
import { benchmarkDeflate } from "./deflate-benchmark";
import { benchmarkGzip } from "./gzip-benchmark";

const filename = resolve(process.argv[2]);

const brotliResult = await benchmarkBrotliCompress(createReadStream(filename));
const deflateResult = await benchmarkDeflate(createReadStream(filename));
const gzipResult = await benchmarkGzip(createReadStream(filename));

console.log("Brotli");
console.table(brotliResult);

console.log("Deflate");
console.table(deflateResult);

console.log("Gzip");
console.table(gzipResult);
