const path = require('path');
const glob = require('glob');

module.exports = {
  allfiles() {
    return glob
      .sync(path.join(process.cwd(), '**', '*'), {nodir: true});
  },
  srcfiles() {
    return glob
      .sync(path.join(process.cwd(), 'src', '**', '*'), {nodir: true});
  },
  topfiles() {
    return glob
      .sync(path.join(process.cwd(), '*'), {nodir: true});
  }
};

