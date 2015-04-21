/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    DocConstants = require('../constants/DocConstants'),
    Textrun = require('./Textrun');

module.exports = React.createClass({
  render: function () {
    return <p className="note-para">
      {_.map(this.props.contents, function (content, idx) {
        if (content.type === DocConstants.TYPE.TEXTRUN) {
          return <Textrun key={idx} style={content.style} text={content.text} />;
        }
      })}
    </p>;
  }
});
