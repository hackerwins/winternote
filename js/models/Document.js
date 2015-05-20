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
   * @param {Node} node
   * @return {Boolean}
   */
  _isContainer: function (node) {
    return node.type === 'doc' || node.type === 'p';
  },

  /**
   * @param {Node} node
   * @return {Node[]}
   */
  _getItems: function (node) {
    switch (node.type) {
      case 'doc':
        return node.body;
        break;
      case 'p':
        return node.runs;
        break;
    };
  },

  /**
   * traverse document tree with DFS
   * @param {Function} callback
   * @return {Object}
   */
  _traverse: function (callback) {
    var self = this;

    return (function _traverse (node) {
      var info, items;
      if (self._isContainer(node)) {
        items = self._getItems(node);
        for (var idx = 0; idx < items.length; idx++) {
          if ((info = _traverse(items[idx]))) {
            return info;
          }
        }
      }
      return callback(node);
    })(this.getData());
  },

  /**
   * @param {Number} offset
   * @return {Object}
   */
  findTextrun: function (offset) {
    return this._traverse(function (node) {
      if (node.type !== 'r') {
        return;
      }

      if (offset <= node.text.length) {
        return {
          textrun: node,
          offset: offset
        }
      }
      offset -= node.text.length;
    });
  },

  /**
   * @return {Number}
   */
  getChracterCount: function () {
    var count = 0;

    this._traverse(function (node) {
      if (node.type === 'r') {
        count += node.text.length;
      }
    });

    return count;
  },

  getBody: function () {
    return this._data.body;
  },

  /**
   * @return {String}
   */
  toBodyTestString: function () {
    return 'Character: ' + this.getChracterCount() + ',' + JSON.stringify(this._data.body, null, '  ');
  }
});

module.exports = Document;
