import { on } from "node:events";
import { createServer } from "node:http";
import { json } from "node:stream/consumers";

const server = createServer();
const serverIterator = on(server, "request");

server.listen(3000);

for await (const [req, res] of serverIterator) {
  try {
    const message = await json(req);
    console.log(message);
  } catch (_err) {
    res.writeHead(400);
  }

  res.end();
}
