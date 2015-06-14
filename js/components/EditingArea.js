/*jshint browser: true, quotmark: false*/
'use strict';

var React = require('react/addons'),
    dom = require('../utils/dom'),
    context = require('../utils/context'),
    NoteAction = require('../actions/NoteAction'),
    NoteStore = require('../stores/NoteStore'),
    Document = require('./Document'),
    Cursor = require('./Cursor'),
    InputEditor = require('./InputEditor');

module.exports = React.createClass({
  displayName: 'EditingArea',
  render: function () {
    return <div className='note-editing-area' onMouseDown={this._handleMouseDown}>
      <Cursor />
      <Document document={this.props.document} />
      <InputEditor ref='inputEditor' />
    </div>;
  },

  /**
   * returns offset From boundaryPoint
   * @param {BoundaryPoint} boundaryPoint
   * @return {Number}
   */
  _offsetFromBoundaryPoint: function (boundaryPoint) {
    var component = context.componentByDOMNode(boundaryPoint.container);

    if (!component) {
      return -1;
    }

    var position;
    if (component.props.paragraph) { // paragraph
      position = {
        stack: [component.props.paragraph.runs[boundaryPoint.offset]],
        offset: 0
      };
    } else if (component.props.run) { // textrun
      position = {
        stack: [component.props.run],
        offset: boundaryPoint.offset
      };
    }

    return NoteStore.getEditor().getDocument().findOffset(position);
  },

  _handleMouseDown: function (e) {
    var self = this;
    var inputEditor = this.refs.inputEditor;

    NoteAction.selectStart(
      self._offsetFromBoundaryPoint(dom.boundaryPointFromEvent(e))
    );

    var moveHandler = function (e) {
      // prevent browser selection
      e.preventDefault();

      NoteAction.selectEnd(
        self._offsetFromBoundaryPoint(dom.boundaryPointFromEvent(e))
      );
    };

    var upHandler = function (e) {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', upHandler);

      NoteAction.selectEnd(
        self._offsetFromBoundaryPoint(dom.boundaryPointFromEvent(e))
      );

      inputEditor.focus();
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  }
});
