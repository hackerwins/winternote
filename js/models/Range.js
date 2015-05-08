var _ = require('lodash');

/**
 * @param {Position} start
 * @param {Position} end
 * @param {Selection} selection
 */
var Range = function (start, end, selection) {
  this._start = start;
  this._end = end;
  this._selection = selection;
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
  }
});

module.exports = Range; 
