var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = {
  moveLeft: function () {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.MOVE_LEFT
    });
  },
  moveRight: function () {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.MOVE_RIGHT
    });
  },
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
  insertParagraph: function () {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.INSERT_PARAGRAPH
    });
  },
  backspace: function () {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.BACKSPACE
    });
  }
};
