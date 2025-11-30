import { setTimeout } from "node:timers/promises";

async function returnValueAfterOneSecond<T>(value: T) {
  await setTimeout(1000);
  return value;
}

function mapAsync<T>(
  iterable: Array<Promise<T>>,
  concurrency: number,
  callback: (el: T) => T,
) {
  const values = new Array<T>(iterable.length);
  let running = 0;
  let iterator = 0;
  let completed = 0;

  function map(
    resolve: (value: Array<T>) => void,
    reject: (reason?: any) => void,
  ) {
    while (running < concurrency && iterator < iterable.length) {
      running++;
      const index = iterator++;
      const promise = iterable[index];

      promise
        .then((value) => {
          try {
            values[index] = callback(value);
          } catch (err) {
            return reject(err);
          }

          running--;
          completed++;

          if (completed === iterable.length) {
            return resolve(values);
          }

          map(resolve, reject);
        })
        .catch(reject);
    }
  }

  return new Promise(map);
}

const values = await mapAsync(
  [
    returnValueAfterOneSecond(1),
    returnValueAfterOneSecond(2),
    returnValueAfterOneSecond(3),
    returnValueAfterOneSecond(4),
    returnValueAfterOneSecond(5),
  ],
  2,
  (el) => el * 2,
);

console.log(values);
