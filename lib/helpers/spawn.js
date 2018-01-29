const { spawnSync } = require('child_process');
const { keys } = Object;

module.exports = function spawn(...args) {
  const arg0 = args.shift();
  const isObject = arg0 instanceof Object;
  const isEmptyObject = isObject && keys(arg0).length === 0;

  return isEmptyObject ?
    spawnSync(args.splice(0,1).join(), args) :
    isObject ?
      spawnSync(args.splice(0,1).join(), args, Object.assign({stdio: 'inherit'}, arg0)) :
      spawnSync(arg0, args, {stdio: 'inherit'});
};

