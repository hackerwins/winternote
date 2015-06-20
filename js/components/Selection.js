/*jshint browser: true, quotmark:false*/
'use strict';

var React = require('react/addons'),
    ViewStore = require('../stores/ViewStore'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = React.createClass({
  displayName: 'Selection',

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
    var editingAreaRect = editingArea && editingArea.getBoundingClientRect();

    var blockStyles;
    if (this.state.startPoint && this.state.endPoint) {
      blockStyles = [{
        display: 'block',
        left: parseInt(this.state.startPoint.left - editingAreaRect.left, 10),
        top: parseInt(this.state.startPoint.top - editingAreaRect.top, 10),
        width: 3,
        height: 17,
      }, {
        display: 'block',
        width: 0,
        height: 100
      }, {
        display: 'block',
        left: parseInt(this.state.endPoint.left - editingAreaRect.left, 10),
        top: parseInt(this.state.endPoint.top - editingAreaRect.top, 10),
        width: 3,
        height: 17
      }];
    } else {
      blockStyles = [{display: 'none'}, {display: 'none'}, {display: 'none'}];
    }

    return <div className="note-selection">
             <div style={blockStyles[0]}></div>
             <div style={blockStyles[1]}></div>
             <div style={blockStyles[2]}></div>
           </div>;
  },

  _onChange: function () {
    this.setState(this._getState());
  },

  _getState: function () {
    var data = ViewStore.getData();

    return {
      startPoint: data.startPoint,
      endPoint: data.endPoint,
      isComposition: data.isComposition
    };
  }
});
