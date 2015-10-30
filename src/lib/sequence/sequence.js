/*jshint -W054 */
;(function (exports) {
  "use strict";

  function Sequence(defaultContext) {
    var me = this
      ;

    if (!(this instanceof Sequence)) {
      return new Sequence(defaultContext);
    }

    me._waiting = true;
    me._data = null;
    me._stack = [];
    me._defaultContext = defaultContext || null;

    me._nextBound = function () {
      var args = Array.prototype.slice.call(arguments),
        seq = me._stack.shift(); // BUG this will eventually leak

      me._data = arguments;

      if (!seq) {
        // the chain has ended (for now)
        me._waiting = true;
        return;
      }

      args.unshift(me._nextBound);
      seq.callback.apply(seq._context, args);
    };
  }
  Sequence.create = Sequence;

  Sequence.prototype.then = function (callback, context) {
    var me = this
      ;

    if ('function' !== typeof callback) {
      throw new Error("`Sequence().then(callback [context])` requires that `callback` be a function and that `context` be `null`, an object, or a function");
    }
    me._stack.push({
      callback: callback,
      _context: (null === context ? null : context || me._defaultContext),
      index: me._stack.length
    });

    // if the chain has stopped, start it back up
    if (me._waiting) {
      me._waiting = false;
      me._nextBound.apply(null, me._data);
    }

    return me;
  };

  exports.Sequence = Sequence;
}('undefined' !== typeof exports && exports || new Function('return this')()));
