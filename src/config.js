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
 * 预载入图片的提示信息。
 */
var LOADING_IMAGES = "正在载入图片，请稍后……";

/**
 * 预载入音乐的提示信息。
 */
var LOADING_MUSICS = "正在载入音乐，请稍后……";

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
 * 是否显示幻灯片播放时每张幻灯片底部的计时进度条。
 */
var SHOW_TIMER = false;

/**
 * 是否循环播放幻灯片。
 */
var LOOP_SLIDES = false;

/**
 * 是否循环播放背景音乐。建议设为true。
 */
var LOOP_MUSICS = true;

/**
 * 背景音乐音量大小。建议设为100。
 */
var MUSIC_VOLUME = 100;

/**
 * 载入进度条结束后的延时。单位为毫秒。
 *
 * 增加此项是为了更好的显示效果。
 */
var LOADING_DELAY = 1000;

/**
 * 所有图片的总数目。如果要添加删除图片，请修改此数目。
 */
var IMAGE_COUNT = 518;

/**
 * 幻灯片播放的图片所在的目录，默认为 "./images"。
 *
 * 该目录中的图片必须为JPEG格式并以".jpg"为文件名后缀，图片总数目必须为 IMAGE_COUNT 。
 * 图片的文件名必须从1开始编号，到 IMAGE_COUNT 为止，即"1.jpg", "2.jpg", ..., "520.jpg".
 *
 * 注意第一张图片"start.jpg"和最后一张图片"end.jpg"可以设置为特殊的图片，并增加相应的字幕。
 */
var IMAGE_DIR = "./images";

/**
 * 幻灯片图片的URL列表。注意如果SHUFFLE选项为false，则会按照数组的顺序播放幻灯片。
 */
var IMAGES = [];

// 默认将使用 IMAGE_DIR 目录下的所有电影截图，按照其文件名顺序播放，图片格式都必须为jpg。
// 如果要增加或减少图片的数目，请修改 IMAGE_COUNT 的值。
// 当然，也可以直接定义 IMAGES 数组的值，不过那样图片多了会比较麻烦。
(function() {
  IMAGES.push(IMAGE_DIR + "/start.jpg");
  for (var i = 1; i <= IMAGE_COUNT; ++i) {
    IMAGES.push(IMAGE_DIR + "/" + i + ".jpg");
  }
  IMAGES.push(IMAGE_DIR + "/end.jpg");
})();

/**
 * 所有背景音乐的总数目。如果要添加删除音乐，请修改此数目。
 */
var MUSIC_COUNT = 2;

/**
 * 播放的背景音乐所在的目录，默认为 "./musics"。
 *
 * 该目录中的音乐必须为MP3格式并以".mp3"为文件名后缀，音乐总数目必须为 MUSIC_COUNT 。
 * 音乐的文件名必须从1开始编号，到 MUSIC_COUNT 为止，即"1.mp3", "2.mp3", ..., "100.mp3".
 */
var MUSIC_DIR = "./musics";

/**
 * 幻灯片播放时背景音乐的URL列表。注意如果SHUFFLE选项为false，则会按照数组的顺序播放音乐。
 */
var MUSICS = [];

// 默认将使用"musics"目录下的所有音乐，按照其文件名顺序播放。
// 默认将使用 MUSIC_DIR 目录下的所有音乐，按照其文件名顺序播放，音乐格式都必须为mp3。
// 如果要增加或减少音乐的数目，请修改 MUSIC_COUNT 的值。
// 当然，也可以直接定义 MUSICS 数组的值，不过那样音乐多了会比较麻烦。
(function() {
  for (var i = 1; i <= MUSIC_COUNT; ++i) {
    MUSICS.push(MUSIC_DIR + "/" + i + ".mp3");
  }
})();