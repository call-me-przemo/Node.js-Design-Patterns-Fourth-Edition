import { createCipheriv, randomBytes, scrypt } from "node:crypto";
import { compose, Duplex } from "node:stream";
import { promisify } from "node:util";
import { createGzip } from "node:zlib";

const scryptAsync = promisify(scrypt);

export async function createCompressAndEncrypt(
  password: string,
  stream: Duplex,
) {
  const key = (await scryptAsync(password, "sample-salt", 24)) as Buffer;
  const iv = randomBytes(16);
  stream.write(iv);

  return compose(createGzip(), createCipheriv("aes192", key, iv), stream);
}
