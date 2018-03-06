const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const { srcfiles, topfiles, nodemodulefiles, shaderfiles } = require(path.join(__dirname, 'filelister'));

const buildcache = function buildcache(repo = '') {

  const dir = path.join('.', repo);
  const srcs = srcfiles(dir);
  const tops = topfiles(dir);
  const modules = nodemodulefiles(dir);
  const header = ['const PRECACHE_URLS = ['];
  const filelist = tops
    .concat(srcs)
    .concat(modules)
    .map(url => url.replace(new RegExp(`^${repo}\/`), ''))
    .map(url => `"${url}"`)
    .join(',\n  ');
  const footer = ['];'];

  console.log(repo);
  console.log(modules)
  console.log(filelist)

  const cache = [
      header
        .concat(filelist)
        .join('\n  ')
    ]
    .concat(footer)
    .join('\n');

  console.log(cache);

  const serviceworker = readFileSync(path.join(__dirname, '..', '..', 'supplements', 'service-worker.js'), 'utf-8');

  const cachewithworker = [
    cache,
    serviceworker
  ].join('\n\n');

  const cachename = 'service-worker.js';

  writeFileSync(path.join(dir, cachename), cachewithworker);

  const shaders = shaderfiles(dir);

  console.log(shaders);

  //const shaderlist = [
    //shaderheader
      //.concat(shaders)
      //.join()
    //.concat(shaderfooter)
    //.join('')

  return;
};

buildcache.description = 'refresh precache list';

module.exports = buildcache;

