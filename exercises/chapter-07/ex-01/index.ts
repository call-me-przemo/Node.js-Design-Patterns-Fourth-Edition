import { Console, createConsole } from "./console";

const redConsole = createConsole(Console.Red);
const greenConsole = createConsole(Console.Green);
const blueConsole = createConsole(Console.Blue);

redConsole.log("This should be red");
greenConsole.log("This should be green");
blueConsole.log("This should be blue");
