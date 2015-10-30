/**
 * Copyright 2015 Haixing Hu
 *
 * https://github.com/Haixing-Hu/gift-to-lover
 */

/**
 * 网页的标题。
 */
var TITLE = "献给我最爱的人";

/**
 * 是否预加载所有的图片。
 */
var PRELOAD_IMAGES = false;

/**
 * 是否预加载所有的音乐。
 */
var PRELOAD_MUSICS = false;

/**
 * 是否自动播放图片和音乐。
 */
var AUTOPLAY = true;

/**
 * 是否乱序随机播放。若为false，则顺序播放图片和音乐。
 */
var SHUFFLE = false;

/**
 * 每幅图片之间的延时，单位为毫秒（1000毫秒为1秒）。
 */
var DELAY = 8000;

/**
 * 图片切换的过渡动画效果。"random"表示采用随机效果。建议使用"random"。
 */
var TRANSITION = "random";

/**
 * 图片切换的过渡动画延时，单位为毫秒（1000毫秒为1秒）。
 */
var TRANSITION_DURATION = 1000;

/**
 * 图片显示时的动画效果。"random"表示采用随机效果。建议使用"random"。
 */
var ANIMATION = "random";

/**
 * 图片显示时的动画延时，单位为毫秒（1000毫秒为1秒）。
 */
var ANIMATION_DURATION = DELAY - TRANSITION_DURATION - 1000;

/**
 * 是否显示幻灯片计数器。
 */
var SHOW_SLIDES_COUNTER = true;

/**
 * 是否显示致谢部分。建议设置为true，感谢所有的资源提供者。
 */
var SHOW_ACKNOWLEDGEMENT = true;

/**
 * 是否显示幻灯片播放控制按钮（第一张，最后一张，前一张，下一张）。
 */
var SHOW_PLAY_CONTROL = true;

/**
 * 是否在最后一张幻灯片结束时停止播放。建议设置为true。
 */
var STOP_AT_END = true;

/**
 * 所有图片的总数目，目前有562张。如果要添加删除图片，请修改此数目。
 */
var SLIDES_COUNT = 562;

/**
 * 幻灯片播放的图片所在的目录，默认为 "./images"。
 *
 * 该目录中的图片必须为JPEG格式并以".jpg"为文件名后缀，图片总数目必须为SLIDES_COUNT。
 * 图片的文件名必须从1开始编号，到SLIDES_COUNT为止，即"1.jpg", "2.jpg", ..., "520.jpg".
 *
 * 注意第一张图片"start.jpg"和最后一张图片"end.jpg"可以设置为特殊的图片，并增加相应的字幕。
 */
var SLIDES_DIR = "./images";

/**
 * 幻灯片图片的URL列表。注意如果SHUFFLE选项为false，则会按照数组的顺序播放幻灯片。
 */
var SLIDES = [];

// 默认将使用SLIDES_DIR目录下的所有电影截图，按照其文件名顺序播放，图片格式都必须为jpg。
// 如果要增加或减少图片的数目，请修改SLIDES_COUNT的值。
// 当然，也可以直接定义SLIDES数组的值，不过那样图片多了会比较麻烦。
(function() {
  SLIDES.push(SLIDES_DIR + "/start.jpg");
  for (var i = 1; i <= SLIDES_COUNT; ++i) {
    SLIDES.push(SLIDES_DIR + "/" + i + ".jpg");
  }
  SLIDES.push(SLIDES_DIR + "/end.jpg");
})();

/**
 * 所有背景音乐的总数目。如果要添加删除音乐，请修改此数目。
 */
var MUSICS_COUNT = 1;

/**
 * 播放的背景音乐所在的目录，默认为 "./musics"。
 *
 * 该目录中的音乐必须为MP3格式并以".mp3"为文件名后缀，音乐总数目必须为MUSICS_COUNT。
 * 音乐的文件名必须从1开始编号，到MUSICS_COUNT为止，即"1.mp3", "2.mp3", ..., "100.mp3".
 */
var MUSICS_DIR = "./musics";

/**
 * 幻灯片播放时背景音乐的URL列表。注意如果SHUFFLE选项为false，则会按照数组的顺序播放音乐。
 */
var MUSICS = [];

// 默认将使用"musics"目录下的所有音乐，按照其文件名顺序播放。
// 默认将使用MUSICS_DIR目录下的所有音乐，按照其文件名顺序播放，音乐格式都必须为mp3。
// 如果要增加或减少音乐的数目，请修改MUSICS_COUNT的值。
// 当然，也可以直接定义MUSICS数组的值，不过那样音乐多了会比较麻烦。
(function() {
  for (var i = 1; i <= MUSICS_COUNT; ++i) {
    MUSICS.push(MUSICS_DIR + "/" + i + ".mp3");
  }
})();