/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    Document = require('./Document'),
    Cursor = require('./Cursor'),
    InputEditor = require('./InputEditor');

module.exports = React.createClass({
  render: function () {
    return <div className='note-editor'>
      <Cursor/>
      <Document document={this.props.document}/>
      <InputEditor ref='inputEditor'/>
    </div>;
  }
});
