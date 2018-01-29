const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));
const exit = require(path.join(__dirname, 'helpers', 'exit'));
const modify = require(path.join(__dirname, 'helpers', 'modify'));

const templatedirectory = path.join(__dirname, '..', 'skeleton');
const supplementsdirectory = path.join(__dirname, '..', 'supplements');

const scripts = JSON.parse(require(path.join(supplementsdirectory, 'scripts.json')));

const create = function create(...args) {
  exit(args);
  const [ REPO ] = args;
  const projectdirectory = path.join(process.cwd(), REPO);
  spawn('mkdir', REPO);
  spawn('git', 'init', projectdirectory);
  spawn('cp', '-r', path.join(templatedirectory, '/'), projectdirectory);
  spawn('cp', '-r', path.join(supplementsdirectory, 'icons', '/'), projectdirectory);
  spawn({cwd: projectdirectory}, 'npm', 'init', '-y');
  modify(path.join(projectdirectory, 'index.html'), REPO);
  modify(path.join(projectdirectory, 'manifest.json'), REPO);
  modify(path.join(projectdirectory, 'package.json'), scripts);
  //spawn('cp', '', ''); // create service-worker.js template (in script?), create json array for inital files
  spawn('npm', '--prefix', projectdirectory, 'install', 'mithril');
  if (process.env.TOKEN) {
    spawn('curl', '-i', `https://api.github.com/user/repos?access_token=${process.env.TOKEN}`, '-d', `{"name": "${REPO}"}`);
    spawn({cwd: projectdirectory}, 'git', 'remote', 'add', 'origin', `git@github.com:${process.env.USERNAME}/${REPO}.git`);
    spawn({cwd: projectdirectory}, 'git', 'add', '.');
    spawn({cwd: projectdirectory}, 'git', 'commit', '-m', '\'initial commit\'');
    spawn({cwd: projectdirectory}, 'git', 'push', '-u', 'origin', 'master');
  }
  return;
};

create.description = 'initialize a sandl project directory'

module.exports = create;

