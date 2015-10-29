/**
 * 此文件定义配置项
 */

/**
 * 网页的标题。
 */
var TITLE = "献给XXX";

/**
 * 是否预加载所有的图片和音乐。
 */
var PRELOAD = true;

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
var DELAY = 5000;

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
 *
 * "auto"表示使用自动的值，即等于DELAY的值。建议使用"auto"。
 */
var ANIMATION_DURATION = "auto";

/**
 * 是否显示致谢部分。建议设置为true，感谢所有的资源提供者。
 */
var SHOW_ACKNOWLEDGEMENT = true;

/**
 * 幻灯片图片的URL列表。注意如果SHUFFLE选项为false，则会按照数组的顺序播放幻灯片。
 */
var SLIDES = [];

/**
 * 幻灯片播放时背景音乐的URL列表。注意如果SHUFFLE选项为false，则会按照数组的顺序播放音乐。
 */
var MUSICS = [];

// 默认将使用"images"目录下的所有电影截图，按照其文件名顺序播放。
// 如果要增加或减少图片的数目，请修改下面循环的最大值。
// 当然，也可以直接定义SLIDES数组的值，不过那样图片多了会比较麻烦。


// 默认将使用"sounds"目录下的所有音乐，按照其文件名顺序播放。
// 如果要增加或减少图片的数目，请修改下面循环的最大值。
// 当然，也可以直接定义MUSICS数组的值，不过那样图片多了会比较麻烦。