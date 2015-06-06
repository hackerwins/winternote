/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    NoteAction = require('../actions/NoteAction'),
    dom = require('../utils/dom'),
    Paragraph = require('./Paragraph');

module.exports = React.createClass({
  _offsetFromBoundaryPoint: function (boundaryPoint) {
    // TODO find document offset
    //  - node -> react component -> state object -> document offset
    console.log(boundaryPoint.container, boundaryPoint.offset);
    return 1;
  },

  handleMouseDown: function (e) {
    var self = this;
    var inputEditor = this.refs.inputEditor;

    NoteAction.selectStart(
      self._offsetFromBoundaryPoint(dom.boundaryPointFromEvent(e))
    );

    var moveHandler = function (e) {
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
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', upHandler);
  },

  render: function () {
    return <div className='note-document' onMouseDown={this.handleMouseDown}>
      {_.map(this.props.document.getBody(), function (node, idx) {
        if (node.type === 'p') {
          return <Paragraph key={idx} runs={node.runs} />;
        }
        // TODO implmements table, ...
      })}
    </div>;
  }
});
