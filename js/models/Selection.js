var _ = require('lodash'),
    Range = require('./Range');

var Selection = function (data, doc) {
  var range = data.selection.range;

  this._range = new Range(range.start, range.end);
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
   * move left
   * @param {Number} offset
   */
  moveLeft: function (offset) {
    this._range.shift(offset || -1, this._document.getCharacterCount());
  },

  /**
   * move right
   * @param {Number} offset
   */
  moveRight: function (offset) {
    this._range.shift(offset || 1, this._document.getCharacterCount());
  },

  /**
   * returns start position
   * @return {Position}
   */
  getStartPosition: function () {
    return this._document.findPosition(this._range.getStart());
  },

  /**
   * returns end position
   * @return {Position}
   */
  getEndPosition: function () {
    return this._document.findPosition(this._range.getEnd());
  },

  /**
   * @param {Number} offset
   */
  selectStart: function (offset) {
    this._range.setStart(offset);
  },

  /**
   * @param {Number} offset
   */
  selectEnd: function (offset) {
    this._range.setEnd(offset);
  },

  /**
   * select node
   * @param {Node} node
   */
  selectNode: function (node) {
    var start = this._document.findNodeOffset(node);
    var size = this._document.getNodeSize(node);

    this._range.setStart(start);
    this._range.setEnd(start + size);

    return this;
  },

  /**
   * @param {Boolean} [isCollapseToStart]
   */
  collapse: function (isCollapseToStart) {
    this._range.collapse(isCollapseToStart);
  },

  /**
   * returns test string
   * @return {String}
   */
  inspect: function () {
    var range = this.getRange();
    return [
      'start:', range.getStart(),
      ', ',
      'end:', range.getEnd()
    ].join('');
  }
});

module.exports = Selection;
