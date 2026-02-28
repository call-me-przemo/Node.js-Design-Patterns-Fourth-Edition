import { createTimestampedConsole } from "./timestamped-console";

const timestampedConsole = createTimestampedConsole(console);

timestampedConsole.debug("This is console.debug message");
timestampedConsole.info("This is console.info message");
timestampedConsole.log("This is console.log message");
timestampedConsole.warn("This is console.warn message");
timestampedConsole.error("This is console.error message");
timestampedConsole.count("This is console.count message");
timestampedConsole.count("This is console.count message");
timestampedConsole.count("This is console.count message");
