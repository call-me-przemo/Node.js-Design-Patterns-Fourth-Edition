import { callIfNotAborted } from "./abortWrapper.js";
import { asyncRoutine } from "./asyncRoutine.js";

async function cancelable(abortSignal) {
  const resA = await callIfNotAborted(abortSignal, asyncRoutine, "A");
  console.log(resA);

  const resB = await callIfNotAborted(abortSignal, asyncRoutine, "B");
  console.log(resB);

  const resC = await callIfNotAborted(abortSignal, asyncRoutine, "C");
  console.log(resC);
}

const ac = new AbortController();
setTimeout(() => ac.abort(), 100);

try {
  await cancelable(ac.signal);
} catch (err) {
  if (err.name === "AbortError") {
    console.log("Function canceled");
  } else {
    console.error(err);
  }
}
