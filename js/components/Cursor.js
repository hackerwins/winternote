/*jshint browser: true, quotmark:false*/
'use strict';

var React = require('react/addons'),
    ViewStore = require('../stores/ViewStore'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = React.createClass({
  displayName: 'Cursor',

  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    ViewStore.addChangeListener(this._onChange, NoteConstants.EVENT.RENDER);
  },

  componentWillUnmount: function() {
    ViewStore.removeChangeListener(this._onChange, NoteConstants.EVENT.RENDER);
  },

  render: function () {
    // TODO refactor editingArea rect
    var editingArea = document.getElementsByClassName('note-editing-area')[0];
    var rect = editingArea && editingArea.getBoundingClientRect();
    var classes = React.addons.classSet({
      'note-cursor': true,
      'note-cursor-composition': this.state.isComposition
    });

    var style;
    if (this.state.cursor) {
      style = {
        display: 'block',
        left: this.state.cursor.left - rect.left - 17,
        top: this.state.cursor.top - rect.top
      };
    } else {
      style = {
        display: 'none'
      };
    }

    // TODO addClass note-cursor-blink after 500ms for blink cursor
    return <div className={classes} style={style}></div>;
  },

  _onChange: function () {
    this.setState(this._getState());
  },

  _getState: function () {
    var data = ViewStore.getData();

    return {
      cursor: data.cursor,
      isComposition: data.isComposition
    };
  }
});
