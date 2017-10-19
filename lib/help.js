const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));
const printer = require(path.join(__dirname, 'helpers', 'printer.js'));

module.exports = function help() {
  printer.say('command invalid');
  // print out the commands
  return;
};


