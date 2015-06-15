var Document = require('./Document'),
    Selection = require('./Selection'),
    _ = require('lodash');

var Editor = function (data) {
  this._document = new Document(data);
  this._selection = new Selection(data, this._document);
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
   * @param {Number} offset
   */
  selectStart: function (offset) {
    this._selection.selectStart(offset === -1 ? 0 : offset);
  },

  /**
   * @param {Number} offset
   */
  selectEnd: function (offset) {
    this._selection.selectEnd(offset === -1 ? 0 : offset);
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

    // XXX
    if (text.length === 0) {
      this._selection.moveLeft();
    } else if (text.length > 1) {
      this._selection.moveRight(text.length - 1);
    }
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

    // TODO join paragraph
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

  /**
   * insert paragraph
   */
  insertParagraph: function () {
    var position = this._selection.getStartPosition();

    var doc = position.stack[0];
    var para = position.stack[1];

    // TODO split text
    doc.body.splice(doc.body.indexOf(para) + 1, 0, this._document.createParagraph());
    this._selection.selectNode(para).collapse(true);
  }
});

module.exports = Editor;
