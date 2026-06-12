import { ConsoleLogger, FileLogger, HttpLogger } from "./logger";

const consoleLogger = new ConsoleLogger();

await consoleLogger.log("This is log message");
await consoleLogger.debug("This is debug message");
await consoleLogger.info("This is info message");
await consoleLogger.warn("This is warn message");
await consoleLogger.error("This is error message");

const fileLogger = new FileLogger("sample.log");

await fileLogger.log("This is log message");
await fileLogger.debug("This is debug message");
await fileLogger.info("This is info message");
await fileLogger.warn("This is warn message");
await fileLogger.error("This is error message");

const httpLogger = new HttpLogger(new URL("http://localhost:3000"));

await httpLogger.log("This is log message");
await httpLogger.debug("This is debug message");
await httpLogger.info("This is info message");
await httpLogger.warn("This is warn message");
await httpLogger.error("This is error message");
