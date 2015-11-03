# gift-to-lover

程序猿(媛)/极客/理工男(女)们，献给爱人的DIY礼物。

## 功能

全屏以幻灯片模式显示一系列图片，并循环播放背景音乐。

图片来自网络上网友收集的电影中出现“我爱你”字幕的截图。虽然这些图片不是鄙人一一截图的，但在几千张图片中排除重复的，排除有水印的，排除分辨率低的，再排除镜头画面不美的，最后剩下520张，也确实花费了不少时间和心思。

背景音乐目前只有一首，循环播放卢冠廷的《一生所爱》。这是鄙人最喜欢的歌曲之一，词曲皆佳，最重要的是旋律风格和整体幻灯片播放的风格很搭配。当然，也可以用多首背景音乐循环播放，但暂时尚未找到合适的音乐。

此项目不仅仅可以用于表白，还可以用作生日礼物、圣诞礼物等等。只需要更换合适的图片和背景音乐，定制合适的字幕即可。

各位同学若对此项目有任何意见或建议，请在 issue 中和我讨论。

另，征集电影截图，以及背景音乐。有推荐的电影或音乐也请提在 issue 中，谢谢！

## 演示

参见[演示页面](http://haixing-hu.github.io/gift-to-lover/repo/src/index.html)

## 使用方法

- check out 这个代码库；如果不会用git，也可以直接下载整个代码库的压缩包然后解压；
- 按需要，修改 `src/config.js` 文件中的配置；文件中有中文注释，很容易看懂；
- 打开 `src/index.html` 网页可以看到效果；
- `src/images`中保存的图片是幻灯片轮流播放的图片，其中"start.jpg"是第一张图片；"end.jpg"是最后一张；其他中间的图片，文件名从`1.jpg`开始依次编号；注意文件后缀必须为`.jpg`，
也就是说只支持 JPEG 格式的图片；添加或减少图片数目后，必须修改`src/config.js`中的`IMAGE_COUNT`变量值；
- `src/musics`中保存的音乐是幻灯片播放时的背景音乐，文件名从`1.mp3`开始依次编号；注意文件后缀必须为`.mp3`，
也就是说只支持 MP3 格式的音乐；添加或减少音乐数目后，必须修改`src/config.js`中的`MUSIC_COUNT`变量值；
- `src/rename_files.sh`脚本可以批量重命名当前目录中的文件，文件名以数字编号，从1开始，文件后缀依然为原文件后缀。此工具可用于重命名大批量的图片文件。

## 支持的浏览器

- Chrome: 45.0.2454.99 测试通过，所有功能正常；
- Firefox: 40.0.3 测试通过，所有功能正常；
- Safari: 9.0.1 测试通过，所有功能正常；
- IE: 尚未测试，不过至少已知全屏功能是不支持的；

强烈建议使用最新版的Chrome以获得最佳的浏览效果。

## 已知问题

- ~~预载入速度太慢且无进度条指示载入百分比~~；已增加预载入图片和音乐的功能和进度指示；
- ~~在网络较慢的环境下，效果比较卡~~；设置预载入图片和音乐即可；

## 计划

- [x] 加入背景音乐播放功能；
- [x] 加入全屏显示功能（是指将整个浏览器页面全屏，隐藏浏览器窗口）；
- [x] 增加图片计数器；
- [x] 连续播放多首背景音乐；
- [ ] 随机乱序播放背景音乐；
- [x] 增加预载入进度条指示载入百分比；
- [ ] 电影截图不够清晰，需要重新选择高清的、无水印的电影截图；
- [ ] 需要调整电影截图的顺序播放顺序；
- [ ] 开头增加一些字幕，描述一下礼物献给的对象以及其他一些要对她/他说的话；
- [ ] 定制第一张幻灯片和最后一张幻灯片中的字幕，打算最后一张显示大话西游的那段经典台词，并且播放那首《一生所爱》；
- [ ] 最后增加一个可选的致谢字幕，向项目的资源提供者表示感谢；
- [ ] 制作脚本一键发布项目到某些常见的个人网站（比如发布到自己的github page上）；
- [ ] 制作脚本将项目打包为成苹果、安卓的手机应用；

## 致谢

此项目，使用了下述资源、代码和工具，在此一并表示感谢！

- 项目的灵感以及最初的电影截图来自于 @陈弈飘 同学在知乎上的下面这个答案：
  http://www.zhihu.com/question/21682442/answer/36924153?group_id=636890926812016640
- 还有个网上流传的所谓“520张我爱你电影截图.rar”，原始出处已经找不到了，网盘下载链接在此：
  http://pan.baidu.com/share/link?uk=2033284939&shareid=1230432853
- 部分图片还来源于下面的贴吧帖子：
  http://tieba.baidu.com/p/1808798036
- 以及下面的贴吧帖子：
  http://tieba.baidu.com/p/2379987803
- 部分图片还来源于下面的相册：
  http://www.topit.me/album/1114176
- 还有 @狼魄乾坤 同学的这个豆瓣相册：
  http://www.douban.com/photos/album/157693223/
- 幻灯片播放代码来自于 Jay Salvat 的 vegas 项目：
  https://github.com/jaysalvat/vegas
- 音乐播放代码来自于 Jay Salvat 的 buzz 项目：
  https://github.com/jaysalvat/buzz
- 带背景音乐的幻灯片播放的设计思路来自于这篇 Jay Salvat 的这篇博文：
  http://tympanus.net/codrops/2011/07/05/fullscreen-slideshow-with-html5-audio/
- 全屏显示的代码来自于下面的博文：
  http://johndyer.name/native-fullscreen-javascript-api-plus-jquery-plugin/
- 预载入幻灯片图像的代码思路来自下面的博文：
  http://www.inwebson.com/jquery/jpreloader-a-preloading-screen-to-preload-images/
- 预载入背景音乐的代码思路来自下面的答案：
  http://stackoverflow.com/questions/5313646/how-to-preload-a-sound-in-javascript
- Mac上用于查找相似图片的商业软件 Snapselect，不过奇怪的是这么好的软件似乎已经停止销售了，连官网都找不到产品页面了。目前该软件在 App Store 上免费提供：
  https://itunes.apple.com/us/app/snapselect-amazing-photo-duplicates/id935700987
- Mac上用于查找相似图片的商业软件 PhotoSweeper：
  https://itunes.apple.com/us/app/photosweeper/id463362050

## 请我喝杯咖啡

如果你觉得我的项目对你有帮助，想要感谢我的话，那就拿出微信扫描下面二维码，请我喝杯拿铁吧 :-)

![请我喝杯咖啡](buy_me_a_coffee.png)

## 协议

本项目的代码遵循 [GNU General Public License v3.0](http://www.gnu.org/licenses/gpl.html)

本项目用到的各类图片，音乐资源收集自网络，仅供个人使用。若无意中侵犯了您的版权，请与本人联系，我会立即将其删除。
