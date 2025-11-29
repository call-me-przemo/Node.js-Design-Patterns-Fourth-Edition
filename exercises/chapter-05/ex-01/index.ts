import { setTimeout } from "node:timers/promises";

async function returnValueAfterOneSecond(value: unknown) {
  await setTimeout(1000);
  return value;
}

function customPromiseAll(promises: Array<Promise<unknown>>) {
  const values = new Array<unknown>();

  return new Promise((resolve, reject) => {
    for (const promise of promises) {
      promise
        .then((value) => {
          values.push(value);

          if (values.length === promises.length) {
            resolve(values);
          }
        })
        .catch(reject);
    }
  });
}

const before = Date.now();
const values = await customPromiseAll([
  returnValueAfterOneSecond(1),
  returnValueAfterOneSecond(2),
  returnValueAfterOneSecond("three"),
  returnValueAfterOneSecond(true),
]);
const after = Date.now();

console.log(after - before);
console.log(values);
