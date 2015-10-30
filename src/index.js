/**
 * Copyright 2015 Haixing Hu
 *
 * https://github.com/Haixing-Hu/gift-to-lover
 */


// 文档初始化后执行
$(function() {
  'use strict';

  // set the title
  $("title").html(TITLE);
  // create sequence
  var sequence = Sequence.create();
  sequence.then(function(next) {  // preload images if necessary
    if (PRELOAD_IMAGES) {
      // preload images
      var image_count = SLIDES.length;
      var image_index = 0;
      var preload_images_join = window.Join.create();
      preloadImages(SLIDES, preload_images_join.add());
      preload_images_join.notify(function() {
        // TODO
        // console.debug("Load the " + image_index + "-th image");
        ++image_index;
        if (image_index === image_count) {
          console.debug("Complete load all images");
        }
      });
      preload_images_join.then(next);
    } else {
      next();
    }
  }).then(function(next) {    // preload musics if necessary
    if (PRELOAD_MUSICS) {
      // preload musics
      var music_count = MUSICS.length;
      var music_index = 0;
      var preload_musics_join = Join.create();
      preloadAudios(MUSICS, preload_musics_join.add());
      preload_musics_join.notify(function(i) {
        // TODO
        // console.debug("Load the " + music_index + "-th music");
        ++music_index;
        if (music_index === music_count) {
          console.debug("Complete load all musics");
        }
      });
      preload_musics_join.then(next);
    } else {
      next();
    }
  }).then(function(next) {  // perform the remained initializations
    // set the element visibility
    if (SHOW_SLIDES_COUNTER) {
      $("#counter").show();
    }
    if (AUTOPLAY) {
      $("#pause").show();
    } else {
      $("#play").show();
    }
    if (SHOW_PLAY_CONTROL) {
      $("#first").show();
      $("#previous").show();
      $("#next").show();
      $("#last").show();
    }
    $("#volume-on").show();
    if (fullScreenApi.supportsFullScreen) {
      $("#enter-fullscreen").show();
    }
    // build the slides list
    var slides = [];
    for (var i = 0; i < SLIDES.length; ++i) {
      slides.push({src : SLIDES[i]});
    }
    // build the slides show
    var slides = $("body").vegas({
      slide: -1, // since the call of play() will move to the next slide
      preload: false,   // we will use our customized preload mechanism
      autoplay: false,  // we will use our customized autoplay mechanism
      timer: SHOW_TIMER,
      shuffle: SHUFFLE,
      delay: DELAY,
      cover: true,
      overlay: false,
      align: "center",
      valign: "center",
      transition: TRANSITION,
      transitionDuration: TRANSITION_DURATION,
      animation: ANIMATION,
      animationDuration: ANIMATION_DURATION,
      slides: slides,
      walk: function (index, slideSettings) {
        if (index >= 1 && index <= SLIDES_COUNT) {
          $("#counter").html(index);
        } else {
          $("#counter").html("");
        }
        if (STOP_AT_END && index > SLIDES_COUNT) {
          slides.pause();
          $("#pause").hide();
          $("#play").show();
        }
      }
    })[0]._vegas;
    // build the background musics
    var bgm = new buzz.sound(MUSICS, {
      preload: false,  // we will use our customized preload mechanism
      autoplay: false, // we will use our customized autoplay mechanism
      loop: true,
      volume: 100,
      webAudioApi: false
    });
    // set event handlers
    $("#first").on("click", function() {
      slides.jump(0);
    });
    $("#previous").on("click", function() {
      slides.previous();
    });
    $("#next").on("click", function() {
      slides.next();
    });
    $("#last").on("click", function() {
      slides.jump(SLIDES_COUNT + 1);
    });
    $("#pause").on("click", function() {
      bgm.pause();
      slides.pause();
      $("#pause").hide();
      $("#play").show();
    });
    $("#play").on("click", function() {
      bgm.play();
      slides.play();
      $("#pause").show();
      $("#play").hide();
    });
    $("#volume-on").on("click", function() {
      bgm.mute();
      $("#volume-on").hide();
      $("#volume-off").show();
    });
    $("#volume-off").on("click", function() {
      bgm.unmute();
      $("#volume-on").show();
      $("#volume-off").hide();
    });
    $("#enter-fullscreen").on("click", function() {
      fullScreenApi.requestFullScreen(document.documentElement);
      $("#enter-fullscreen").hide();
      $("#exit-fullscreen").show();
    });
    $("#exit-fullscreen").on("click", function() {
      fullScreenApi.cancelFullScreen(document.documentElement);
      $("#enter-fullscreen").show();
      $("#exit-fullscreen").hide();
    });
    // auto play the slides and musics if necessary
    if (AUTOPLAY) {
      bgm.play();
      slides.play();
    }
  });
});