const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));

const templatedirectory = path.join(__dirname, '..', 'templates');

const create = function create(...args) {
  const [ REPO ] = args;
  const projectdirectory = path.join(process.cwd(), REPO);
  spawn('mkdir', REPO);
  spawn('git', 'init', projectdirectory);
  spawn('cp', '-r', path.join(templatedirectory, '/'), projectdirectory);
  //spawn('curl', '-u', USER, 'https://api.github.com/user/repos', '-d', `\'{"name":${REPO}}\'`); // create git repo via command line
  //spawn('cp', '', '');// copy .gitignore
  //spawn('npm', 'init', '-y');
  //// create package.json w/ sandl scripts that serve, build, test, lint, flow type checking?
  //spawn('mkdir', 'scripts', 'modules', 'styles', 'webgl', 'wasm');
  //spawn('cp', '', '');  // create template html
  //spawn('cp', '', '');// create service-worker.js template (in script?)
  //spawn('cp', '', '');// create manifest.json template
  //spawn('npm', 'install', 'mithril');
  //spawn('cp', '', ''); // install mithril and include basic boilerplate
  //spawn('git', 'remote', 'add', 'origin', `git@github.com:${USER}/${REPO}.git`);
  //spawn('git', 'push', '-u', 'origin', 'master');
  return;
};

create.description = 'initialize a sandl project directory'

module.exports = create;

