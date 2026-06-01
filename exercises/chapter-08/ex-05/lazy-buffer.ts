// @ts-nocheck
import { Buffer } from "node:buffer";

export function createLazyBuffer(size: number) {
  let buffer: Buffer | null = null;

  return new Proxy(Buffer.alloc(0), {
    get(target, property, _receiver) {
      if (!buffer) {
        if (property !== "write") {
          return typeof target[property] === "function"
            ? target[property].bind(target)
            : target[property];
        }

        buffer = Buffer.alloc(size);
      }

      return typeof buffer[property] === "function"
        ? buffer[property].bind(buffer)
        : buffer[property];
    },
  });
}
