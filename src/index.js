/**
 * Copyright 2015 Haixing Hu
 *
 * https://github.com/Haixing-Hu/gift-to-lover
 */

var IMAGE_CACHE = [];
var AUDIO_CACHE = [];

var slides = null;
var bgm = null;


/**
 * Delays the current thread form some milliseconds.
 *
 * This function is used for debugging.
 *
 * @param milliseconds
 *    the number of milliseconds to be delayed.
 * @param next
 *    the callback function to be called when all asynchronous tasks of this
 *    function has finished.
 */
function delay(milliseconds, next) {
  console.debug("Delay for " + milliseconds + " milliseconds.");
  var join = Join.create();
  setTimeout(join.add(), milliseconds);
  join.then(next);
}


/**
 * Creates a loading indicators.
 *
 * @param message
 *    the message describe the process.
 * @return
 *    the loading indicator, which is a Shape object of progressbar.js.
 */
function createLoadingIndicator(message) {
  $(".loading-container").show();
  $("#loading-message").html(message);
  var startColor = '#FC5B3F';
  var endColor = '#6FD57F';
  var circle = new ProgressBar.Circle("#loading-indicator", {
    color: "#fff",
    trailColor: "#c2c2c2",
    from: { color: startColor },
    to: { color: endColor },
    strokeWidth: 5,
    trailWidth: 5,
    easing: "easeInOut",
    text: {
      value: "0%"
    },
    step: function(state, bar) {
      bar.path.setAttribute('stroke', state.color);
      bar.setText(Math.abs(bar.value() * 100).toFixed(0) + "%");
    }
  });
  return circle;
}

/**
 * Destroys the loading indicator.
 *
 * @param indicator
 *    the loading indicator, which must be a Shape object of progressbar.js.
 */
function destroyLoadingIndicator(indicator) {
  $(".loading-container").hide();
  $("#loading-message").html("");
  indicator.destroy();
}

/**
 * Asynchronously load the images used by the slideshow.
 *
 * @param next
 *    the callback function to be called when all asynchronous tasks of this
 *    function has finished.
 */
function preloadImages(next) {
  if (PRELOAD_IMAGES) {
    var indicator = createLoadingIndicator(LOADING_IMAGES);
    // Asynchronously load all images
    var join = Join.create();
    var n = IMAGES.length;
    var i = 0;
    for ( ; i < n; ++i) {
      var image = new Image();
      image.onload = join.add();
      image.src = IMAGES[i];
      IMAGE_CACHE.push(image);
    }
    i = 0;
    join.notify(function() {
      // TODO
      console.debug("Load the " + i + "-th image");
      ++i;
      indicator.animate(i / n);
      if (i === n) {
        console.debug("Complete load all images");
      }
    });
    join.then(function() {
      setTimeout(function() {
        destroyLoadingIndicator(indicator);
        next();
      }, LOADING_DELAY);
    });
  } else {
    $(".loading-container").hide();
    next();
  }
}

/**
 * Asynchronously load the audios used by the slideshow.
 *
 * @param next
 *    the callback function to be called when all asynchronous tasks of this
 *    function has finished.
 */
function preloadMusics(next) {
  if (PRELOAD_MUSICS) {
    var indicator = createLoadingIndicator(LOADING_MUSICS);
    // Asynchronously load all musics
    var join = Join.create();
    var n = MUSICS.length;
    var i = 0;
    for (  ; i < n; ++i) {
      var audio = new Audio();
      // audio.onload = join.add();  // it doesn't work
      audio.addEventListener('canplaythrough', join.add(), false);  // this works
      audio.src = MUSICS[i];
      AUDIO_CACHE.push(audio);
    }
    i = 0;
    join.notify(function() {
      // TODO
      console.debug("Load the " + i + "-th music");
      ++i;
      indicator.animate(i / n);
      if (i === n) {
        console.debug("Complete load all musics");
      }
    });
    join.then(function() {
      setTimeout(function() {
        destroyLoadingIndicator(indicator);
        next();
      }, LOADING_DELAY);
    });
  } else {
    next();
  }
}

/**
 * Sets the initial visibility of toolbar buttons.
 */
function setToolbarButtonVisibility() {
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
}

/**
 * Create the slideshow player.
 *
 * @return the splideshow player object.
 */
function createSlidePlayer() {
  // build the slides list
  var slides = [];
  for (var i = 0; i < IMAGES.length; ++i) {
    slides.push({src : IMAGES[i]});
  }
  var player = $("body").vegas({
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
    //animation: ANIMATION,
    animation: 'kenburns',
    animationDuration: ANIMATION_DURATION,
    slides: slides,
    walk: function (index, slideSettings) {
      $("#counter").html(index + 1);
      if (index > IMAGE_COUNT && !LOOP_SLIDES) {
        player.pause();
        $("#pause").hide();
        $("#play").show();
      }
    }
  })[0]._vegas;
  return player;
}


/**
 * Creates the music player.
 *
 * @return
 *    a customized music player object.
 */
function createMusicPlayer() {
  return new MusicPlayer(MUSICS, {
    loop: LOOP_MUSICS,
    volume: MUSIC_VOLUME
  });
}

/**
 * Creates the event handlers for toolbar buttons.
 *
 * @param slides
 *    the slideshow player object.
 * @param musics
 *    the music player object.
 */
function setEventHandlers(slides, musics) {
  $("#first").on("click", function() {
    slides.jump(0);
    musics.first();
  });
  $("#previous").on("click", function() {
    slides.previous();
    musics.previous();
  });
  $("#next").on("click", function() {
    slides.next();
    musics.next();
  });
  $("#last").on("click", function() {
    slides.jump(IMAGE_COUNT + 1);
    musics.last();
  });
  $("#pause").on("click", function() {
    musics.pause();
    slides.pause();
    $("#pause").hide();
    $("#play").show();
  });
  $("#play").on("click", function() {
    musics.play();
    slides.play();
    $("#pause").show();
    $("#play").hide();
  });
  $("#volume-on").on("click", function() {
    musics.mute();
    $("#volume-on").hide();
    $("#volume-off").show();
  });
  $("#volume-off").on("click", function() {
    musics.unmute();
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
}

/**
 * initialization slideshow.
 *
 * @param next
 *    the callback function to be called when all asynchronous tasks of this
 *    function has finished.
 */
function init(next) {
  setToolbarButtonVisibility();
  var slides = createSlidePlayer();
  var musics = createMusicPlayer();
  setEventHandlers(slides, musics);
  if (AUTOPLAY) {
    slides.play();
    musics.play();
  }
}

/**
 * Executed after the document is ready.
 */
$(function() {
  // set the title
  $("title").html(TITLE);
  // create sequence
  var sequence = Sequence.create();
  sequence.then(preloadImages)
          .then(preloadMusics)
          .then(init);
});