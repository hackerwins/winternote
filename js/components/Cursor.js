/*jshint browser: true, quotmark:false*/
'use strict';

var React = require('react/addons'),
    dom = require('../utils/dom'),
    meter = require('../utils/meter'),
    NoteStore = require('../stores/NoteStore'),
    ViewStore = require('../stores/ViewStore'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = React.createClass({
  displayName: 'Cursor',

  getInitialState: function() {
    return this._getState();
  },

  componentDidMount: function() {
    ViewStore.addChangeListener(this._onChange, NoteConstants.EVENT.RENDER);
    this._update();
  },

  componentWillUnmount: function() {
    ViewStore.removeChangeListener(this._onChange, NoteConstants.EVENT.RENDER);
  },

  componentDidUpdate: function () {
    this._update();
  },

  render: function () {
    return <div className={React.addons.classSet({
             'note-cursor': true,
             'note-cursor-composition': this.state.isComposition
           })}></div>;
  },

  _update: function () {
    var selection = NoteStore.getEditor().getSelection();
    var cursor = React.findDOMNode(this);

    if (selection.isCollapsed() && this.state.startRect) {
      var editingAreaRect = this.props.getEditingAreaRect();
      var startRect = meter.rectOn(this.state.startRect, editingAreaRect);

      // TODO remove constant 20
      cursor.style.cssText = dom.toCssText({
        display: 'block',
        left: startRect.left - 20,
        top: startRect.top,
        height: startRect.height
      });
    } else {
      cursor.style.display = 'none';
    }
    // TODO addClass note-cursor-blink after 500ms for blink cursor
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
