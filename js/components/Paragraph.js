/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    DocConstants = require('../constants/DocConstants');

module.exports = React.createClass({
  render: function () {
    return <p className="note-paragraph">
      {_.map(this.props.runs, function (run, idx) {
        return <span className="note-run" style={run.style}>
        {run.text.replace(/ /g, '\u00a0')}
        </span>;
      })}
      <span>&nbsp;</span>
    </p>;
  }
});
