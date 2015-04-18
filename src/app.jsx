/*jshint node:true, browser: true*/

var React = require('react/addons'),
    MainView = require('./views/MainView.jsx'),
    DocStore = require('./store/DocStore');

React.render(<MainView/>, document.getElementById('winternote'));
