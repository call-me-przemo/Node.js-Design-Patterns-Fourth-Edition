import { AsyncQueue } from "./async-queue";

const asyncQueue = new AsyncQueue();

asyncQueue.enqueue(1);
asyncQueue.enqueue(2);
asyncQueue.enqueue(3);
asyncQueue.enqueue(4);
asyncQueue.enqueue(5);

for await (const el of asyncQueue) {
  console.log(el);
}
