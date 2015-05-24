var _ = require('lodash'),
    Range = require('../models/Range');

var Selection = function (data, doc) {
  var range = data.selection.range;

  this._range = new Range(range.start, range.end, this);
  this._doc = doc;
};

_.extend(Selection.prototype, {
  /**
   * @return {Range}
   */
  getRange: function () {
    return this._range;
  },

  /**
   * @return {Boolean}
   */
  isCollapsed: function () {
    return this._range.isCollapsed();
  },

  /**
   * @return {Object}
   */
  getData: function () {
    return this._doc.getData();
  },

  moveLeft: function () {
    this._range.shift(-1, this._doc.getCharacterCount());
  },

  moveRight: function () {
    this._range.shift(1, this._doc.getCharacterCount());
  },

  /**
   * @param {String} text
   */
  insertText: function (text) {
    var info = this._doc.findTextrun(this._range.getStart());
    var stack = info.stack;
    var offset = info.offset;

    doc = stack[0];
    para = stack[1];
    run = stack[2];

    run.text = run.text.substr(0, offset) + text + run.text.substr(offset);
    this._range.shift(text.length, this._doc.getCharacterCount());
  },

  /**
   * @param {String} text
   */
  updateText: function (text) {
    var info = this._doc.findTextrun(this._range.getStart());
    var stack = info.stack;
    var offset = info.offset;

    doc = stack[0];
    para = stack[1];
    run = stack[2];
    var offset = info.offset;

    run.text = run.text.substr(0, offset - 1) + text + run.text.substr(offset);
  },

  backspace: function () {
    var info = this._doc.findTextrun(this._range.getStart());
    var stack = info.stack;
    var offset = info.offset;

    doc = stack[0];
    para = stack[1];
    run = stack[2];

    if (run.text.length === 0) {
      para.runs.splice(para.runs.indexOf(run), 1);
      if (!para.runs.length) {
        doc.body.splice(doc.body.indexOf(para), 1);
      }
    } else {
      run.text = run.text.substr(0, offset - 1) + run.text.substr(offset);
    }

    this._range.shift(-1, this._doc.getCharacterCount());
  },

  insertParagraph: function () {

  },

  /**
   * @return {String}
   */
  toTestString: function () {
    var range = this.getRange();
    return [
      'start:', range.getStart(),
      ', ',
      'end:', range.getEnd()
    ].join('');
  }
});

module.exports = Selection;
