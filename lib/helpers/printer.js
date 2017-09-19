var chalk = require('chalk');

module.exports = {
  say: function say(msg) {
    console.log(chalk.bold(msg));
    return;
  },
  shout: function shout(msg) {
    console.log(chalk.bold.green('\n\n', msg, '\n\n'));
    return;
  },
  error: function error(msg) {
    console.log(chalk.bold.red(msg));
    return;
  }
}

