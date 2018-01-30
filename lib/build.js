const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));
const { topfiles } = require(path.join(__dirname, 'helpers', 'filelister'));
const buildcache = require(path.join(__dirname, 'helpers', 'buildcache'));

const build = function build() {

  const files = topfiles(process.cwd());

  spawn('rm', '-rf', 'dist');
  spawn('mkdir', 'dist');
  spawn('cp', '-r', 'src', 'dist');
  files
    .forEach((file) => {
      spawn('cp', file, 'dist');
    });

  buildcache();

  // convert module css into json for importable code
  // concatenate for nomodule cases
  // have concatenated asset alongside primary asset
  // run wargo / emscripten to generate webassembly
  return;
};

build.description = 'concatenate all files for nomodule usage'

module.exports = build;

