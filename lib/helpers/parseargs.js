const { keys } = Object;
const minimist = require('minimist');

module.exports = function parseargs(args) {
  const argv = minimist(args);

  return keys(argv)
    .filter(key => key !== '_')
    .map(k => [k, argv[k]])
    .reduce(((arr, arg) => arr.concat(arg)), [])
    .filter(arg => arg !== true)
    .reduce((set, arg) => {
      return set.add(arg);
    }, new Set(argv['_'] || []));
}

