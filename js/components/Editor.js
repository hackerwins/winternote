/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    Document = require('./Document'),
    Cursor = require('./Cursor'),
    InputEditor = require('./InputEditor');

module.exports = React.createClass({
  handleMouseUp: function () {
    this.refs.inputEditor.focus();
  },

  render: function () {
    return <div className='note-editor' onMouseUp={this.handleMouseUp}>
      <Cursor/>
      <Document document={this.props.document}/>
      <InputEditor ref='inputEditor'/>
    </div>;
  }
});
