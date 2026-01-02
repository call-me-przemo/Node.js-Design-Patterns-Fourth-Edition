import {
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scryptSync,
} from "node:crypto";
import { compose, Transform } from "node:stream";
import { createGunzip, createGzip } from "node:zlib";

function createKey(password) {
  return scryptSync(password, "salt", 24);
}

export function createCompressAndEncrypt(password) {
  const key = createKey(password);
  const iv = randomBytes(16);
  let ivWrite = false;

  return compose(
    createGzip(),
    createCipheriv("aes192", key, iv),
    new Transform({
      transform(chunk, _enc, cb) {
        if (!ivWrite) {
          this.push(iv);
          ivWrite = true;
        }
        this.push(chunk);
        cb();
      },
    }),
  );
}

export function createDecryptAndDecompress(password) {
  const key = createKey(password);
  let decipheriv = null;

  return compose(
    new Transform({
      transform(chunk, _enc, cb) {
        if (!decipheriv) {
          decipheriv = createDecipheriv("aes192", key, chunk.subarray(0, 16));
          decipheriv.on("data", (chunk) => {
            this.push(chunk);
          });

          decipheriv.write(chunk.subarray(16));
          return cb();
        }

        decipheriv.write(chunk);
        cb();
      },

      flush(cb) {
        decipheriv.end();
        cb();
      },
    }),
    createGunzip(),
  );
}
