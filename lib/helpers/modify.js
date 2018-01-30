const { readFileSync, writeFileSync } = require('fs');

module.exports = function modify(filename, modifier) {
  const file = readFileSync(filename, 'utf-8');
  let output, temp;
  if (/index\.html$/.test(filename)) {
    output = file.replace(/{{ title }}/, modifier);
  } else if (/package\.json$/.test(filename)) {
    temp = JSON.parse(file);
    temp.scripts = modifier;
    output = JSON.stringify(temp, null, 2);
  } else if (/manifest\.json$/.test(filename)) {
    temp = JSON.parse(file);
    temp.name = modifier;
    temp.short_name = modifier;
    output = JSON.stringify(temp, null, 2);
  }
  writeFileSync(filename, output);
}

