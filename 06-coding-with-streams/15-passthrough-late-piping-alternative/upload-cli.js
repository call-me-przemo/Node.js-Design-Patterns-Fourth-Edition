import { createReadStream } from "node:fs";
import { basename } from "node:path";
import { pipeline } from "node:stream/promises";
import { createBrotliCompress } from "node:zlib";
import { createUploadStream } from "./upload.js";

const filepath = process.argv[2];
const filename = basename(filepath);

pipeline(
  createReadStream(filepath),
  createBrotliCompress(),
  createUploadStream(`${filename}.br`),
)
  .then(() => console.log("File uploaded"))
  .catch(console.error);
