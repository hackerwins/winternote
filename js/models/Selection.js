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

  getData: function () {
    return this._doc.getData();
  },

  moveLeft: function () {
    this._range.shift(-1, this._doc.getChracterCount());
  },

  moveRight: function () {
    this._range.shift(1, this._doc.getChracterCount());
  },

  /**
   * @param {String} text
   */
  insertText: function (text) {
    var info = this._doc.findTextrun(this._range.getStart());
    var run = info.textrun;
    var offset = info.offset;

    run.text = run.text.substr(0, offset) + text + run.text.substr(offset);
    this._range.shift(text.length, this._doc.getChracterCount());
  },

  /**
   * @param {String} text
   */
  updateText: function (text) {
    var info = this._doc.findTextrun(this._range.getStart());
    var run = info.textrun;
    var offset = info.offset;

    run.text = run.text.substr(0, offset - 1) + text + run.text.substr(offset);
  },

  /**
   * @return {Object}
   */
  getRectStyle: function () {
    // TODO for test
    return {
      top: 17,
      left: 78,
      height: 17
    }
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
