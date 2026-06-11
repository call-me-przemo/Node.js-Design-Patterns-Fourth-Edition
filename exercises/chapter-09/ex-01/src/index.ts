import { ConsoleStrategy, FileStrategy, HttpStrategy, Logger } from "./logger";

const consoleStrategy = new ConsoleStrategy();
const consoleLogger = new Logger(consoleStrategy);

await consoleLogger.log("This is log message");
await consoleLogger.debug("This is debug message");
await consoleLogger.info("This is info message");
await consoleLogger.warn("This is warn message");
await consoleLogger.error("This is error message");

const fileStrategy = new FileStrategy("sample.log");
const fileLogger = new Logger(fileStrategy);

await fileLogger.log("This is log message");
await fileLogger.debug("This is debug message");
await fileLogger.info("This is info message");
await fileLogger.warn("This is warn message");
await fileLogger.error("This is error message");

const httpStrategy = new HttpStrategy(new URL("http://localhost:3000"));
const httpLogger = new Logger(httpStrategy);

await httpLogger.log("This is log message");
await httpLogger.debug("This is debug message");
await httpLogger.info("This is info message");
await httpLogger.warn("This is warn message");
await httpLogger.error("This is error message");
