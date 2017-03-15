'use strict';
var path = require('path');
var cwd = process.cwd();

module.exports = function(markdownData) {
  if (/\/theme\//i.test(markdownData.meta.filename)) {
    try {
      markdownData.package = require(path.join(cwd, markdownData.meta.filename, '../package.json'));
    } catch (err) {}
  } 
  return markdownData;
};
