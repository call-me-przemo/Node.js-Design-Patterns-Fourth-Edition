// @ts-nocheck

export function createVirtualFsAdapter(memoryObj: Map<string, string>) {
  return {
    async readFile(filename: string) {
      if (!memoryObj.has(filename)) {
        const err = new Error(
          `ENOENT: no such file or directory, open '${filename}'`,
        );

        err.code = "ENOENT";
        err.errno = 34;
        err.path = filename;

        throw err;
      }

      return memoryObj.get(filename);
    },

    async writeFile(filename: string, content: string) {
      memoryObj.set(filename, content);
    },
  };
}
