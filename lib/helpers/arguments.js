const { keys } = Object;
const minimist = require('minimist');

module.exports = function(args) {
  const argv = minimist(args);

  return new Set(
    (argv['_'] || [])
      .concat(
        keys(argv)
          .filter(key => key !== '_')
          .map(key => [key, argv[key]])
          .reduce(((arr, kv) => arr.concat(kv)), [])
          .filter(val => val !== true)
      )
  );
}

