// @ts-nocheck

import { styleText } from "node:util";

export function createColoredConsole(console: Console): ExtendedConsole {
  console.red = function (msg: string) {
    const styledMsg = styleText("red", msg);
    this.log(styledMsg);
  };

  console.yellow = function (msg: string) {
    const styledMsg = styleText("yellow", msg);
    this.log(styledMsg);
  };

  console.green = function (msg: string) {
    const styledMsg = styleText("green", msg);
    this.log(styledMsg);
  };

  return console;
}

interface ExtendedConsole extends Console {
  red: (msg: string) => void;
  yellow: (msg: string) => void;
  green: (msg: string) => void;
}
