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

  /**
   * Preload images.
   *
   * @param images
   *    the array of URLs of images to be preloaded.
   * @param join
   *    a Join object used to notify the finish of asynchronous operations.
   * @see https://github.com/FuturesJS/join
   */
  var preloadImages = function(images, join) {
    var n = images.length;
    for (var i = 0; i < n; ++i) {
      var image = new Image();
      image.onload = join.add();
      image.src = images[i];
      imageCache.push(image);
    }
  };

  /**
   * Preload audios.
   *
   * @param audios
   *    the array of URLs of audios to be preloaded.
   * @param join
   *    a Join object used to notify the finish of asynchronous operations.
   * @see https://github.com/FuturesJS/join
   */
  var preloadAudios = function(audios, join) {
    var n = audios.length;
    for (var i = 0; i < n; ++i) {
      var audio = new Audio();
      // audio.onload = onLoad;  // it doesn't work
      audio.addEventListener('canplaythrough', join.add(), false);  // this works
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