var _ = require('lodash');

var Document = function (data) {
  this._data = data;
};

_.extend(Document.prototype, {
  /**
   * returns raw document data
   * @return {Object}
   */
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
      case 'p':
        return node.runs;
    }
  },

  /**
   * traverse document tree with DFS
   * @param {Function} callback
   * @return {Object}
   */
  _traverse: function (callback) {
    var self = this;
    var stack = [];

    return (function _traverse (node) {
      var info, items;

      stack.push(node);

      if ((info = callback(node, stack))) {
        return info;
      }

      if (self._isContainer(node)) {
        items = self._getItems(node);
        for (var idx = 0; idx < items.length; idx++) {
          if ((info = _traverse(items[idx]))) {
            return info;
          }
        }
      }

      stack.pop();
    })(this.getData());
  },

  /**
   * find position
   * @param {Number} offset
   * @return {Object} position
   * @return {Node[]} position.stack
   * @return {Number} position.offset
   */
  findPosition: function (offset) {
    var isFirstParagraph = true;
    
    return this._traverse(function (node, stack) {
      if (node.type === 'p') {
        if (isFirstParagraph) {
          isFirstParagraph = false;
        } else {
          offset -= 1;
        }
      } else if (node.type === 'r') {
        if (offset <= node.text.length) {
          return {
            stack: stack,
            offset: offset
          };
        }
        offset -= node.text.length;
      }
    });
  },

  /**
   * @return {Number}
   */
  getCharacterCount: function () {
    var isFirstParagraph = true;
    var count = 0;

    this._traverse(function (node) {
      if (node.type === 'p') {
        if (isFirstParagraph) {
          isFirstParagraph = false;
        } else {
          count += 1;
        }
      } else if (node.type === 'r') {
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
    return 'Character: ' + this.getCharacterCount() + ',' + JSON.stringify(this._data.body, null, '  ');
  }
});

module.exports = Document;
