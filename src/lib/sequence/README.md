Sequence
===

Creates an Asynchronous Stack which execute each enqueued method after the previous function calls the provided `next(err, data [, ...])`.

In many cases [`forEachAsync`](https://github.com/FuturesJS/forEachAsync) or [`forAllAsync`](https://github.com/FuturesJS/forAllAsync) will be a better alternative.

API
---

  * `Sequence.create(defaultContext=null)`
  * `then(function callback(next, err, data [, ...]) {}, context)` - add a callback onto the queue
    * begins or resumes the queue
    * passes the results of the previous function into the next

Node.js Installation
---

Node.JS (Server):

```bash
npm install sequence
```

Browser Installation
---

You can install from bower:

```bash
bower install sequence
```

Or download the raw file from <https://raw.github.com/FuturesJS/sequence/master/sequence.js>:

```bash
wget https://raw.github.com/FuturesJS/sequence/master/sequence.js
```

Or build with pakmanager:

```bash
pakmanager build sequence
```

Usage
---

```javascript
(function (exports) {
  'use strict';

  var Sequence = exports.Sequence || require('sequence').Sequence
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

// so that this example works in browser and node.js
}('undefined' !== typeof exports && exports || new Function('return this')()));
```
