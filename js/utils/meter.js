/**
 * utility functions for rect and point
 */

/**
 * @param {Rect} rect
 * @param {Rect} base
 * @return {Rect}
 */
var rectOn = function (rect, base) {
  return {
    left: rect.left - base.left,
    top: rect.top - base.top,
    right: rect.right - base.left,
    bottom: rect.bottom - base.top,
    width: rect.width,
    height: rect.height
  }
};

/**
 * @param {Rect} rectA
 * @param {Rect} rectB
 * @return {Boolean}
 */
var isSameLineRects = function (rectA, rectB) {
  return rectA.top === rectB.top && rectA.bottom === rectB.bottom;
};

module.exports = {
  rectOn: rectOn,
  isSameLineRects: isSameLineRects
};
