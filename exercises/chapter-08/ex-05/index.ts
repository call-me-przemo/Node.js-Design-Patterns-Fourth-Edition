import { createLazyBuffer } from "./lazy-buffer";

const lazyBuffer = createLazyBuffer(100);

lazyBuffer.write("Hello");
console.log(lazyBuffer.length);
console.log(lazyBuffer.toString());
