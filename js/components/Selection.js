/*jshint browser: true, quotmark:false*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    dom = require('../utils/dom'),
    meter = require('../utils/meter'),
    NoteStore = require('../stores/NoteStore'),
    ViewStore = require('../stores/ViewStore'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = React.createClass({
  displayName: 'Selection',

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
    return <div className="note-selection">
             <div/>
             <div/>
             <div/>
           </div>;
  },

  _update: function () {
    // TODO refactor below
    // TODO render inverted selection properly.
    // TODO fix flicking selection
    var selection = NoteStore.getEditor().getSelection();
    var blocks = React.findDOMNode(this).childNodes;

    if (selection.isCollapsed() || !this.state.startRect || !this.state.endRect) {
      _.each(blocks, function (block) {
        block.style.display = 'none';
      });
      return;
    }

    var editingAreaRect = this.props.getEditingAreaRect();
    var startRect = meter.rectOn(this.state.startRect, editingAreaRect);
    var endRect = meter.rectOn(this.state.endRect, editingAreaRect);

    if (meter.isSameLineRects(startRect, endRect)) {
      blocks[0].style.cssText = dom.toCssText({
        display: 'block',
        left: startRect.left,
        top: startRect.top,
        width: endRect.left - startRect.left,
        height: startRect.height
      });

      _.each(_.tail(blocks), function (block) {
        block.style.display = 'none';
      });
    } else {
      blocks[0].style.cssText = dom.toCssText({
        display: 'block',
        left: startRect.left,
        top: startRect.top,
        width: editingAreaRect.width - startRect.left,
        height: startRect.height
      });

      blocks[1].style.cssText = dom.toCssText({
        display: 'block',
        left: 0,
        top: startRect.bottom,
        width: editingAreaRect.width,
        height: endRect.top - startRect.bottom
      });

      blocks[2].style.cssText = dom.toCssText({
        display: 'block',
        left: 0,
        top: endRect.top,
        width: endRect.left,
        height: endRect.height
      });
    }
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
