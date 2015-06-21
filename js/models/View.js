var _ = require('lodash');

var View = function () {
  this._data = {};
};

_.extend(View.prototype, {
  setStartRect: function (rect) {
    this._data.startRect = rect;
  },

  setEndRect: function (rect) {
    this._data.endRect = rect;
  },

  setComposition: function (isComposition) {
    this._data.isComposition = isComposition;
  },

  getData: function () {
    return this._data;
  }
});

module.exports = View;
