const { spawnSync } = require('child_process');

module.exports = function spawn(...args) {
  return spawnSync(args.splice(0,1).join(), args, {stdio: 'inherit'});
};

