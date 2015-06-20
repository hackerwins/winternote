var NoteDispatcher = require('../dispatcher/NoteDispatcher'),
    NoteConstants = require('../constants/NoteConstants');

module.exports = {
  renderStartPosition: function (point) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.RENDER_START_POSITION,
      point: point
    });
  },
  renderEndPosition: function (point) {
    NoteDispatcher.dispatch({
      actionType: NoteConstants.ACTION.RENDER_END_POSITION,
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
