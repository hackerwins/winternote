/*jshint node:true, browser: true*/

var userAgent = navigator.userAgent;

module.exports = {
  isIE: userAgent.indexOf("Trident") > 0,
  isFirefox: userAgent.indexOf("Firefox") > 0,
  isWebkit: userAgent.indexOf('WebKit') > 0
};
