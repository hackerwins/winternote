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

  /**
   * @param {Number} offset
   * @return {Object}
   */
  findTextrun: function (offset) {
    // DFS for documents
    return (function _traverse (node) {
      var info;
      // container case
      if (node.type === 'doc') {
        for (var idx = 0; idx < node.body.length; idx++) {
          if ((info = _traverse(node.body[idx]))) {
            return info;
          }
        }
      } else if (node.type === 'p') {
        for (var idx = 0; idx < node.runs.length; idx++) {
          if ((info = _traverse(node.runs[idx]))) {
            return info;
          }
        }
      // has visible point
      } else if (node.type === 'r') {
        if (offset <= node.text.length) {
          return {
            textrun: node,
            offset: offset
          }
        }
        offset -= node.text.length;
      }
    })(this.getData());
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
