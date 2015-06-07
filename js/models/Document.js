var _ = require('lodash');

var Document = function (data) {
  this._data = data;
};

_.extend(Document.prototype, {

  /**
   * returns whether node is container or not
   * @param {Node} node
   * @return {Boolean}
   */
  _isContainer: function (node) {
    return node.type === 'doc' || node.type === 'p';
  },

  /**
   * returns item array of container
   * @param {Node} node - container
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
    var isFirstParagraph = true;

    var stack = [];
    var offset = 0;

    return (function _traverse (node) {
      var info, items;

      stack.push(node);

      if (typeof (info = callback(node, stack, offset)) !== 'undefined') {
        return info;
      }

      if (node.type === 'p') {
        if (isFirstParagraph) {
          isFirstParagraph = false;
        } else {
          offset += 1;
        }
      } else if (node.type === 'r') {
        offset += node.text.length;
      }

      if (self._isContainer(node)) {
        items = self._getItems(node);
        for (var idx = 0; idx < items.length; idx++) {
          if (typeof (info = _traverse(items[idx])) !== 'undefined') {
            return info;
          }
        }
      }

      stack.pop();
    })(this._data);
  },

  /**
   * find position
   * @param {Number} offset
   * @return {Object} position
   * @return {Node[]} position.stack - stack of nodes
   * @return {Number} position.offset
   */
  findPosition: function (offset) {
    return this._traverse(function (node, stack, startOffset) {
      if (node.type === 'r') {
        if (startOffset <= offset && offset <= startOffset + node.text.length) {
          return {
            stack: stack,
            offset: offset - startOffset
          };
        }
      }
    });
  },

  /**
   * returns offset of node
   * @param {Position} position
   * @return {Number}
   */
  findOffset: function (position) {
    var current = _.last(position.stack);
    return this._traverse(function (node, stack, offset) {
      if (current === node) {
        return offset + position.offset;
      }
    });
  },

  getNodeSize: function (node) {
    if (node.type === 'r') {
      return node.text.length;
    } else if (node.type === 'p') {
      return _.sum(node.runs, this.getNodeSize, this) + 1;
    } else if (node.type === 'doc') {
      return _.sum(node.body, this.getNodeSize, this);
    }
  },

  /**
   * returns total character count
   * @return {Number}
   */
  getCharacterCount: function () {
    var count = 0;

    this._traverse(function (node, stack, offset) {
      if (node.type === 'r') {
        count = offset + node.text.length;
      }
    });

    return count;
  },

  getBody: function () {
    return this._data.body;
  },

  createParagraph: function () {
    return {
      type: 'p',
      runs: [{
        type: 'r',
        text: ''
      }]
    };
  },

  /**
   * returns test string
   * @return {String}
   */
  inspect: function () {
    return [
      'Character: ',
      this.getCharacterCount(),
      ',',
      JSON.stringify(this._data.body, null, '  ')
    ].join('');
  }
});

module.exports = Document;
