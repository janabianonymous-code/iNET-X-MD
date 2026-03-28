const commands = {};

function add(name, fn) {
  commands[name] = fn;
}

module.exports = { commands, add };
