// biome-ignore lint: style/noNamespaceImport
const bModule = require("./b");

let loaded = false;
const b = bModule;

module.exports = {
  loaded,
  b,
};

loaded = true;
