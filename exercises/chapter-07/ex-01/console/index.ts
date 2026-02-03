import { BlueConsole } from "./blue-console";
import { GreenConsole } from "./green-console";
import { RedConsole } from "./red-console";

export function createConsole(color: Console) {
  return new console[color]();
}

export enum Console {
  Red = "red",
  Green = "green",
  Blue = "blue",
}

const console = {
  [Console.Red]: RedConsole,
  [Console.Green]: GreenConsole,
  [Console.Blue]: BlueConsole,
};
