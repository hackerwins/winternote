var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants'),
    EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),
    mockDoc = require('../mockDoc');

var CHANGE_EVENT = 'change';

var DocStore = _.extend({
  doc: mockDoc
}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  insertText: function (text) {
    var run = _.last(_.last(this.doc.contents).contents);
    run.text += text;
  },
  
  updateText: function (text) {
    var run = _.last(_.last(this.doc.contents).contents);
    run.text = run.text.substring(0, run.text.length - 1) + text;
  },

  backspace: function () {
    var run = _.last(_.last(this.doc.contents).contents);
    run.text = run.text.substring(0, run.text.length - 1);
  },

  getContents: function () {
    return this.doc.contents;
  }
});

NoteDispatcher.register(function(action) {
  switch (action.actionType) {
    case NoteConstants.ACTION.INSERT_TEXT:
      DocStore.insertText(action.text);
      DocStore.emitChange();
      break;
    case NoteConstants.ACTION.UPDATE_TEXT:
      DocStore.updateText(action.text);
      DocStore.emitChange();
      break;
    case NoteConstants.ACTION.BACKSPACE:
      DocStore.backspace();
      DocStore.emitChange();
      break;
  }
});

module.exports = DocStore;
