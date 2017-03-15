import React from 'react';
// import { Link } from 'react-router';
import toReactElement from 'jsonml-to-react-element';
import JsonML from 'jsonml.js/lib/utils';
// import VideoPlayer from './VideoPlayer';
// import ImagePreview from './ImagePreview';

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

// export default doesn't work
module.exports = (_, props) => {
  return {
    converters: [
      // 增加 hash 节点标志
      [node => JsonML.isElement(node) && isHeading(node), (node, index) => {
        const children = JsonML.getChildren(node);
        const sluggedId = generateSluggedId(children);
        return React.createElement(JsonML.getTagName(node), {
          key: index,
          id: sluggedId,
          ...JsonML.getAttributes(node),
        }, [
          <span key="title">{children.map(child => toReactElement(child))}</span>,
          <a href={`#${sluggedId}`} className="anchor" key="anchor">#</a>,
        ]);
      }]
    ]
  };
};