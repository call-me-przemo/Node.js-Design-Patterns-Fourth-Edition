import { createLazyBuffer } from "./lazy-buffer";

const lazyBuffer = createLazyBuffer(100);

console.log(lazyBuffer.toString());
console.log(lazyBuffer.length);
lazyBuffer.write("Hello");
console.log(lazyBuffer.length);
console.log(lazyBuffer.toString());
console.log(lazyBuffer instanceof Buffer);
