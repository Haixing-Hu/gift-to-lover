/**
 * Copyright 2015 Haixing Hu
 *
 * https://github.com/Haixing-Hu/gift-to-lover
 */

/*
  Native FullScreen JavaScript API
  -------------
  Assumes Mozilla naming conventions instead of W3C for now

  http://johndyer.name/lab/fullscreenapi/
*/
;(function() {
  'use strict';

  var fullScreenApi = {
    supportsFullScreen: false,
    isFullScreen: function() { return false; },
    requestFullScreen: function() {},
    cancelFullScreen: function() {},
    fullScreenEventName: '',
    prefix: ''
  };
  var browserPrefixes = ['webkit', 'moz', 'o', 'ms', 'khtml'];

  // check for native support
  if (typeof document.cancelFullScreen !== 'undefined') {
    fullScreenApi.supportsFullScreen = true;
  } else {
    // check for fullscreen support by vendor prefix
    for (var i = 0, il = browserPrefixes.length; i < il; i++ ) {
      fullScreenApi.prefix = browserPrefixes[i];
      if (typeof document[fullScreenApi.prefix + 'CancelFullScreen' ] !== 'undefined' ) {
        fullScreenApi.supportsFullScreen = true;
        break;
      }
    }
  }
  // update methods to do something useful
  if (fullScreenApi.supportsFullScreen) {
    fullScreenApi.fullScreenEventName = fullScreenApi.prefix + 'fullscreenchange';
    fullScreenApi.isFullScreen = function() {
      switch (this.prefix) {
      case '':
        return document.fullScreen;
      case 'webkit':
        return document.webkitIsFullScreen;
      default:
        return document[this.prefix + 'FullScreen'];
      }
    }
    fullScreenApi.requestFullScreen = function(el) {
      if (this.prefix === '') {
        return el.requestFullScreen();
      } else {
        return el[this.prefix + 'RequestFullScreen']();
      }
    }
    fullScreenApi.cancelFullScreen = function(el) {
      if (this.prefix === '') {
        return document.cancelFullScreen();
      } else {
        return document[this.prefix + 'CancelFullScreen']();
      }
    }
  }
  // jQuery plugin
  if (typeof jQuery !== 'undefined') {
    jQuery.fn.requestFullScreen = function() {
      return this.each(function() {
        var el = jQuery(this);
        if (fullScreenApi.supportsFullScreen) {
          fullScreenApi.requestFullScreen(el);
        }
      });
    };
  }
  // export api
  window.fullScreenApi = fullScreenApi;
})();