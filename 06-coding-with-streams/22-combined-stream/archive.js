import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream";
import { createCompressAndEncrypt } from "./combined-streams.js";

const [, , password, source] = process.argv;
const destination = `${source}.gz.enc`;

pipeline(
  createReadStream(source),
  createCompressAndEncrypt(password),
  createWriteStream(destination),
  (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  },
);
