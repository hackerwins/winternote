/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    ViewStore = require('../stores/ViewStore'),
    NoteConstants = require('../constants/NoteConstants'),
    _ = require('lodash');

module.exports = React.createClass({
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
    var style = this.state.cursor;
    // TODO addClass note-cursor-blink after 500ms for blink cursor
    return <div className='note-cursor' style={style}></div>;
  },

  _onChange: function () {
    this.setState(this._getState());
  },

  _getState: function () {
    var data = ViewStore.getData();

    return {
      cursor: data.cursor
    };
  }
});
