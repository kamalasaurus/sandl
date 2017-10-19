const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));

const test = function test() {
  // test runner via ava.js
  // maybe use ttab for testing on a separate server because it takes over stdio
  return;
};

test.description = 'run sandl\'s built-in test runner';

module.exports = test;

