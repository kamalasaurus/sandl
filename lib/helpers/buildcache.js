const path = require('path');
const { writeFileSync } = require('fs');
const { srcfiles, topfiles } = require(path.join(__dirname, 'filelister'));

const buildcache = function buildcache(repo = '') {

  const dir = path.join(process.cwd(), repo);
  const srcs = srcfiles(dir);
  const tops = topfiles(dir);
  const header = ['export default [']
  const footer = ['];']

  const cache = header
    .concat(
      tops
      .concat(srcs)
      .join(',\n\s\s')
    )
    .concat(footer)
    .join('\n');

  console.log(cache);

  const cachename = 'precache-urls.js';

  if (repo) {
    writeFileSync(path.join(dir, cachename), cache);
  } else {
    writeFileSync(path.join(dir, 'dist', cachename), cache);
  }

  return;
};

buildcache.description = 'refresh precache list';

module.exports = buildcache;

