const path = require('path');
const { writeFileSync, readFileSync } = require('fs');
const { srcfiles, topfiles, nodemodulefiles, shaderfiles, wasmfiles } = require(path.join(__dirname, 'filelister'));

const buildcache = function buildcache(repo = '') {

  const dir = path.join('.', repo);


  // service worker cache


  const cachename = 'service-worker.js';

  const srcs = srcfiles(dir);
  const tops = topfiles(dir);
  const modules = nodemodulefiles(dir);
  const header = ['const PRECACHE_URLS = '];
  const filelist = tops
    .concat(srcs)
    .concat(modules)
    .map(url => url.replace(new RegExp(`^${repo}\/`), ''))

  const cache = header
    .concat(JSON.stringify(filelist, null, 2))
    .join('');

  const serviceworker = readFileSync(path.join(__dirname, '..', '..', 'supplements', cachename), 'utf-8');

  const cachewithworker = [
    cache,
    serviceworker
  ].join('\n\n');

  writeFileSync(path.join(dir, cachename), cachewithworker);


  // shader cache


  const shaderheader = [ 'export default ' ];
  const shaders = shaderfiles(dir)
    .map(url => url.replace(new RegExp(`^${repo}\/`), ''))
    .reduce((obj, url) => {
      let key = url.split('.').pop().replace('"', '');
      obj[key] = obj[key].concat(url);
      return obj;
    }, {vert: [], frag: []});

  const shaderlist = shaderheader
    .concat(JSON.stringify(shaders, null, 2))
    .join('');

  const shaderlistname = 'shader-list.js';

  writeFileSync(path.join(dir, shaderlistname), shaderlist);


  // wasm cache


  const wasmheader = [ 'export default ' ];
  const wasms = wasmfiles(dir)
    .map(url => url.replace(new RegExp(`^${repo}\/`), ''))

  const wasmlist = wasmheader
    .conat(JSON.stringify(wasms, null, 2))
    .join('');

  const wasmlistname = 'wasm-list.js';

  writeFileSync(path.join(dir, wasmlistname), wasmlist);

  return;
};

buildcache.description = 'refresh precache list';

module.exports = buildcache;

