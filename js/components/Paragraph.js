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

  _getCharWidth: function (ch, run) {
    // implements with view render
    return 8;
  },

  /**
   * @param {Textrun[]} runs
   * @param {Number} width
   */
  _getBreakPoints: function (runs, width) {
    var breakPoints = [];

    // [for performance]
    var stackWidth = 0, run, charWidth;
    for (var i = 0; i < runs.length; i++) {
      run = runs[i];
      for (var idx = 0; idx < run.text.length; idx++) {
        charWidth = this._getCharWidth(run.text.charAt(idx), run);
        stackWidth += charWidth;
        if (stackWidth > width) {
          breakPoints.push({
            run: i,
            ch: idx - 1
          });
          stackWidth = charWidth;
        }
      }
    }

    return breakPoints;
  },

  /**
   * @param {Textrun[]} runs
   * @param Number width
   * @return {Textrun[][]}
   */
  _splitIntoLines: function (runs, width) {
    var lines = [];
    var points = this._getBreakPoints(runs, width);

    if (!points.length) {
      return [runs];
    }

    runs = _.clone(runs);
    _.each(points, function (point) {
      var run = runs[point.run];
      var isSplit = run.text.length > point.ch;
      var line = runs.splice(0, point.run + 1);
      lines.push(line);

      if (isSplit) {
        runs.unshift(_.clone(run));
        // _.head(runs).text = _.head(runs).text.substr(point.ch);
        // _.last(line).text = _.last(line).text.substr(0, point.ch);
      }
    });

    return lines;
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
