// 文档初始化后执行
$(function() {
  // set the title
  $("title").html(TITLE);
  // set toolbar icons
  if (AUTOPLAY) {
    $("#pause").show();
  } else {
    $("#play").show();
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
  // build the background musics
  var bgm = new buzz.sound(MUSICS, {
    preload: PRELOAD_MUSICS,
    autoplay: false,
    loop: false,
    volume: 100,
    webAudioApi: false
  });
  // build the slides show
  var slides = $("body").vegas({
    slide: -1,        // since the play() will move to the next slide
    preload: PRELOAD_IMAGES,
    timer: false,
    overlay: false,
    autoplay: false,
    shuffle: SHUFFLE,
    delay: DELAY,
    cover: true,
    align: "center",
    valign: "center",
    transition: TRANSITION,
    transitionDuration: TRANSITION_DURATION,
    animation: ANIMATION,
    animationDuration: ANIMATION_DURATION,
    slides: slides
  })[0]._vegas;
  // set event handlers
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
  if (AUTOPLAY) {
    bgm.loop().play().fadeIn();
    console.dir(slides);
    slides.play();
  }
});