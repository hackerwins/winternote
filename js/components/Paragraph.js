/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    NoteStore = require('../stores/NoteStore'),
    RenderAction = require('../actions/RenderAction');

module.exports = React.createClass({
  componentDidMount: function () {
    this._triggerRenderCursor();
  },

  componentDidUpdate: function () {
    this._triggerRenderCursor();
  },

  render: function () {
    return <p className="note-paragraph">
      {_.map(this.props.runs, function (run, idx) {
        return <span className="note-run" style={run.style}>
        {run.text.replace(/ /g, '\u00a0')}
        </span>;
      })}
      <span>&nbsp;</span>
    </p>;
  },

  _triggerRenderCursor: function () {
    var selection = NoteStore.getEditor().getSelection();
    if (!selection.isCollapsed()) {
      return;
    }

    var position = selection.getStartPosition();
    var run = _.last(position.stack);

    var idx = _.indexOf(this.props.runs, run);
    if (idx !== -1) {
      var runNode = this.getDOMNode().childNodes[idx];
      var textNode = runNode.firstChild;
      var isLeftSide = run.text.length > position.offset;
      var rect;
      if (!run.text.length) {
        rect = runNode.boundingClientRect();
      } else {
        // TODO textRange for IE8, refactoring
        var range = document.createRange();
        if (isLeftSide) {
          range.setStart(textNode, position.offset);
          range.setEnd(textNode, position.offset + 1);
        } else {
          range.setStart(textNode, position.offset - 1);
          range.setEnd(textNode, position.offset);
        }
        rect = range.getBoundingClientRect();
      }

      RenderAction.renderCursor({
        left: isLeftSide ? rect.left : rect.right,
        top: rect.top
      });
    }
  }
});
