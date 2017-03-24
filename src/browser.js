import React from 'react';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';
const Link = require('react-router/lib/Link');

function isHeading(node) {
  return /h[1-6]/i.test(JsonML.getTagName(node));
}

function generateSluggedId(children) {
  const headingText = children.map((node) => {
    if (JsonML.isElement(node)) {
      if (JsonML.hasAttributes(node)) {
        return node[2] || '';
      }
      return node[1] || '';
    }
    return node;
  }).join('');
  const sluggedId = headingText.trim().replace(/\s+/g, '-');
  return sluggedId;
}

// add badge
const componentMap = {
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
  toast: "rax-toast",
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
module.exports = (_, props) => {
  return {
    converters: [
      // 转换 a 标签为 react-router.Link
      [node => JsonML.isElement(node) && JsonML.getTagName(node) === 'a', (node, index) => {
        const to = node[1].href;
        if (/^(http|\/\/)/.test(to)) {
          return (<a key={index} href={to} target="_blank" title={node[1].title}>{node[2]}</a>)
        } else {
          return (<Link key={index} to={to}>{node[2]}</Link>);
        }
      }],
      // 增加 hash 节点标志
      [node => JsonML.isElement(node) && isHeading(node), (node, index) => {
        const npmBase = /alibaba-inc/.test(location.href) ? 'http://web.npm.alibaba-inc.com' : 'https://npm.taobao.org';
        const component = props && props.params && props.params.component;
        const children = JsonML.getChildren(node);
        const sluggedId = generateSluggedId(children);
        const badge = JsonML.getTagName(node) === 'h1' && component && componentMap[component] ? <a style={{marginLeft: '5px'}} href={`${npmBase}/${componentMap[component]}`} target="_blank"><img src={`${npmBase}/badge/v/${componentMap[component]}.svg`} alt="npm version" height="18" /></a> : null;
        return React.createElement(JsonML.getTagName(node), {
          key: index,
          id: sluggedId,
          ...JsonML.getAttributes(node),
        }, [
          <span key="title">{children.map(child => toReactElement(child))}</span>,
          badge,
          <a href={`#${sluggedId}`} className="anchor" key="anchor">#</a>,
        ]);
      }]
    ]
  };
};
