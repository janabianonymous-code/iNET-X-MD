const fs = require("fs");
const path = require("path");

function loadCommands() {
  const commands = {};

  const files = fs.readdirSync(path.join(__dirname, "../commands"));

  for (const file of files) {
    const cmdModule = require(`../commands/${file}`);
    Object.assign(commands, cmdModule);
  }

  return commands;
}

module.exports = loadCommands;
