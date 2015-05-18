var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants'),
    EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),
    Document = require('../models/Document'),
    mockData = require('../mockData');

var CHANGE_EVENT = 'change';

var NoteStore = _.extend({
  document: new Document(mockData)
}, EventEmitter.prototype, {
  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  moveLeft: function () {
    var selection = this.document.getSelection();
    selection.moveLeft();
  },

  moveRight: function () {
    var selection = this.document.getSelection();
    selection.moveRight();
  },

  insertText: function (text) {
    var selection = this.document.getSelection();
    selection.insertText(text);
  },
  
  updateText: function (text) {
    var selection = this.document.getSelection();
    selection.updateText(text);
  },

  backspace: function () {
    var selection = this.document.getSelection();
    // TODO implements
  },

  getDocument: function () {
    return this.document;
  }
});

NoteDispatcher.register(function (action) {
  switch (action.actionType) {
    case NoteConstants.ACTION.MOVE_LEFT:
      NoteStore.moveLeft();
      NoteStore.emitChange();
      break;
    case NoteConstants.ACTION.MOVE_RIGHT:
      NoteStore.moveRight();
      NoteStore.emitChange();
      break;
    case NoteConstants.ACTION.INSERT_TEXT:
      NoteStore.insertText(action.text);
      NoteStore.emitChange();
      break;
    case NoteConstants.ACTION.UPDATE_TEXT:
      NoteStore.updateText(action.text);
      NoteStore.emitChange();
      break;
    case NoteConstants.ACTION.BACKSPACE:
      NoteStore.backspace();
      NoteStore.emitChange();
      break;
  }
});

module.exports = NoteStore;
