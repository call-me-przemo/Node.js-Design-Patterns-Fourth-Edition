import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";
import { Readable } from "node:stream";

export function createReadRecord(filename: string): Readable {
  return Readable.from(
    createInterface({
      input: createReadStream(filename),
    }),
  )
    .drop(1)
    .map((chunk: string): Crime => {
      const [
        lsoaCode,
        borough,
        majorCategory,
        minorCategory,
        value,
        year,
        month,
      ] = chunk.split(",");

      return {
        lsoaCode,
        borough,
        majorCategory,
        minorCategory,
        value: Number(value),
        year: Number(year),
        month: Number(month),
      };
    });
}

export interface Crime {
  lsoaCode: string;
  borough: string;
  majorCategory: string;
  minorCategory: string;
  value: number;
  year: number;
  month: number;
}
