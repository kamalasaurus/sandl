const path = require('path');
const spawn = require(path.join(__dirname, 'helpers', 'spawn'));

module.exports = function serve() {
  // use static-server to deliver static assets
  // websockets to refresh page whenever there is a filechange
  // auto-lint whenever there is a filechange
  // auto-jscs whenever there is a filechange
  // auto-test whenever there is a filechange
  // auto-build whenever there is a filechange
  // jsdoc or flow integration
  return;
};


