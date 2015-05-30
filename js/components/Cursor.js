/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    NoteStore = require('../stores/NoteStore'),
    NoteConstants = require('../constants/NoteConstants'),
    _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange, NoteConstants.EVENT.RENDER);
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange, NoteConstants.EVENT.RENDER);
  },

  render: function () {
    var style = this.state.rect;
    // TODO addClass note-cursor-blink after 500ms for blink cursor
    return <div className='note-cursor' style={style}></div>;
  },

  _onChange: function () {
    this.setState(this._getState());
  },

  _getState: function () {
    var renderData = NoteStore.getEditor().getRenderData();

    return {
      rect: renderData.cursorRect
    };
  }
});
