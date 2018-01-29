const path = require('path');
const write = require('fs').writeFileSync;
const exit = require(path.join(__dirname, 'helpers', 'exit'));

const filename = path.join(__dirname, '..', '.env');

const checkvalid = function checkvalid(arg) {
  // add git config stuff here
  const validargs = [ /^username=/i, /^token=/i ];
  return validargs.some((v) => v.test(arg));
};

const guaranteeunique = function guaranteeunique(args) {
  return Array.from(new Set(args));
};

const config = function config(...args) {
  exit(args);

  const conf = guaranteeunique(args)
    .filter(checkvalid)
    .map((arg) => {
      const [k, v] = arg.split('=');
      return [k.toUpperCase(), v].join('=');
    })
    .join('\n');

  write(filename, conf);

  return;
};

config.description = 'setup sandl for git integration, do not set token to opt out of github integration';
config.parameters = [
  {
    paramname: '<username=USER>',
    paramdesc: 'set username= to github username for repo generation'
  },
  {
    paramname: '<token=TOKEN>',
    paramdesc: 'set token= github OAuth token created as described at https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/'
  }
];

module.exports = config;

