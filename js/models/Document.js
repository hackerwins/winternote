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
   * returns offset of node
   * @param {Node} node
   * @return {Number}
   */
  findNodeOffset: function (node) {
    return 0;
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
