var _ = require('lodash');

var View = function () {
  this._data = {};
};

_.extend(View.prototype, {
  setStartPoint: function (point) {
    this._data.startPoint = point;
  },

  setEndPoint: function (point) {
    this._data.endPoint = point;
  },

  setComposition: function (isComposition) {
    this._data.isComposition = isComposition;
  },

  getData: function () {
    return this._data;
  }
});

module.exports = View;
