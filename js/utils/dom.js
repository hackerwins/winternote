/*jshint node:true, browser: true*/

/**
 * @param {Event} event
 * @return {Point}
 */
var getPointFromEvent = function (event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
};

/**
 * @param {Point}
 * @return {NativeRange}
 */
var caretRangeFromPoint = function (point) {
  return document.caretRangeFromPoint(point.x, point.y);
};

/**
 * @param {Event} event
 * @return {BoundaryPoint}
 */
var boundaryPointFromEvent = function (event) {
  var range = caretRangeFromPoint(getPointFromEvent(event));
  return {
    container: range.startContainer,
    offset: range.startOffset
  };
};

module.exports = {
  getPointFromEvent: getPointFromEvent,
  boundaryPointFromEvent: boundaryPointFromEvent
};
