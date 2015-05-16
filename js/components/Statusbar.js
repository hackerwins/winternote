/*jshint node: true*/
'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  render: function () {
    var doc = this.props.document;
    var selectionInfo = doc.getSelection().toTestString();
    var bodyInfo = doc.toBodyTestString();

    return <div className="note-statusbar">
      <div>Range: {selectionInfo}</div>
      <div className="note-test-body-info"><pre>{bodyInfo}</pre></div>
    </div>;
  }
});
