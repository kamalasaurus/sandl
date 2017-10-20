const path = require('path');
const chalk = require('chalk');
const { table, getBorderCharacters } = require('table');
const commandList = require(path.join(__dirname, 'helpers', 'commands.js'))();

const header = function header() {
  const leadSpace = (new Array(25)).join(' ');
  const title     = '   sandl!';
  const formatted = chalk.magenta.bold(title);
  const subtitle  = '   sandl is a command-line utility that makes to create modular ESNext\n Progressive Web Applications with WebAssembly, WebGL, and Mithril';
  const linebreak = chalk.yellow.bold((new Array(75)).join('='));
  const emptybar = Array.from(new Array(7), () => '');

  console.log(leadSpace, '\n');
  console.log(leadSpace, chalk.bgYellow(...emptybar));
  console.log(formatted, leadSpace.substr(title.length + 1), chalk.bgYellow.bold.cyan('', 'halp', ''));
  console.log(leadSpace, chalk.bgYellow(...emptybar));
  console.log(leadSpace, '\n');

  console.log(subtitle, '\n\n', linebreak);

  return;
};

const tableDecorator = function tableDecorator(data) {
  return table(data, {
    border: getBorderCharacters(`void`),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 4
    },
    drawJoin: () => {
      return false
    }
  });
};

const helpDecorator = function helpDecorator(commands) {
  const cmds = commands
    .map((cmd)=> {
      return cmd
        .concat(cmd.map(c => `--${c}`))
        .concat(`-${cmd.slice(-1)}`)
        .concat(commandList.get(cmd).description || help.description)
    })
    .map((cmd)=> {
      return [cmd.slice(0,-1).join(', '), cmd.slice(-1).join()];
    });
  return tableDecorator(cmds);
};

const help = function help() {
  const helpText = helpDecorator([...commandList.keys()]);
  header();
  console.log(helpText);
  return;
};

help.description = 'list valid commands';

module.exports = help;

