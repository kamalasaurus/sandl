const path = require('path');
const { srcfiles } = require(path.join(__dirname, 'filelister'));

const buildcache = function buildcache(repo = '') {

  const dir = path.join(process.cwd(), repo);
  const files = srcfiles(dir);

  console.log(files);

  return;
};

buildcache.description = 'refresh precache list';

module.exports = buildcache;

