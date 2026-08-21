export class AsyncQueue {
  private queue = new Array();

  public enqueue(item: unknown) {
    this.queue.push(item);
  }

  async *[Symbol.asyncIterator]() {
    yield* this.queue;
  }
}
