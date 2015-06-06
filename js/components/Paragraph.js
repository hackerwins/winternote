/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    dom = require('../utils/dom'),
    context = require('../utils/context'),
    Textrun = require('./Textrun'),
    NoteStore = require('../stores/NoteStore'),
    RenderAction = require('../actions/RenderAction');

module.exports = React.createClass({
  mixins: [context.mixin],
  componentDidMount: function () {
    this._handleCursor();
  },

  componentDidUpdate: function () {
    this._handleCursor();
  },

  render: function () {
    return <p className="note-paragraph">
             {_.map(this.props.runs, function (run, idx) {
               return <Textrun key={idx} run={run} />;
             })}
             <span>&nbsp;</span>
           </p>;
  },

  _handleCursor: function () {
    var self = this;
    var selection = NoteStore.getEditor().getSelection();
    var position = selection.getStartPosition();

    // [workaround] to avoid dispatch in the middle of a dispatch
    _.defer(function () {
      var idx = _.indexOf(self.props.runs, _.last(position.stack));
      if (idx !== -1) {
        if (selection.isCollapsed()) {
          RenderAction.renderCursor(dom.rectFromBoundaryPoint({
            container: self.getDOMNode().childNodes[idx],
            offset: position.offset
          }));
        } else {
          RenderAction.renderCursor();
        }
      }
    });
  }
});
