import { equal } from "node:assert/strict";
import { suite, test } from "node:test";
import { isHotIn } from "./is-hot-in";

suite("isHotIn function", { concurrency: true }, () => {
  test("should return true, weatherClient should be called with the proper city name", async (t) => {
    const city = "Zakopane";
    const weatherClientMock = t.mock.fn(async (_city: string) => 26);

    const result = await isHotIn(weatherClientMock, city);

    equal(result, true);
    equal(weatherClientMock.mock.callCount(), 1);
    equal(weatherClientMock.mock.calls[0].arguments.length, 1);
    equal(weatherClientMock.mock.calls[0].arguments[0], city);
  });

  test("should return false, weatherClient should be called with the proper city name", async (t) => {
    const city = "Gdańsk";
    const weatherClientMock = t.mock.fn(async (_city: string) => 21);

    const result = await isHotIn(weatherClientMock, city);

    equal(result, false);
    equal(weatherClientMock.mock.callCount(), 1);
    equal(weatherClientMock.mock.calls[0].arguments.length, 1);
    equal(weatherClientMock.mock.calls[0].arguments[0], city);
  });
});
