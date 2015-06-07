/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    Paragraph = require('./Paragraph'),
    context = require('../utils/context');

module.exports = React.createClass({
  mixins: [context.mixin],
  render: function () {
    // XXX compute document width
    var width = 572;
    
    return <div className='note-document'>
      {_.map(this.props.document.getBody(), function (node, idx) {
        // TODO build lineviews per paragraph
        if (node.type === 'p') {
          return <Paragraph key={idx} paragraph={node} width={width} />;
        }
        // TODO implmements table, ...
      })}
    </div>;
  }
});
