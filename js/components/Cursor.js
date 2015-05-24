/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    NoteStore = require('../stores/NoteStore'),
    _ = require('lodash');

module.exports = React.createClass({
  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    NoteStore.addChangeListener(this._onChange, 'render');
  },

  componentWillUnmount: function() {
    NoteStore.removeChangeListener(this._onChange, 'render');
  },

  render: function () {
    var style = this.state.rect;
    console.log('render cursor', style);

    return <div className='note-cursor note-cursor-blink' style={style}></div>;
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
