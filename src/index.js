
//进入全屏
function enterFullscreen() {
  var el = document.documentElement;
  if (el.requestFullscreen) {
    el.requestFullscreen();
  } else if (el.mozRequestFullScreen) {
    el.mozRequestFullScreen();
  } else if (el.webkitRequestFullScreen) {
    el.webkitRequestFullScreen();
  }
}

//退出全屏
function exitFullscreen() {
  var el = document;
  if (el.exitFullscreen) {
    el.exitFullscreen();
  } else if (el.mozCancelFullScreen) {
    el.mozCancelFullScreen();
  } else if (el.webkitCancelFullScreen) {
    el.webkitCancelFullScreen();
  }
}

// 文档初始化后执行
$(function() {
  // set the title
  $("title").html(TITLE);
  // build the slides list
  var slides = [];
  for (var i = 0; i < SLIDES.length; ++i) {
    slides.push({src : SLIDES[i]});
  }
  // build the background musics
  var bgm = new buzz.sound(MUSICS, {
    preload: PRELOAD,
    autoplay: AUTOPLAY,
    loop: false,
    volume: 100,
    webAudioApi: false
  });
  // enter the fullscreen
  enterFullscreen();
  // build the slides show
  $("body").vegas({
    preload: PRELOAD,
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