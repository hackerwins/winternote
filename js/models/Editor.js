var Document = require('./Document'),
    Selection = require('./Selection'),
    _ = require('lodash');

var Editor = function (data) {
  this._document = new Document(data);
  this._selection = new Selection(data, this._document);
  this._renderData = {
    cursorRect: null
  };
};

_.extend(Editor.prototype, {
  /**
   * @return {Document}
   */
  getDocument: function () {
    return this._document;
  },

  /**
   * @return {Selection}
   */
  getSelection: function () {
    return this._selection;
  },

  /**
   * @return {Object}
   */
  getRenderData: function () {
    return this._renderData;
  },

  /**
   * @param {Rect} rect
   */
  setCursorRect: function (rect) {
    this._renderData.cursorRect = rect;
  },

  moveLeft: function () {
    this._selection.moveLeft();
  },

  moveRight: function () {
    this._selection.moveRight();
  },

  /**
   * insert text
   * @param {String} text
   */
  insertText: function (text) {
    var position = this._selection.getStartPosition();
    var offset = position.offset;
    var run = _.last(position.stack);

    run.text = run.text.substr(0, offset) + text + run.text.substr(offset);
    this._selection.moveRight(text.length);
  },

  /**
   * update text
   * @param {String} text
   */
  updateText: function (text) {
    var position = this._selection.getStartPosition();
    var offset = position.offset;

    var run = _.last(position.stack);

    run.text = run.text.substr(0, offset - 1) + text + run.text.substr(offset);
  },

  /**
   * backspace
   */
  backspace: function () {
    var position = this._selection.getStartPosition();

    var offset = position.offset;
    var doc = position.stack[0];
    var para = position.stack[1];
    var run = position.stack[2];

    if (run.text.length === 0) {
      para.runs.splice(para.runs.indexOf(run), 1);
      if (!para.runs.length) {
        doc.body.splice(doc.body.indexOf(para), 1);
      }
    } else {
      run.text = run.text.substr(0, offset - 1) + run.text.substr(offset);
    }

    this._selection.moveLeft();
  },

  insertParagraph: function () {

  }
});

module.exports = Editor;
