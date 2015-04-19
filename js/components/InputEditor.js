/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    NoteAction = require('../actions/NoteAction');

module.exports = React.createClass({
  componentDidMount: function () {
    this.focus();
  },
  focus: function () {
    React.findDOMNode(this.refs.input).focus();
  },
  render: function () {
    return <input ref="input" className="note-ime"
      onKeyDown={this._handleKeyDown}
      onKeyPress={this._handleKeyPress}
    />;
  },
  _handleKeyDown: function (e) {
    if (e.keyCode === 8) {
      e.preventDefault();
      NoteAction.backspace();
    }
  },
  _handleKeyPress: function (e) {
    NoteAction.insertText(String.fromCharCode(e.charCode));
  }
});
