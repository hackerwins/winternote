var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = {
  renderStartPosition: function (rect) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.RENDER_START_POSITION,
      rect: rect
    });
  },
  renderEndPosition: function (rect) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.RENDER_END_POSITION,
      rect: rect
    });
  },
  renderComposition: function (isComposition) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.RENDER_COMPOSITION,
      isComposition: isComposition
    });
  }
};
