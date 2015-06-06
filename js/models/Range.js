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

  /**
   * collapse range
   * @param {Boolean} [isCollapseToStart] - default: false
   */
  collapse: function (isCollapseToStart) {
    if (isCollapseToStart) {
      this._end = this._start;
    } else {
      this._start = this._end;
    }
  },

  setBoth: function (offset) {
    this._start = offset;
    this._end = offset;
  },

  setStart: function (start) {
    this._start = start;
  },

  setEnd: function (end) {
    this._end = end;
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
