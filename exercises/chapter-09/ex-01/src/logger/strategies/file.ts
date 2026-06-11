import { createWriteStream, WriteStream } from "node:fs";
import { EOL } from "node:os";
import { normalize } from "node:path";
import { LoggingStrategy } from "./types";

export class FileStrategy implements LoggingStrategy {
  private fileStream: WriteStream;

  constructor(filePath: string) {
    this.fileStream = createWriteStream(normalize(filePath));
  }

  public async log(msg: string) {
    this.fileStream.write(`LOG: ${msg}${EOL}`);
  }

  public async debug(msg: string) {
    this.fileStream.write(`DEBUG: ${msg}${EOL}`);
  }

  public async info(msg: string) {
    this.fileStream.write(`INFO: ${msg}${EOL}`);
  }

  public async warn(msg: string) {
    this.fileStream.write(`WARN: ${msg}${EOL}`);
  }

  public async error(msg: string) {
    this.fileStream.write(`ERROR: ${msg}${EOL}`);
  }
}
