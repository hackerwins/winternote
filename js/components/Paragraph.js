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
    var self = this;
    var splitRunLists = this._splitIntoLines(this.props.paragraph.runs, this.props.width);
    return <div className="note-paragraph">
             {_.map(splitRunLists, function (runs, idx) {
               return self._createLineView(runs, idx);
             })}
           </div>;
  },

  /**
   * @param {Textrun[]} runs
   * @param Number width
   * @return {Textrun[][]}
   */
  _splitIntoLines: function (runs, width) {
    // TODO split runs into lines
    return [runs];
  },

  /**
   * @param {Textrun[]} runs
   * @return {ReactElement}
   */
  _createLineView: function (runs, idx) {
    return <div key={idx} className="note-lineview">
             <div className="note-selection-overlay note-overlay-under-text"></div>
             <div ref="content" className="note-lineview-content">
               {_.map(runs, function (run, idx) {
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
