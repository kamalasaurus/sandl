const path = require('path');
const glob = require('glob');

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
      .sync(path.join(dir, '*'), {nodir: true});
  }
};

