import { performance } from "node:perf_hooks";
import { PassThrough, Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";

export async function benchmarkGzip(readable: Readable) {
  const initialSizeMonitor = new PassThrough();
  const compressedSizeMonitor = new PassThrough();
  const gzip = createGzip();

  let initialSize = 0;
  let compressedSize = 0;

  initialSizeMonitor.on(
    "data",
    (chunk: Buffer) => (initialSize += chunk.length),
  );
  compressedSizeMonitor.on(
    "data",
    (chunk: Buffer) => (compressedSize += chunk.length),
  );

  const start = performance.now();

  await pipeline(readable, initialSizeMonitor, gzip, compressedSizeMonitor);

  const duration = performance.now() - start;

  return { initialSize, compressedSize, duration };
}
