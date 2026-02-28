import { createColoredConsole } from "./colored-console";

const coloredConsole = createColoredConsole(console);

coloredConsole.red("This is red colored message");
coloredConsole.yellow("This is yellow colored message");
coloredConsole.green("This is green colored message");
