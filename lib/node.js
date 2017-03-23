'use strict';

var path = require('path');
var cwd = process.cwd();
var nodejieba = require('nodejieba');

module.exports = function (markdownData) {
  if (/\/theme\//i.test(markdownData.meta.filename)) {
    try {
      markdownData.package = require(path.join(cwd, markdownData.meta.filename, '../package.json'));
    } catch (err) {}
  }

  if (/(en-US|_tmp\/(internal|external)Docs\/README)/.test(markdownData.meta.filename)) {
    return markdownData;
  }

  var filename = markdownData.meta && markdownData.meta.filename && markdownData.meta.filename.replace(/^_tmp\/(internal|external)Docs\/(zh-Hans|)\//, '').replace(/\.md$/i, '');
  var title = markdownData.content && markdownData.content[1] && markdownData.content[1][0] === 'h1' && markdownData.content[1][1] || '';

  var splitPath = filename.split('/');
  var url = '';
  switch (splitPath[0]) {
    case 'guide':
      url = '/guide/' + splitPath[1];
      break;
    case 'component':
      url = '/component/' + splitPath[1];
      break;
    case 'theme':
      if (filename === 'theme/template/Theme/how-to-contribute') {
        url = '/theme/contribute';
      } else {
        url = '/theme/' + splitPath[1];
      }
      break;
    default:
      break;
  }
  markdownData.url = url;
  markdownData.path = filename;
  markdownData.body = nodejieba.cut(getJsonmlString(markdownData.content), true).join(' ');
  markdownData.title = title;
  return markdownData;
};

function getJsonmlString(jsonml) {
  var result = '';
  for (var i = 1; i < jsonml.length; i++) {
    if (Array.isArray(jsonml[i])) {
      result += getJsonmlString(jsonml[i]);
    } else if (typeof jsonml[i] === 'string') {
      result += jsonml[i] + ' ';
    }
  }
  return result;
}