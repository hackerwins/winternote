var _ = require('lodash'),
    Range = require('../models/Range');

var Selection = function (data, doc) {
  var range = data.selection.range;

  this._range = new Range(range.start, range.end, this);
  this._document = doc;
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
    return this._document.getData();
  },

  moveLeft: function () {
    this._range.shift(-1, this._document.getCharacterCount());
  },

  /**
   * @param {Number} offset
   */
  moveRight: function (offset) {
    this._range.shift(offset || 1, this._document.getCharacterCount());
  },

  /**
   * @return {Position}
   */
  getStartPosition: function () {
    return this._document.findPosition(this._range.getStart());
  },

  getEndPosition: function () {
    return this._document.findPosition(this._range.getEnd());
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
