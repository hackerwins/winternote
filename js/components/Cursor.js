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
    var classes = React.addons.classSet({
      'note-cursor': true,
      'note-cursor-composition': this.state.isComposition
    });

    var style;
    if (this.state.startRect) {
      var editingAreaRect = this.props.getEditingAreaRect();
      style = {
        display: 'block',
        left: parseInt(this.state.startRect.left - editingAreaRect.left - 20),
        top: parseInt(this.state.startRect.top - editingAreaRect.top),
        height: this.state.startRect.height
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
      startRect: data.startRect,
      endRect: data.endRect,
      isComposition: data.isComposition
    };
  }
});
