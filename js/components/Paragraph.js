/*jshint browser: true, quotmark:false*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    dom = require('../utils/dom'),
    context = require('../utils/context'),
    Textrun = require('./Textrun'),
    NoteStore = require('../stores/NoteStore'),
    RenderAction = require('../actions/RenderAction');

module.exports = React.createClass({
  displayName: 'Paragraph',
  mixins: [context.mixin],
  componentDidMount: function () {
    this._renderSelection();
  },

  componentDidUpdate: function () {
    this._renderSelection();
  },

  render: function () {
    var self = this;
    return <div className="note-paragraph">
             {_.map(this.props.paragraph.runs, function (run, idx) {
               return <Textrun key={idx} run={run} />;
             })}
           </div>;
  },

  _renderSelection: function () {
    var selection = NoteStore.getEditor().getSelection();
    this._checkRender(selection.getStartPosition(), RenderAction.renderStartPosition);

    if (!selection.isCollapsed()) {
      this._checkRender(selection.getEndPosition(), RenderAction.renderEndPosition);
    }
  },

  _checkRender: function (position, action) {
    var idx = _.indexOf(this.props.paragraph.runs, _.last(position.stack));
    if (idx === -1) {
      return;
    }

    var point = dom.rectFromBoundaryPoint({
      container: this.getDOMNode().childNodes[idx],
      offset: position.offset
    });

    // [workaround] to avoid dispatch in the middle of a dispatch
    _.defer(function () {
      action(point);
    });
  }
});
