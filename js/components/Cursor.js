/*jshint node: true*/
'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  render: function () {
    var rect = this.props.selection.getRectStyle();
    return <div className='note-cursor note-cursor-blink' style={rect}></div>;
  }
});
