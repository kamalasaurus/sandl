const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));
const exit = require(path.join(__dirname, 'helpers', 'exit'));

const templatedirectory = path.join(__dirname, '..', 'skeleton');
const supplementsdirectory = path.join(__dirname, '..', 'supplements');

const scripts = require(path.join(supplementsdirectory, 'scripts.json'));

const create = function create(...args) {
  exit(args);
  const [ REPO ] = args;
  const projectdirectory = path.join(process.cwd(), REPO);
  spawn('mkdir', REPO);
  spawn('git', 'init', projectdirectory);
  spawn('cp', '-r', path.join(templatedirectory, '*'), projectdirectory);
  spawn('cp', '-r', path.join(supplementsdirectory, 'icons', '*'), projectdirectory);
  spawn({cwd: projectdirectory}, 'npm', 'init', '-y');
  // modify manifest.json, add scripts to package.json, 
  // create package.json w/ sandl scripts that serve, build, test, lint, flow type checking?
  //spawn('cp', '', ''); // modify template html
  //spawn('cp', '', ''); // create service-worker.js template (in script?), create json array for inital files
  //spawn('cp', '', ''); // modify manifest.json template
  spawn('npm', '--prefix', projectdirectory, 'install', 'mithril');
  if (process.env.TOKEN) {
    spawn('curl', '-i', '-H', `\'Authorization: token ${process.env.TOKEN}\'`, '-d', `\'{\'name\': \'${REPO}\'}\'`, 'https://api.github.com/user/repos');
    //spawn('curl', '-u', process.env.USERNAME, 'https://api.github.com/user/repos', '-d', `\'{"name":${REPO}}\'`); // create git repo via command line
    spawn('git', 'remote', 'add', 'origin', `git@github.com:${process.env.USERNAME}/${REPO}.git`);
    spawn('git', 'commit', '-am', '\'initial commit\'');
    spawn('git', 'push', '-u', 'origin', 'master');
  }
  return;
};

create.description = 'initialize a sandl project directory'

module.exports = create;

