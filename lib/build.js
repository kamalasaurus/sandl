const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));

const build = function build() {
  // concatenate for nomodule cases
  // have concatenated asset alongside primary asset
  return;
};

build.description = 'concatenate all files for nomodule usage'

module.exports = build;

