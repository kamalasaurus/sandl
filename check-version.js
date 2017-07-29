// since this is called in a preinstall hook, I can't depend
// on the semver package existing -__-, hence the manual check

var engines = require('../package').engines;
var pkgVersion = (engines && engines.node) || '';

var EQUALS = '=';
var GT = '>';
var LT = '<';

function compareVectors(v1, v2) {
  var length = v1.length >= v2.length ? v1.length : v2.length;

  return Array
    .apply(null, new Array(length))
    .map(function(el, i) {
      var v11 = parseInt(v1[i]) || 0;
      var v22 = parseInt(v2[i]) || 0;
      if (v11 === v22) return EQUALS;
      else if (v11 > v22) return GT;
      else return LT;
    });
}

function compareVersions(current, expected, condition) {
  var relation = compareVectors(
      current.split('.'),
      expected.split('.')
    )
    .reduceRight(function(right, left) {
      if (left === EQUALS) return right;
      else return left;
    });

  return condition.match(relation);
}

function versionMatch() {
  if (!engines) return;

  var condition = /^[<>]=?|=/.exec(pkgVersion)[0];
  var expectedVersion = /[\d+\.]+$/.exec(pkgVersion)[0];
  var currentVersion = /[\d+\.]+$/.exec(process.version)[0];

  if (condition && expectedVersion && currentVersion) {
    return compareVersions(currentVersion, expectedVersion, condition);
  }
}

if (!versionMatch()) {
  console.log(
    'Required node version ' +
    pkgVersion +
    ' not satisfied with current version ' +
    process.version
  );
  process.exit(1);
}

