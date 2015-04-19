/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    Para = require('./Para.jsx'),
    InputEditor = require('./InputEditor.jsx');

module.exports = React.createClass({
  handleInsertText: function (text) {
    // TODO create range and insertText
    console.log(text);
  },
  handleMouseUp: function () {
    this.refs.inputEditor.focus();
  },
  render: function () {
    var paras = _.map([{
      type: 'p',
      text: 'hello world'
    }, {
      type: 'p',
      text: 'winternote is ...'
    }], function (para, idx) {
      if (para.type === 'p') {
        return <Para key={idx} text={para.text} />;
      } else {
        // TODO others
      }
    });

    return <div className='note-document' onMouseUp={this.handleMouseUp}>
      {paras}
      <InputEditor ref="inputEditor" onInsertText={this.handleInsertText} />
    </div>;
  }
});
