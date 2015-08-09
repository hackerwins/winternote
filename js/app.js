/*jshint browser: true*/

var React = require('react/addons'),
    NoteAction = require('./actions/NoteAction.js'),
    Note = require('./components/Note');

var Winternote = function (wrapper) {
  this.moveLeft = function () {
    NoteAction.moveLeft();
  };

  this.moveRight = function () {
    NoteAction.moveRight();
  };

  this.insertText = function (text) {
    NoteAction.insertText(text);
  };

  this.backspace = function () {
    NoteAction.backspace();
  };

  React.render(<Note/>, wrapper);
};

window.winternote = {
  create: function (wrapper) {
    return new Winternote(wrapper);
  }
};
