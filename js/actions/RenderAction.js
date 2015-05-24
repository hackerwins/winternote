var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = {
  renderCursor: function (rect) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.RENDER_CURSOR,
      rect: rect
    });
  }
};
