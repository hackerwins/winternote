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
    return <div className="note-paragraph">
             <div className="note-selection-overlay note-overlay-under-text"></div>
             <div ref="content" className="note-paragraph-content">
               {_.map(this.props.paragraph.runs, function (run, idx) {
                 return <Textrun key={idx} run={run} />;
               })}
             </div>
           </div>;
  },

  _handleCursor: function () {
    var self = this;
    var selection = NoteStore.getEditor().getSelection();
    var position = selection.getStartPosition();
    var contentNode = React.findDOMNode(this.refs.content);

    // [workaround] to avoid dispatch in the middle of a dispatch
    _.defer(function () {
      var point = null;

      var idx = _.indexOf(self.props.paragraph.runs, _.last(position.stack));
      if (idx !== -1) {
        if (selection.isCollapsed()) {
          point = dom.rectFromBoundaryPoint({
            container: contentNode.childNodes[idx],
            offset: position.offset
          });
        }

        RenderAction.renderCursor(point);
      }
    });
  }
});
