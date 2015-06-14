/*jshint browser: true, quotmark:false*/

var React = require('react/addons'),
    context = require('../utils/context');

module.exports = React.createClass({
  displayName: 'Textrun',
  mixins: [context.mixin],
  render: function () {
    var run = this.props.run;
    return <span className="note-run" style={run.style}>{run.text.replace(/ /g, '\u00a0')}</span>;
  }
});

