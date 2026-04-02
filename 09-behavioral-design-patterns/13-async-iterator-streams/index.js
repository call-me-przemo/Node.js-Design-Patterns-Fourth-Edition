// import split from "split2"; // v4.2.0
import { createInterface } from "node:readline/promises";

// const stream = process.stdin.pipe(split());

const stream = createInterface({
  input: process.stdin,
});

for await (const line of stream) {
  console.log(`You wrote: ${line}`);
}
