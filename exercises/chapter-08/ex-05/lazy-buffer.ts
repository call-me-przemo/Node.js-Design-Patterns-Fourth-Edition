// @ts-nocheck

export function createLazyBuffer(size: number): Buffer {
  let buffer = null;

  return new Proxy(
    {},
    {
      get(target, property, _reciver) {
        if (!buffer && property === "write") {
          buffer = Buffer.alloc(size);
        }

        return typeof buffer[property] === "function"
          ? buffer[property].bind(buffer)
          : buffer[property];
      },
    },
  );
}
