import { join } from "node:path";
import { LoggerMiddlewareManager } from "./middleware-manager";
import {
  createSaveToFileMiddleware,
  createSendToServerMiddleware,
  logToConsole,
  serialize,
} from "./midllewares";

const loggerManager = new LoggerMiddlewareManager();

loggerManager.use(serialize);
loggerManager.use(
  createSendToServerMiddleware(new URL("http://localhost:3000")),
);
loggerManager.use(
  createSaveToFileMiddleware(join(import.meta.dirname, "log.json")),
);
loggerManager.use(logToConsole);
loggerManager.log({
  message: "Hello Node.js",
  usingMiddleware: true,
});
