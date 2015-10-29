// 文档初始化后执行
$(function() {
  // set the title
  $("title").html(TITLE);
  // set the event handlers
  if (fullScreenApi.supportsFullScreen) {
    $("#enter-fullscreen").show();
  }
  // enter the fullscreen
  $("#enter-fullscreen").on("click", function() {
    fullScreenApi.requestFullScreen(document.documentElement);
    $("#enter-fullscreen").hide();
    $("#exit-fullscreen").show();
  });
  // exit the fullscreen
  $("#exit-fullscreen").on("click", function() {
    fullScreenApi.cancelFullScreen(document.documentElement);
    $("#enter-fullscreen").show();
    $("#exit-fullscreen").hide();
  });
  // build the slides list
  var slides = [];
  for (var i = 0; i < SLIDES.length; ++i) {
    slides.push({src : SLIDES[i]});
  }
  // build the background musics
  var bgm = new buzz.sound(MUSICS, {
    preload: PRELOAD_MUSICS,
    autoplay: AUTOPLAY,
    loop: false,
    volume: 100,
    webAudioApi: false
  });
  // build the slides show
  $("body").vegas({
    preload: PRELOAD_IMAGES,
    timer: false,
    overlay: false,
    autoplay: AUTOPLAY,
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
  });
  // play the background music
  bgm.loop().play().fadeIn();
});