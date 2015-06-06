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

/**
 * @param {BoundaryPoint} boundaryPoint
 * @return {Rect}
 */
var rectFromBoundaryPoint = function (boundaryPoint) {
  var container = boundaryPoint.container;
  var offset = boundaryPoint.offset;

  var textNode = container.firstChild;
  var textLength = textNode ? textNode.nodeValue.length : 0;
  var isLeftSide = textLength > offset;
  if (!textLength) {
    rect = container.getBoundingClientRect();
  } else {
    // TODO textRange for IE8, refactoring
    var range = document.createRange();
    if (isLeftSide) {
      range.setStart(textNode, offset);
      range.setEnd(textNode, offset + 1);
    } else {
      range.setStart(textNode, offset - 1);
      range.setEnd(textNode, offset);
    }
    rect = range.getBoundingClientRect();
  }

  return {
    left: isLeftSide ? rect.left : rect.right,
    top: rect.top
  };
};

module.exports = {
  getPointFromEvent: getPointFromEvent,
  boundaryPointFromEvent: boundaryPointFromEvent,
  rectFromBoundaryPoint: rectFromBoundaryPoint
};
