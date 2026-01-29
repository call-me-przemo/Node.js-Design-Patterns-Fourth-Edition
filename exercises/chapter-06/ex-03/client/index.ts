import { createReadStream } from "node:fs";
import { connect } from "node:net";
import { join } from "node:path";
import { createCompressAndEncrypt } from "./compress-and-encrypt";
import { multiplexChannels } from "./multiplex-channels";

const [, , port, password, ...fileNames] = process.argv;

const readStreams = fileNames.map((fileName) =>
  createReadStream(join(import.meta.dirname, "files", fileName)),
);

const socket = connect(port, async () => {
  const destinationStream = await createCompressAndEncrypt(password, socket);

  multiplexChannels(readStreams, destinationStream);
});
