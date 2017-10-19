const glob = require('glob').sync;
const path = require('path');

module.exports = (function commands() {
  return glob(path.join(__dirname, '..', '*.js'))
    .reduce((map, command) => {
      const name = path.basename(command).split('.').slice(0, 1).join();
      // the functions are namespaced on the map and as a set for ease of
      // manual access
      map[name] = require(command);
      return map.set([name, name.charAt(0)], map[name]);
    }, new Map());
});

