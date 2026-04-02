import { createServer } from "node:http";
import { json } from "node:stream/consumers";

const server = createServer(async (request, response) => {
  if (request.url !== "/cmd") {
    response.writeHead(400);
    response.end();
    return;
  }

  const data = await json(request);

  console.log("Received the command:", data);
  response.writeHead(200, { "Content-Type": "application/json" });
  response.end(JSON.stringify({ ok: true }));
});

server.listen(3000, () => {
  console.log("Server started");
});
