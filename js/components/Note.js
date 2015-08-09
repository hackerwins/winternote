/*jshint browser: true, quotmark:false*/
'use strict';

var React = require('react/addons'),
    NoteConstants = require('../constants/NoteConstants'),
    NoteStore = require('../stores/NoteStore'),
    EditingArea = require('./EditingArea');

module.exports = React.createClass({
  displayName: 'Note',

  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange, NoteConstants.EVENT.DOCUMENT);
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange, NoteConstants.EVENT.DOCUMENT);
  },

  render: function () {
    return <div className="note">
      <EditingArea document={this.state.document}/>
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
