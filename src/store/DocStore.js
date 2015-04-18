/*jshint node:true*/
'use strict';

var Rx = require('rx');

var store = function store(namespace, data) {
  if (data) {
    return localStorage.setItem(namespace, JSON.stringify(data));
  }

  var localStore = localStorage.getItem(namespace);
  return (localStore && JSON.parse(localStore)) || [];
};

module.exports = function (docId) {
  this.updates = new Rx.BehaviorSubject(store(docId));

  this.paras = this.updates.scan(function (paras, operation) {
    return operation(paras);
  });

  this.docId = docId;
  this.paras.forEach(function (paras) {
    store(docId, paras);
  });
};
