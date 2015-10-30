/**
 * Preload images/audios.
 *
 * Copyright 2015 Haixing Hu
 *
 * https://github.com/Haixing-Hu/gift-to-lover
 */

;(function() {
  'use strict';

  var imageCache = [];
  var audioCache = [];

  var preloadImages = function(images, onLoad) {
    var n = images.length;
    for (var i = 0; i < n; ++i) {
      var image = new Image();
      image.onload = onLoad;
      image.src = images[i];
      imageCache.push(image);
    }
  };

  var preloadAudios = function(audios, onLoad) {
    var n = audios.length;
    for (var i = 0; i < n; ++i) {
      var audio = new Audio();
      // audio.onload = onLoad;  // it doesn't work
      audio.addEventListener('canplaythrough', onLoad, false);  // this works
      audio.src = audios[i];
      audioCache.push(audio);
    }
  };

  // export caches
  window.imageCache = imageCache;
  window.audioCache = audioCache;
  // export functions
  window.preloadImages = preloadImages;
  window.preloadAudios = preloadAudios;
})();