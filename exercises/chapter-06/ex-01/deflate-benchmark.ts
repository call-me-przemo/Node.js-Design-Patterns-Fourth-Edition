import { performance } from "node:perf_hooks";
import { PassThrough, Readable } from "node:stream";
import { pipeline } from "node:stream/promises";
import { createDeflate } from "node:zlib";

export async function benchmarkDeflate(readable: Readable) {
  const initialSizeMonitor = new PassThrough();
  const compressedSizeMonitor = new PassThrough();
  const deflate = createDeflate();

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

  await pipeline(readable, initialSizeMonitor, deflate, compressedSizeMonitor);

  const duration = performance.now() - start;

  return { initialSize, compressedSize, duration };
}
