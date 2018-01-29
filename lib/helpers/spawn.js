const { spawnSync } = require('child_process');

module.exports = function spawn(...args) {
  console.log(args.join(' '));
  const arg0 = args.shift();
  return arg0 instanceof Object ? // arg0 can be an opts argument as well
    spawnSync(args.splice(0,1).join(), args, Object.assign({stdio: 'inherit'}, arg0)) :
    spawnSync(arg0, args, {stdio: 'inherit'});
};

