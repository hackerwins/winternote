var _ = require('lodash');

/**
 * @param {Position} start
 * @param {Position} end
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

  shift: function (offset) {
    this._start += offset;
    this._end += offset;
  }
});

module.exports = Range; 
