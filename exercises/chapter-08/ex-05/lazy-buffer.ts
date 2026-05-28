// @ts-nocheck
import { Buffer } from "node:buffer";

export function createLazyBuffer(size: number) {
  let buffer: Buffer | null = null;

  return new Proxy(Buffer.alloc(0), {
    get(target, property, _receiver) {
      if (!buffer) {
        if (property === "write") {
          buffer = Buffer.alloc(size);

          return buffer.write.bind(buffer);
        }

        return typeof target[property] === "function"
          ? target[property].bind(target)
          : target[property];
      }

      return typeof buffer[property] === "function"
        ? buffer[property].bind(buffer)
        : buffer[property];
    },
  });
}
