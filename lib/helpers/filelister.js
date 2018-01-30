const path = require('path');
const glob = require('glob');
const { readFileSync } = require('fs');

module.exports = {
  allfiles(dir) {
    return glob
      .sync(path.join(dir, '**', '*'), {nodir: true});
  },
  srcfiles(dir) {
    return glob
      .sync(path.join(dir, 'src', '**', '*'), {nodir: true});
  },
  topfiles(dir) {
    return glob
      .sync(path.join(dir, '!(package.json|package-lock.json|README.md)'), {nodir: true});
  },
  nodemodulefiles(dir) {
    const package = readFileSync(path.join(dir, 'package.json'), 'utf-8');
    const dependencies  = Object.keys(JSON.parse(package).dependencies);
    return glob
      .sync(path.join(dir, 'node_modules', '**', `?(${dependencies.join('|')}).js`), {nodir: true});
  }
};

