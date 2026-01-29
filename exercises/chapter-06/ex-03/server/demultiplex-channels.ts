import { Readable, Writable } from "node:stream";

export function demultiplexChannels(
  source: Readable,
  destinations: Array<Writable>,
) {
  let currentChannel = null;
  let currentLength = null;

  source
    .on("readable", () => {
      do {
        currentChannel ??= (source.read(1) as Buffer)?.readUInt8();
        currentLength ??= (source.read(4) as Buffer)?.readUInt32BE();

        if (!currentLength) {
          return;
        }

        const chunk = source.read(currentLength);

        if (!chunk) {
          return;
        }

        console.log(`Received packet from channel: ${currentChannel}`);
        destinations[currentChannel].write(chunk);

        currentChannel = null;
        currentLength = null;
      } while (source.readableLength);
    })
    .on("end", () => {
      for (const destination of destinations) {
        destination.end();
      }

      console.log("Source channel closed");
    });
}
