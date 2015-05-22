var Document = require('./Document'),
    _ = require('lodash');

var Editor = function (data) {
  this._data = data;
  this._document = new Document(data);
};

_.extend(Editor.prototype, {
  moveLeft: function () {
    var selection = this._document.getSelection();
    selection.moveLeft();
  },
  moveRight: function () {
    var selection = this._document.getSelection();
    selection.moveRight();
  },
  insertText: function (text) {
    var selection = this._document.getSelection();
    selection.insertText(text);
  },
  updateText: function (text) {
    var selection = this._document.getSelection();
    selection.updateText(text);
  },
  backspace: function () {
    var selection = this._document.getSelection();
    selection.backspace();
  },
  getDocument: function () {
    return this._document;
  }

});

module.exports = Editor;
