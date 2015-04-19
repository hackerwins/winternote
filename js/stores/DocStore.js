var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants'),
    EventEmitter = require('events').EventEmitter,
    _ = require('lodash');

var CHANGE_EVENT = 'change';

var DocStore = _.extend({
  mockDoc: {
    contents: [{
      type: 'p',
      text: 'hello world'
    }, {
      type: 'p',
      text: 'winternote is ...'
    }]
  }
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
    var para = _.last(this.mockDoc.contents);
    para.text += text;
  },
  
  updateText: function (text) {
    var para = _.last(this.mockDoc.contents);
    para.text = para.text.substring(0, para.text.length - 1) + text;
  },

  backspace: function () {
    var para = _.last(this.mockDoc.contents);
    para.text = para.text.substring(0, para.text.length - 1);
  },

  getContents: function () {
    return this.mockDoc.contents;
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
