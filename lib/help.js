const path = require('path');
const { table, getBorderCharacters } = require('table');
const commandList = require(path.join(__dirname, 'helpers', 'commands.js'))();

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
  console.log(helpText);
  return;
};

help.description = 'list valid commands';

module.exports = help;

