const path = require('path');
const write = require('fs').writeFileSync;
const exit = require(path.join(__dirname, 'helpers', 'exit'));

const filename = path.join(__dirname, '..', '.env');

const config = function config(...args) {
  exit(args);

  const [ user ] = args;

  console.log(args);

  const tuple = user.split('=');
  const conf = { [tuple[0].toUpperCase()]: tuple[1] };

  write(filename, JSON.stringify(conf, null, 2));

  return;
};

config.description = 'setup sandl for git integration';
config.parameters = [
  {
    paramname: '<username=USER>',
    paramdesc: 'set username= to github username for repo generation'
  }
];

module.exports = config;

