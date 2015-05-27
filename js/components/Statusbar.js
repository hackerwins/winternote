/*jshint node: true*/
'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  render: function () {
    var selectionInfo = this.props.selection.toTestString();
    var bodyInfo = this.props.document.toBodyTestString();

    return <div className="note-statusbar">
      <div>Range: {selectionInfo}</div>
      <div className="note-test-body-info"><pre>{bodyInfo}</pre></div>
    </div>;
  }
});
