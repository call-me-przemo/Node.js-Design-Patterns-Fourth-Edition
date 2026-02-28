// @ts-nocheck

import { styleText } from "node:util";

export function createColoredConsole(console: Console): ExtendedConsole {
  console.red = (msg: string) => {
    const styledMsg = styleText("red", msg);
    console.log(styledMsg);
  };

  console.yellow = (msg: string) => {
    const styledMsg = styleText("yellow", msg);
    console.log(styledMsg);
  };

  console.green = (msg: string) => {
    const styledMsg = styleText("green", msg);
    console.log(styledMsg);
  };

  return console;
}

interface ExtendedConsole extends Console {
  red: (msg: string) => void;
  yellow: (msg: string) => void;
  green: (msg: string) => void;
}
