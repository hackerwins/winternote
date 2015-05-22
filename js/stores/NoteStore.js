var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants'),
    EventEmitter = require('events').EventEmitter,
    _ = require('lodash'),
    Editor = require('../models/Editor'),
    mockData = require('../mockData');

var CHANGE_EVENT = 'change';

var NoteStore = _.extend({
  editor: new Editor(mockData)
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

  getEditor: function () {
    return this.editor;
  }
});

NoteDispatcher.register(function (action) {
  var editor = NoteStore.getEditor();

  switch (action.actionType) {
    case NoteConstants.ACTION.MOVE_LEFT:
      editor.moveLeft();
      NoteStore.emitChange();
      break;
    case NoteConstants.ACTION.MOVE_RIGHT:
      editor.moveRight();
      NoteStore.emitChange();
      break;
    case NoteConstants.ACTION.INSERT_TEXT:
      editor.insertText(action.text);
      NoteStore.emitChange();
      break;
    case NoteConstants.ACTION.UPDATE_TEXT:
      editor.updateText(action.text);
      NoteStore.emitChange();
      break;
    case NoteConstants.ACTION.BACKSPACE:
      editor.backspace();
      NoteStore.emitChange();
      break;
  }
});

module.exports = NoteStore;
