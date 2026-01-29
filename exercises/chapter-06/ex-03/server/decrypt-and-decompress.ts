import { createDecipheriv, scrypt } from "node:crypto";
import { once } from "node:events";
import { compose, Duplex } from "node:stream";
import { promisify } from "node:util";
import { createGunzip } from "node:zlib";

const scryptAsync = promisify(scrypt);

export async function createDecryptAndDecompress(
  password: string,
  stream: Duplex,
) {
  const key = (await scryptAsync(password, "sample-salt", 24)) as Buffer;
  await once(stream, "readable");
  const iv = stream.read(16);

  return compose(stream, createDecipheriv("aes192", key, iv), createGunzip());
}
