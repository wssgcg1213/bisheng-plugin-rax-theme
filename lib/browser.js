'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
// import { Link } from 'react-router';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsonmlToReactElement = require('jsonml-to-react-element');

var _jsonmlToReactElement2 = _interopRequireDefault(_jsonmlToReactElement);

var _utils = require('jsonml.js/lib/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import VideoPlayer from './VideoPlayer';
// import ImagePreview from './ImagePreview';

function isHeading(node) {
  return (/h[1-6]/i.test(_utils2.default.getTagName(node))
  );
}

function generateSluggedId(children) {
  var headingText = children.map(function (node) {
    if (_utils2.default.isElement(node)) {
      if (_utils2.default.hasAttributes(node)) {
        return node[2] || '';
      }
      return node[1] || '';
    }
    return node;
  }).join('');
  var sluggedId = headingText.trim().replace(/\s+/g, '-');
  return sluggedId;
}

// export default doesn't work
module.exports = function (_, props) {
  return {
    converters: [
    // 增加 hash 节点标志
    [function (node) {
      return _utils2.default.isElement(node) && isHeading(node);
    }, function (node, index) {
      var children = _utils2.default.getChildren(node);
      var sluggedId = generateSluggedId(children);
      return _react2.default.createElement(_utils2.default.getTagName(node), _extends({
        key: index,
        id: sluggedId
      }, _utils2.default.getAttributes(node)), [_react2.default.createElement(
        'span',
        { key: 'title' },
        children.map(function (child) {
          return (0, _jsonmlToReactElement2.default)(child);
        })
      ), _react2.default.createElement(
        'a',
        { href: '#' + sluggedId, className: 'anchor', key: 'anchor' },
        '#'
      )]);
    }]]
  };
};