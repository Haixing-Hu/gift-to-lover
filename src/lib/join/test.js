(function () {
  'use strict';

  var Join = require('./join').Join
    , join = Join.create()
    , aCb
    , bCb
    , cCb
    ;

  console.log('length is 0', 0 === join.length);
  aCb = join.add();
  bCb = join.add();
  cCb = join.add();
  console.log('length is 3', 3 === join.length);

  setTimeout(function () {
    aCb('I');
    bCb('Love');
  });
  
  join.then(function (aArgs, bArgs, cArgs) {
    console.log(
      'arguments match'
    , 'I' === aArgs[0]
    , 'Love' === bArgs[0]
    , 'JavaScript' === cArgs[0]
    );
  });

  cCb('JavaScript');
}());
