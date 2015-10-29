$(function() {
  // set the title
  $("title").html(TITLE);

  // set the slides show
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
    slides: SLIDES
  });
});