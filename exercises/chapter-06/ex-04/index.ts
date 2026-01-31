import { createServer } from "node:http";
import { join } from "node:path";
import { readFrames, streamFrames } from "./utils";

const appPort = process.argv[2];

const framesDir = join(import.meta.dirname, "frames");

const frames = await readFrames(framesDir);

const server = createServer(async (req, res) => {
  if (!req.headers["user-agent"]?.includes("curl")) {
    return res.end("Use curl to request the app !!!");
  }

  streamFrames(res, frames);
});

server.listen(appPort, () => {
  console.log(`Server is listening at: http://localhost:${appPort}`);
});
