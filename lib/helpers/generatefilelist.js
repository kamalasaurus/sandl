const path = require('path');
const glob = require('glob');

module.exports = function generatefilelist(filename, modifier) {
  return glob
    .sync(path.join(process.cwd(), 'src', '**', '*'), {nodir: true});
};

