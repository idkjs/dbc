// Generated by BUCKLESCRIPT VERSION 6.0.0-dev.1, PLEASE EDIT WITH CARE
'use strict';


var noDescription = "(no description)";

function error(message) {
  throw new TypeError("Failed assertion: " + (String(message) + ""));
}

function pre($staropt$star, condition) {
  var message = $staropt$star !== undefined ? $staropt$star : noDescription;
  if (condition) {
    return 0;
  } else {
    return error(message);
  }
}

function post($staropt$star, func) {
  var message = $staropt$star !== undefined ? $staropt$star : noDescription;
  return (function (result) {
      if (func(result)) {
        return result;
      } else {
        return error(message);
      }
    });
}

exports.pre = pre;
exports.post = post;
/* No side effect */
