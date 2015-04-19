/*jshint node: true*/
'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  propTypes: {
    onInsertText: React.PropTypes.func
  },
  componentDidMount: function () {
    this.focus();
  },
  handleKeyPress: function (e) {
    this.props.onInsertText(String.fromCharCode(e.charCode));
  },
  focus: function () {
    React.findDOMNode(this.refs.input).focus();
  },
  render: function () {
    return <input ref="input" className="note-ime"
      onKeyPress={this.handleKeyPress}
    />;
  }
});
