var _ = require('lodash'),
    Selection = require('../models/Selection');

var Document = function (data) {
  this._data = data;
  this._selection = new Selection(data, this);
};

_.extend(Document.prototype, {
  getSelection: function () {
    return this._selection;
  },

  getData: function () {
    return this._data;
  },

  getBody: function () {
    return this._data.body;
  },

  /**
   * @return {String}
   */
  toBodyTestString: function () {
    return JSON.stringify(this._data.body, null, '  ');
  }
});

module.exports = Document;
