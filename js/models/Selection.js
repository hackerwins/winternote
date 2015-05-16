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

  /**
   * @return {TextRun}
   */
  _getTextRun: function () {
    // TODO implement by range
    return _.last(_.last(this.getData().body).runs);
  },

  /**
   * @param {String} text
   */
  insertText: function (text) {
    var run = this._getTextRun();
    run.text += text;
  },

  /**
   * @param {String} text
   */
  updateText: function (text) {
    var run = this._getTextRun();
    run.text = run.text.substring(0, run.text.length - 1) + text;
  },

  /**
   * @return {Object}
   */
  getRectStyle: function () {
    // TODO for test
    return {
      top: 17,
      left: 120,
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
