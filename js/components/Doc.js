/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    DocConstants = require('../constants/DocConstants'),
    Para = require('./Para');

module.exports = React.createClass({
  render: function () {
    return <div className='note-document'>
      {_.map(this.props.contents, function (content, idx) {
        if (content.type === DocConstants.TYPE.PARA) {
          return <Para key={idx} contents={content.contents} />;
        } else {
          // TODO others
        }
      })}
    </div>;
  }
});
