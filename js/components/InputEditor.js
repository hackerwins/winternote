/*jshint browser: true, quotmark:false*/
'use strict';

var React = require('react/addons'),
    agent = require('../utils/agent'),
    NoteAction = require('../actions/NoteAction'),
    RenderAction = require('../actions/RenderAction');

module.exports = React.createClass({
  displayName: 'InputEditor',
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
    RenderAction.renderComposition(true);
  },

  _handleCompositionUpdate: function (e) {
    var ch = e.data;
    NoteAction.updateText(ch);
  },

  _handleCompositionEnd: function (e) {
    RenderAction.renderComposition(false);

    // [workaround] for webkit
    //  - Firefox trigger compositionupdate with a same character of compositionend
    //  - when composition ended. Opposite of Firefox, webkit skip compositionupdate,
    //  - this handler only for webkit.
    if (!agent.isWebkit) {
      return;
    }

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
    // TODO design key command mapper
    if (e.keyCode === 8) {
      NoteAction.backspace();
    } else if (e.keyCode === 13) {
      NoteAction.insertParagraph();
    } else if (e.keyCode === 37) {
      NoteAction.moveLeft();
    } else if (e.keyCode === 39) {
      NoteAction.moveRight();
    } else {
      return;
    }

    // key matched
    //  - prevent default event
    e.preventDefault();
    this._reset();
  }
});
