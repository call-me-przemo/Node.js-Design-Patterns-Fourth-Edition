import { createWriteStream } from "node:fs";
import { createServer } from "node:net";
import { join } from "node:path";
import { createDecryptAndDecompress } from "./decrypt-and-decompress";
import { demultiplexChannels } from "./demultiplex-channels";

const [, , port, password, ...fileNames] = process.argv;

const writeStreams = fileNames.map((fileName) =>
  createWriteStream(join(import.meta.dirname, "files", fileName)),
);

const server = createServer(async (socket) => {
  const sourceStream = await createDecryptAndDecompress(password, socket);

  demultiplexChannels(sourceStream, writeStreams);
});

server.listen(port, () => console.log("Server started"));
