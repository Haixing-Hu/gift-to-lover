Join
===

Joins any number of asynchronous calls together -
similar to how `pthread_join` works for C threads
and `when()` works for Q-style promises.

It's basically a callback counter that lets you know when everything is done.

Installation
---

Node.JS (Server):

```bash
npm install join
```

Browser:

You can install from bower:

```bash
bower install join
```

Or download the raw file from 
<https://raw.github.com/FuturesJS/join/master/join.js>:

```bash
wget https://raw.github.com/FuturesJS/join/master/join.js
```

Browser Usage
---

```html
<script src="join.js"></script>
```

```javascript
;(function () {
  'use strict';

  var join = window.Join.create()
    ;

  // Use `join.add()` in place of a callback function
  setTimeout(join.add(), 500, 'I', 'really');
  setTimeout(join.add(), 700, 'really', 'LOVE');
  setTimeout(join.add(), 200, 'JavaScript');

  // Use `join.notify()` for incremental updates
  join.notify(function (i, args) {
    console.log(
      'Callback #' + (i + 1) 
    + ' of ' + join.length 
    + ' completed', args
    );
  });

  // Use `join.then(cb)` to fire `cb` when all of the `join.add()` callbacks have been called.
  join.then(function (i, love, js) {
    console.log('All of the timeouts have completed');
    console.log(i, love, js);
  });
}());

```

Node.js Usage
---

```javascript
'use strict';

var request = require('request')
  , Join = require('join').Join
  , join = Join.create()
  ;

// Use `join.add()` in place of a callback function
request.get('https://www.google.com', join.add());
request.get('http://www.yahoo.com', join.add());
request.get('https://www.bing.com', join.add());

// Use `join.notify()` for incremental updates
join.notify(function (i, args) {
  console.log(
    'Callback #' + (i + 1) 
  + ' of ' + join.length 
  + ' completed', args
  );
});

// Use `join.then(cb)` to fire `cb` when all of the `join.add()` callbacks have been called.
join.then(function (googleArgs, yahooArgs, bingArgs) {
  console.log('All of the requests have completed');
  console.log(googleArgs[2]);
  console.log(yahooArgs[2]);
  console.log(bingArgs[2]);
});
```

API
---

Join

  * `join = Join.create(defaultContext=null)` - create a Join that will count callbacks
  * `join.add()` - creates a joinable callback that you can throw around
  * `join.notify(progressCallback, context=null)`
  * `join.then(finalCallback, context=null)`
    * Fires `finalCallback` when all joined callbacks have completed
    * Must be called after the last `add()`
  * `join.length` - the number of times `join.add()` has been called

Potential Gotchas
---

### Order matters

The arguments to `join.then(cb)` are in the order that the `join.add()` were called.

```javascript
  callbackA = join.add();
  callbackB = join.add();

  doAsyncStuff(callbackB);
  doAsyncStuff(callbackA);

  join.then(function (callbackAArgs, callbackBArgs) {
    console.log(callbackAArgs, callbackBArgs);
  });
```

### Callback within a callback

If you handle the join callback inside of another callback
then you'll need to place the join callback in the parent scope.

Fails:
```javascript
  request.get('http://www.yahoo.com', join.add());
  setTimeout(function () {
    request.get('https://www.bing.com', join.add());
  }, 100);

  join.then(function () {
    console.log('all completed');
  });
```


Works as expected:
```javascript
  request.get('http://www.yahoo.com', join.add());
  bingCallback = join.add()
  setTimeout(function () {
    request.get('https://www.bing.com', bingCallback);
  }, 100);
```

### Losing `this`ness

Fails:
```javascript
  // `doStuff` loses the `this` binding to `myObject`
  join.then(myObject.doStuff);
```

Works as expected:
```
  // `doStuff` retains the `this` binding
  join.then(myObject.doStuff, myObject);
```

Also works as expected:
```
  // `doStuff` retains the `this` binding
  join.then(function (argsA, argsB, argsC) {
    myObject.doStuff(argsA, argsB, argsC);
  });
```
