var _ = require('lodash');

/**
 * @param {Number} start
 * @param {Number} end
 */
var Range = function (start, end) {
  this._start = start;
  this._end = end;
};

_.extend(Range.prototype, {
  /**
   * @return {Position}
   */
  getStart: function () {
    return this._start;
  },

  /**
   * @return {Position}
   */
  getEnd: function () {
    return this._end;
  },

  /**
   * @return {Boolean}
   */
  isCollapsed: function () {
    return this._start === this._end;
  },

  shift: function (offset, chracterCount) {
    if (0 <= this._start + offset && this._start + offset <= chracterCount) {
      this._start += offset;
    }

    if (0 <= this._end + offset && this._end + offset <= chracterCount) {
      this._end += offset;
    }
  }
});

module.exports = Range; 
