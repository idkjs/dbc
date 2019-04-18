// Generated by BUCKLESCRIPT VERSION 6.0.0-dev.1, PLEASE EDIT WITH CARE
'use strict';

var Caml_int32 = require("bs-platform/lib/js/caml_int32.js");
var Yawaramin__Dbc = require("./Yawaramin__Dbc.bs.js");

function integerDiv(num, denom) {
  Yawaramin__Dbc.pre("" + (String(num) + (" >= " + (String(denom) + ""))), num >= denom);
  Yawaramin__Dbc.pre("" + (String(denom) + " != 0"), denom !== 0);
  var ensure = Yawaramin__Dbc.post("resultNum >= (num - 1) && resultNum <= num", (function (result) {
          var resultNum = Caml_int32.imul(result, denom);
          if (resultNum >= (num - 1 | 0)) {
            return resultNum <= num;
          } else {
            return false;
          }
        }));
  return ensure(Caml_int32.div(num, denom));
}

console.log(integerDiv(3, 2));

var Dbc = 0;

exports.Dbc = Dbc;
exports.integerDiv = integerDiv;
/*  Not a pure module */
