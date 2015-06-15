var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = {
  renderCursor: function (point) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.RENDER_CURSOR,
      point: point
    });
  },
  renderComposition: function (isComposition) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.RENDER_COMPOSITION,
      isComposition: isComposition
    });
  }
};
