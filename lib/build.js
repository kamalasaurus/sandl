const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));

const build = function build() {
  // convert module css into json for importable code
  // concatenate for nomodule cases
  // have concatenated asset alongside primary asset
  // run wargo / emscripten to generate webassembly
  return;
};

build.description = 'concatenate all files for nomodule usage'

module.exports = build;

