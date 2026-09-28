import { equal, rejects } from "node:assert/strict";
import { suite, test } from "node:test";
import { fetchWithRetry } from "./fetch-with-retry";

suite("fetchWithRetry function", { concurrency: true }, () => {
  test("asyncFn fails twice and succeeds on the third attempt", async (t) => {
    let asyncFnMockCounter = 0;
    const exceptedValue = "pass";

    const asyncFnMock = t.mock.fn(async () => {
      if (asyncFnMockCounter++ === 2) {
        return exceptedValue;
      }

      throw new Error();
    });

    const maxRetries = 3;
    const value = await fetchWithRetry(asyncFnMock, maxRetries);

    equal(asyncFnMock.mock.callCount(), maxRetries);
    equal(value, exceptedValue);
  });

  test("asyncFn always fails", async (t) => {
    const expectedErr = new Error("ooops");

    const asyncFnMock = t.mock.fn(async () => {
      throw expectedErr;
    });

    const maxRetries = 8;

    await rejects(
      fetchWithRetry.bind(null, asyncFnMock, maxRetries),
      expectedErr,
    );
    equal(asyncFnMock.mock.callCount(), maxRetries);
  });
});
