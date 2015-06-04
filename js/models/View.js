var _ = require('lodash');

var View = function () {
  this._data = {};
};

_.extend(View.prototype, {
  setCursorRect: function (rect) {
    this._data.cursor = rect;
  },

  getData: function () {
    return this._data;
  }
});

module.exports = View;
