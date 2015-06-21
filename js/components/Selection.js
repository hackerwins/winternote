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
    var blockStyles;
    if (this.state.startRect && this.state.endRect) {
      var editingAreaRect = this.props.getEditingAreaRect();
      blockStyles = [{
        display: 'block',
        left: parseInt(this.state.startRect.left - editingAreaRect.left, 10),
        top: parseInt(this.state.startRect.top - editingAreaRect.top, 10),
        width: editingAreaRect.width - parseInt(this.state.startRect.left - editingAreaRect.left, 10),
        height: this.state.startRect.height,
      }, {
        display: 'block',
        width: 0,
        height: 100
      }, {
        display: 'block',
        left: 0,
        top: parseInt(this.state.endRect.top - editingAreaRect.top, 10),
        width: parseInt(this.state.endRect.left - editingAreaRect.left, 10),
        height: this.state.endRect.height
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
      startRect: data.startRect,
      endRect: data.endRect,
      isComposition: data.isComposition
    };
  }
});
