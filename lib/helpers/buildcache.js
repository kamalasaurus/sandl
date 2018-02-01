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
    .map(url => url.replace(new RegExp(`^${repo}\/`), ''))
    .map(url => `"${url}"`)
    .join(',\n  ');
  const footer = ['];'];

  const cache = [
      header
        .concat(filelist)
        .join('\n  ')
    ]
    .concat(footer)
    .join('\n');

  const cachename = 'precache-urls.js';

  writeFileSync(path.join(dir, cachename), cache);

  return;
};

buildcache.description = 'refresh precache list';

module.exports = buildcache;

