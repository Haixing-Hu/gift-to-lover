/*jshint -W054 */
;(function (exports) {
  'use strict';

  var Sequence = exports.Sequence || require('./sequence').Sequence
    , sequence = Sequence.create()
    , err
    ;

  sequence
    .then(function (next) {
      setTimeout(function () {
        next(err, "Hi", "World!");
      }, 120);
    })
    .then(function (next, err, a, b) {
      setTimeout(function () {
        next(err, "Hello", b);
      }, 270);
    })
    .then(function (next, err, a, b) {
      setTimeout(function () {
        console.log(a, b);
        next();
      }, 50);
    });
}('undefined' !== typeof exports && exports || new Function('return this')()));
