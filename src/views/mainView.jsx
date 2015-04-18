/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    Toolbar = require('./Toolbar.jsx'),
    Doc = require('./Doc.jsx'),
    Statusbar = require('./Statusbar.jsx');

module.exports = React.createClass({
  render: function () {
    return <div className="note-editor">
      <Toolbar/>
      <Doc/>
      <Statusbar/>
    </div>;
  }
});
