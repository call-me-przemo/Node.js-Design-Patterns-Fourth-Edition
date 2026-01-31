import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

export async function readFrames(dir: string) {
  const files = await readdir(dir);
  const frames = files.map((file) => readFile(join(dir, file), "utf8"));

  return Promise.all(frames);
}
