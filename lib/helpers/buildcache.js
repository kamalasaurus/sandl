const path = require('path');
const { srcfiles } = require(path.join(__dirname, 'filelister'));

const buildcache = function buildcache(repo = '') {

  const dir = path.join(process.cwd(), repo);
  const files = srcfiles(dir);

  const header = ['export default [\n']
  const footer = ['];']

  if (repo) {
    // write in repo directory
  } else {
    // write in dist directory, check if package.json is present
  }

  console.log(files);

  return;
};

buildcache.description = 'refresh precache list';

module.exports = buildcache;

