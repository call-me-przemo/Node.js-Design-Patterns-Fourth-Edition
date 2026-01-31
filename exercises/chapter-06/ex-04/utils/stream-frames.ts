import { Writable } from "node:stream";

export function streamFrames(writeStream: Writable, frames: Array<string>) {
  let index = 0;

  function tick() {
    writeStream.write("\u001b[2J\u001b[3J\u001b[H");
    writeStream.write(frames[index++]);
    if (index >= frames.length) {
      index = 0;
    }
  }

  setInterval(tick, 50);
}
