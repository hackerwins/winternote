/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    NoteStore = require('../stores/NoteStore'),
    Document = require('./Document'),
    Cursor = require('./Cursor'),
    InputEditor = require('./InputEditor');

module.exports = React.createClass({
  getInitialState: function() {
    return this._getState();
  },
  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange);
  },
  handleMouseUp: function () {
    this.refs.inputEditor.focus();
  },
  render: function () {
    return <div className='note-editor' onMouseUp={this.handleMouseUp}>
      <Document document={this.state.document}/>
      <Cursor selection={this.state.selection}/>
      <InputEditor ref='inputEditor'/>
    </div>;
  },
  _getState: function () {
    var doc = NoteStore.getEditor().getDocument();

    return {
      document: doc,
      selection: doc.getSelection()
    };
  },
  _onChange: function () {
    this.setState(this._getState());
  }
});
