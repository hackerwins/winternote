/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    Toolbar = require('./Toolbar'),
    Editor = require('./Editor');

module.exports = React.createClass({
  render: function () {
    return <div className="note">
      <Toolbar/>
      <Editor/>
    </div>;
  }
});
