/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    NoteStore = require('../stores/NoteStore'),
    Toolbar = require('./Toolbar'),
    Statusbar = require('./Statusbar'),
    Editor = require('./Editor');

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
  render: function () {
    return <div className="note">
      <Toolbar/>
      <Editor/>
      <Statusbar document={this.state.document}/>
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
