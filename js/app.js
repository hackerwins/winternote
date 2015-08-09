/*jshint browser: true*/

var React = require('react/addons'),
    Winternote = require('./components/Winternote');

window.winternote = {
  create: function (wrapper) {
    React.render(<Winternote/>, wrapper);
  }
};
