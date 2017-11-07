'use strict';

const stat = require('fs').lstatSync;
const read = require('fs').readdirSync;
const write = require('fs').writeFileSync;

// change back to src when the refactor is complete
const srcDirectories = ['src/lib', 'src/modules'];

function pathGenerator(path) {
  return stat(path).isFile() ?
    path :
    read(path)
      .map(file => pathGenerator([path, file].join('/')));
}

function flatten(arr) {
  return arr.reduce(function(a, b) {
    return Array.isArray(b) ?
      a.concat(flatten(b)) :
      a.concat(b)
  }, []);
}

const srcTree = srcDirectories.map(pathGenerator)
const srcUrls = flatten(srcTree);

write('framework/modules.json', JSON.stringify(srcUrls, null, 4));

