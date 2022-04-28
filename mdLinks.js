const { mdLinks } = require("./index.js");
const argv = process.argv;

const options = {}; // es un objeto
let path = "";

if (argv.some((x) => x === "--validate")) {
  options.validate = true;
}
if (argv.some((x) => x === "--stats")) {
  options.stats = true;
}

if (argv[0] === "mdLinks") {
  path = argv[1];
} else {
  path = argv[2];
}

mdLinks(path, options)
  .then(() => {})
  .catch((err) => {
    console.log("ERROR", err.message);
  });
