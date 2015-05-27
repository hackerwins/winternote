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
      <Editor document={this.state.document}/>
      <Statusbar document={this.state.document} selection={this.state.selection} />
    </div>;
  },
  _getState: function () {
    var editor = NoteStore.getEditor();

    return {
      document: editor.getDocument(),
      selection: editor.getSelection()
    };
  },
  _onChange: function () {
    this.setState(this._getState());
  }
});
