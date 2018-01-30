const path = require('path');
const { existsSync } = require('fs');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));
const { nodemodulefiles } = require(path.join(__dirname, 'helpers', 'filelister'));
const buildcache = require(path.join(__dirname, 'helpers', 'buildcache'));
const exit = require(path.join(__dirname, 'helpers', 'exit'));

const build = function build() {

  if (!existsSync('index.html')) exit();

  spawn('rm', '-rf', 'dist');
  spawn('mkdir', 'dist');
  spawn('cp', '-r', 'src', 'dist');
  buildcache();

  nodemodulefiles('.')
    .forEach((filepath) => {
      const targetPath = ['dist']
        .concat(
          filepath
            .split(path.sep)
            .slice(0, -1)
        );
      spawn('mkdir', '-p' , ...targetPath);
      spawn('cp', filepath, targetPath.join(path.sep));
    });

  // convert module css into json for importable code
  // concatenate for nomodule cases
  // have concatenated asset alongside primary asset
  // run wargo / emscripten to generate webassembly
  return;
};

build.description = 'concatenate all files for nomodule usage';

module.exports = build;

