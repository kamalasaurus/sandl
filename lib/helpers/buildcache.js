const path = require('path');
const { writeFileSync } = require('fs');
const { srcfiles, topfiles, nodemodulefiles } = require(path.join(__dirname, 'filelister'));

const buildcache = function buildcache(repo = '') {

  const dir = path.join('.', repo);
  const srcs = srcfiles(dir);
  const tops = topfiles(dir);
  const modules = nodemodulefiles(dir);
  const header = ['export default ['];
  const filelist = tops
    .concat(srcs)
    .concat(modules)
    .map(url => url.replace(new RegExp(`^${repo}\/`), ''));
  const footer = ['];'];

  const cache = [
      header
        .concat(filelist)
        .join('\n  ')
    ]
    .concat(footer)
    .join('\n');

  const cachename = 'precache-urls.js';

  if (repo) {
    writeFileSync(path.join(dir, 'src', cachename), cache);
  } else {
    writeFileSync(path.join(dir, 'dist', 'src', cachename), cache);
  }

  return;
};

buildcache.description = 'refresh precache list';

module.exports = buildcache;

