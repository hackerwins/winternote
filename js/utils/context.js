var globalContext = {};

var REACT_ID_ATTRIBUTE = 'data-reactid';

var ContextMixin = {

  componentDidMount: function() {
    var node = this.getDOMNode();
    var reactId = node.getAttribute(REACT_ID_ATTRIBUTE);
    
    globalContext[reactId] = {
      root: this.getDOMNode(),
      component: this
    };
  },

  componentWillUnmount: function () {
    var reactId = this.getDOMNode().getAttribute(REACT_ID_ATTRIBUTE);

    delete globalContext[reactId];
    globalContext[reactId] = null;
  }
};

/**
 * @param {String} reactId
 * @return {ReactComponent}
 */
var componentByReactId = function (reactId) {
  var context = globalContext[reactId];
  return context && context.component;
};

/**
 * @param {DOMNode} node
 * @return {ReactComponent}
 */
var componentByDOMNode = function (node) {
  var reactId = node.parentNode.getAttribute(REACT_ID_ATTRIBUTE);
  return componentByReactId(reactId);
};

module.exports = {
  mixin: ContextMixin,
  componentByDOMNode: componentByDOMNode
}
