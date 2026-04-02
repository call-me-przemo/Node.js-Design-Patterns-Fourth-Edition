const aModule = require("./a");

let loaded = false;
const a = aModule;

module.exports = {
  loaded,
  a,
};

loaded = true;
