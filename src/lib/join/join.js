/*jshint -W054 */
;(function (exports) {
  'use strict';

  function Join(context) {
    var me = this
      ;

    if (!(me instanceof Join)) {
      return new Join(context);
    }

    me._context = context || null;
    me._waiting = [];
    me._done = 0;
    me._callbacks = [];
    me._notifiables = [];
    me._begun = false;
    me.length = 0;
  }
  Join.create = Join;
  Join.prototype._partial = function (i, args) {
    var me = this
      ;

    me._done += 1;
    me._waiting[i] = args;

    me._notifiables.forEach(function (n) {
      n.fn.call(n.ctx || me._context, i, args);
    });
    me._complete();
  };
  Join.prototype._complete = function () {
    var me = this
      ;

    if (me._done !== me._waiting.length || !me._callbacks.length) {
      return;
    }

    me._callbacks.forEach(function (cb) {
      cb.fn.apply(cb.ctx || me._context, me._waiting);
    });
  };

  Join.prototype.add = function () {
    var me = this
      , index = me._waiting.length
      ;

    if (me._begun) {
      throw new Error('You tried to `add()` after calling `then()`');
    }
    me._waiting[me._waiting.length] = null;
    me.length = me._waiting.length;
    return function () {
      me._partial(index, Array.prototype.slice.call(arguments));
    };
  };
  Join.prototype.notify = function (cb, context) {
    var me = this
      ;

    me._notifiables.push({
      fn: cb
    , ctx: context
    });

    return this;
  };
  Join.prototype.then = function (cb, context) {
    var me = this
      ;

    me._begun = true;
    me._callbacks.push({
      fn: cb
    , ctx: context
    });

    me._complete();
    return this;
  };
  Join.prototype.when = function (promises, ctx) {
    var me = this
      , index = me._waiting.length
      ;

    if ('function' === typeof promises) {
      console.warn('`when` is deprecated. Please use `then` instead.');
      //throw new Error('`when` is deprecated. Please use `then` instead.');
      me.then(promises, ctx);
    } else if (!Array.isArray(promises)) {
      throw new Error('expected an array of objects with a `then` method');
    }

    me._waiting[length] = null;

    promises.forEach(function (p) {
      p.then(function () {
        me._partial(index, Array.prototype.slice(arguments));
      });
    });

    return this;
  };

  exports.Join = Join;
}('undefined' !== typeof exports && exports || new Function('return this')()));
