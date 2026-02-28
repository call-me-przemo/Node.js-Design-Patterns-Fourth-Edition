import { createVirtualFsAdapter } from "./virtual-fs-adapter";

const virtualFs = new Map();
const fs = createVirtualFsAdapter(virtualFs);

await fs.writeFile("sample.txt", "This is sample.txt file content");

const fileContent = await fs.readFile("sample.txt");
console.log(fileContent);

// this will throw proper error
await fs.readFile("not-exists.txt");
