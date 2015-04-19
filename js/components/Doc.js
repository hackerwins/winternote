/*jshint node: true*/
'use strict';

var React = require('react/addons'),
    _ = require('lodash'),
    Para = require('./Para');

module.exports = React.createClass({
  render: function () {
    var contents = _.map(this.props.contents, function (content, idx) {
      if (content.type === 'p') {
        return <Para key={idx} text={content.text} />;
      } else {
        // TODO others
      }
    });
    return <div className='note-document'>
      {contents}
    </div>;
  }
});
