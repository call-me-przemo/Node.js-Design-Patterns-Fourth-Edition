import { writeFile } from "node:fs/promises";

export function createSaveToFileMiddleware(filePath: string) {
  return async (message: unknown) => {
    await writeFile(filePath, message as string);

    return message;
  };
}
