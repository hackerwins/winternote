/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash');

module.exports = React.createClass({
  render: function () {
    return <span className="note-run" style={this.props.style}>
      {this.props.text.replace(/ /g, '\u00a0')}
    </span>;
  }
});
