module.exports = function openBrowser(port) {
  'use strict';

  const spawn = require( 'child_process' ).spawnSync;
  const platform = require('os').platform();

  const url = `http://localhost:${port}`;

  function open(cmd) {
    spawn(cmd, [url]);
  }

  switch (platform) {
    case 'darwin':
      open('open');
      break;
    case 'win32':
      open('start');
      break;
    default:
      open('xdg-open');
      break;
  }
};

