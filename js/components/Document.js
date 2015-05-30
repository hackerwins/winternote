/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    Paragraph = require('./Paragraph');

module.exports = React.createClass({
  render: function () {
    return <div className='note-document'>
      {_.map(this.props.document.getBody(), function (node, idx) {
        if (node.type === 'p') {
          return <Paragraph key={idx} runs={node.runs} />;
        }
        // TODO implmements table, ...
      })}
    </div>;
  }
});
