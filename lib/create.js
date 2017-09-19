const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));

module.exports = function create() {
  spawn('cd', process.cwd());
  spawn('git', 'init');
  spawn('curl', ''); // create git repo via command line
  spawn('npm', 'init', '-y');
  // create package.json w/ sandl scripts that serve, build, test, lint, flow type checking?
  spawn('mkdir', 'scripts', 'modules', 'styles', 'webgl', 'wasm');
  spawn('cp', '', '');  // create template html
  spawn('cp', '', '');// create service-worker.js template (in script?)
  spawn('cp', '', '');// create manifest.json template
  spawn('npm', 'install', 'mithril');
  spawn('cp', '', ''); // install mithril and include basic boilerplate
  return;
};

