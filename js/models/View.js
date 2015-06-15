var _ = require('lodash');

var View = function () {
  this._data = {};
};

_.extend(View.prototype, {
  setCursorPoint: function (point) {
    this._data.cursor = point;
  },

  setComposition: function (isComposition) {
    this._data.isComposition = isComposition;
  },

  getData: function () {
    return this._data;
  }
});

module.exports = View;
