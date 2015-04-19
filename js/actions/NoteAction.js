var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = {
  insertText: function (text) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.INSERT_TEXT,
      text: text
    });
  },
  updateText: function (text) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.UPDATE_TEXT,
      text: text
    });
  },
  backspace: function () {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.BACKSPACE
    });
  }
};
