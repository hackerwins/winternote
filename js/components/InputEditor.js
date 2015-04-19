/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    NoteAction = require('../actions/NoteAction');

module.exports = React.createClass({
  componentDidMount: function () {
    this.focus();
  },

  render: function () {
    return <input ref="input" className="note-ime"
      onKeyDown={this._handleKeyDown}
      onKeyPress={this._handleKeyPress}
      onCompositionStart={this._handleCompositionStart}
      onCompositionUpdate={this._handleCompositionUpdate}
      onCompositionEnd={this._handleCompositionEnd}
    />;
  },

  focus: function () {
    React.findDOMNode(this.refs.input).focus();
  },

  _reset: function () {
    React.findDOMNode(this.refs.input).value = '';
  },

  _handleCompositionStart: function () {
    this._reset();
    // insert dummy text for next composition update.
    NoteAction.insertText(' ');
  },

  _handleCompositionUpdate: function (e) {
    var ch = e.data;
    NoteAction.updateText(ch);
  },

  _handleCompositionEnd: function (e) {
    var ch = e.data;
    NoteAction.updateText(ch);
  },

  _handleKeyPress: function (e) {
    var self = this;
    var ch = String.fromCharCode(e.charCode);
    NoteAction.insertText(ch);
    self._reset();
  },

  _handleKeyDown: function (e) {
    if (e.keyCode === 8) {
      NoteAction.backspace();
      this._reset();
    }
  }
});
