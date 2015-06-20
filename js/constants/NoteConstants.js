var keyMirror = require('keyMirror');

module.exports = {
  ACTION: keyMirror({
    SELECT_START: null,
    SELECT_END: null,
    MOVE_LEFT: null,
    MOVE_RIGHT: null,
    INSERT_TEXT: null,
    UPDATE_TEXT: null,
    INSERT_PARAGRAPH: null,
    BACKSPACE: null,
    RENDER_START_POSITION: null,
    RENDER_END_POSITION: null,
    RENDER_COMPOSITION: null
  }),
  EVENT: keyMirror({
    DOCUMENT: null,
    RENDER: null
  })
};
