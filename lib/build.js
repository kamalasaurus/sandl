const path = require('path');
const glob = require('glog');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));

const build = function build() {
  glob
    .sync(path.join(__dirname, '**', '*')) //*.js?
    .forEach(function(route) {
      console.log(route);
    });

  // convert module css into json for importable code
  // concatenate for nomodule cases
  // have concatenated asset alongside primary asset
  // run wargo / emscripten to generate webassembly
  return;
};

build.description = 'concatenate all files for nomodule usage'

module.exports = build;

