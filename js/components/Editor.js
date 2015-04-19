/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    DocStore = require('../stores/DocStore'),
    Doc = require('./Doc'),
    InputEditor = require('./InputEditor');

module.exports = React.createClass({
  getInitialState: function() {
    return this._getState();
  },
  componentDidMount: function() {
    DocStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    DocStore.removeChangeListener(this._onChange);
  },
  handleMouseUp: function () {
    this.refs.inputEditor.focus();
  },
  render: function () {
    return <div className='note-editor' onMouseUp={this.handleMouseUp}>
      <Doc contents={this.state.contents}/>
      <InputEditor ref='inputEditor'/>
    </div>;
  },
  _getState: function () {
    return {
      contents: DocStore.getContents()
    };
  },
  _onChange: function () {
    this.setState(this._getState());
  }
});
