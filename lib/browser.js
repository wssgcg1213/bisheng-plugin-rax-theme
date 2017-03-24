'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _jsonmlToReactElement = require('jsonml-to-react-element');

var _jsonmlToReactElement2 = _interopRequireDefault(_jsonmlToReactElement);

var _utils = require('jsonml.js/lib/utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = require('react-router/lib/Link');

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

// add badge
var componentMap = {
  text: 'rax-text',
  view: "rax-view",
  image: "rax-image",
  link: "rax-link",
  icon: "rax-icon",
  button: "rax-button",
  touchable: "rax-touchable",
  video: "rax-video",
  grid: "rax-grid",
  multirow: "rax-multirow",
  'scroll-view': "rax-scrollview",
  'list-view': "rax-listview",
  'recycler-view': "rax-recyclerview",
  tabheader: "rax-tabheader",
  tabbar: "rax-tabbar",
  'text-input': "rax-textinput",
  switch: "rax-switch",
  calendar: "rax-calendar",
  toast: "universal-toast",
  modal: "rax-modal",
  'refresh-control': "rax-refreshcontrol",
  picture: "rax-picture",
  player: "rax-player",
  countdown: "rax-countdown",
  slider: "rax-slider",
  transition: "universal-transition",
  asyncstorage: "universal-asyncstorage",
  gotop: "rax-gotop",
  // inner modules
  windvane: '@ali/universal-windvane',
  tracker: '@ali/universal-tracker',
  user: '@ali/universal-user',
  spm: '@ali/universal-spm',
  goldlog: '@ali/universal-goldlog',
  share: '@ali/universal-share'
};

// export default doesn't work
module.exports = function (_, props) {
  return {
    converters: [
    // 转换 a 标签为 react-router.Link
    [function (node) {
      return _utils2.default.isElement(node) && _utils2.default.getTagName(node) === 'a';
    }, function (node, index) {
      var to = node[1].href;
      if (/^(http|\/\/)/.test(to)) {
        return _react2.default.createElement(
          'a',
          { key: index, href: to, target: '_blank', title: node[1].title },
          node[2]
        );
      } else {
        return _react2.default.createElement(
          Link,
          { key: index, to: to },
          node[2]
        );
      }
    }],
    // 增加 hash 节点标志
    [function (node) {
      return _utils2.default.isElement(node) && isHeading(node);
    }, function (node, index) {
      var npmBase = /alibaba-inc/.test(location.href) ? 'http://web.npm.alibaba-inc.com' : 'https://npm.taobao.org';
      var component = props && props.params && props.params.component;
      var children = _utils2.default.getChildren(node);
      var sluggedId = generateSluggedId(children);
      var badge = _utils2.default.getTagName(node) === 'h1' && component && componentMap[component] ? _react2.default.createElement(
        'a',
        { style: { marginLeft: '5px' }, href: npmBase + '/' + componentMap[component], target: '_blank' },
        _react2.default.createElement('img', { src: npmBase + '/badge/v/' + componentMap[component] + '.svg', alt: 'npm version', height: '18' })
      ) : null;
      return _react2.default.createElement(_utils2.default.getTagName(node), _extends({
        key: index,
        id: sluggedId
      }, _utils2.default.getAttributes(node)), [_react2.default.createElement(
        'span',
        { key: 'title' },
        children.map(function (child) {
          return (0, _jsonmlToReactElement2.default)(child);
        })
      ), badge, _react2.default.createElement(
        'a',
        { href: '#' + sluggedId, className: 'anchor', key: 'anchor' },
        '#'
      )]);
    }]]
  };
};