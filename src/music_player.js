/**
 * Copyright 2015 Haixing Hu
 *
 * https://github.com/Haixing-Hu/gift-to-lover
 */

/**
 * A customized music player based on the buzz.
 *
 * This music player will play a list of musics sequentially.
 *
 * @param url
 *    the URL or array of URLs of musics.
 * @param options
 *    the options.
 */
function MusicPlayer(url, options) {
  this._musics = [];
  this._index = 0;
  this._muted = false;
  this._paused = true;
  this._stopped = true;
  this._volume = options.volume;
  this._loop = options.loop;

  // create a list of musics
  var urls = [].concat(url);
  var n = urls.length;
  for (var i = 0; i < n; ++i) {
    var music = new buzz.sound(urls[i], {
      preload: false,  // we will use our customized preload mechanism
      autoplay: false, // we will use our customized autoplay mechanism
      loop: false,     // we will loops the whole list
      volume: this._volume,
      webAudioApi: false
    });
    // remember the index of the music
    music._index = i;
    // remember the parent player of the music
    music._player = this;
    // add the event hander when the current music is complete
    music.bind("ended", function(e) {
      console.debug("music " + this._index + " is ended.");
      // continue playing the next music
      var player = this._player;
      if ((! player._paused) && (! player._stopped)) {
        player._play(this._index + 1);
      }
    });
    this._musics.push(music);
  }
}


  //  play the music at the specified index. It's just for internal use.
/**
 * Plays the music at the specified index.
 *
 * This function is for internal use only.
 *
 * @param index
 *    the index of the music to be played.
 * @return
 *    the actual index of the music played.
 */
MusicPlayer.prototype._play = function(index) {
  if (this._musics.length === 0) {
    this._paused = true;
    this._stopped = true;
    return index;
  }
  if (index >= this._musics.length) {
    if (this._loop) {
      index = 0;
    } else {
      this._paused = true;
      this._stopped = true;
      return index;
    }
  } else if (index < 0) {
    if (this._loop) {
      index = this._musics.length - 1;
    } else {
      this._paused = true;
      this._stopped = true;
      return index;
    }
  }
  this._paused = false;
  this._stopped = false;
  console.debug("Playing the music " + index);
  this._musics[index].play();
  return index;
};

MusicPlayer.prototype.load = function() {
  for (var i = 0; i < this._musics.length; ++i) {
    this._musics[i].load();
  }
  return this;
};

MusicPlayer.prototype.play = function() {
  if (! this.isPlaying()) {
    this._index = this._play(this._index);
  }
  return this;
};

MusicPlayer.prototype.pause = function() {
  if (this._paused || this._stopped) {
    return this;
  }
  console.debug("Pause the music " + this._index);
  if (this._index >= 0 && this._index < this._musics.length) {
    this._paused = true;
    this._musics[this._index].pause();
  }
  return this;
};

MusicPlayer.prototype.stop = function() {
  if (this._stopped) {
    return this;
  }
  console.debug("Stop the music " + this._index);
  if (this._index >= 0 && this._index < this._musics.length) {
    this._paused = true;
    this._stopped = true;
    this._musics[this._index].stop();
    this._index = 0;
  }
  return this;
};

MusicPlayer.prototype.isPlaying = function() {
  return (! this._paused) && (! this._stopped);
};

MusicPlayer.prototype.isPaused = function() {
  return this._paused;
};

MusicPlayer.prototype.isStopped = function() {
  return this._stopped;
};

MusicPlayer.prototype.togglePlay = function() {
  if (this._paused) {
    this.play();
  } else {
    this.pause();
  }
};

MusicPlayer.prototype.loop = function() {
  this._loop = true;
  return this;
};

MusicPlayer.prototype.unloop = function() {
  this._loop = false;
  return this;
};

MusicPlayer.prototype.mute = function() {
  for (var i = 0; i < this._musics.length; ++i) {
    this._musics[i].mute();
  }
  this._muted = true;
  return this;
};

MusicPlayer.prototype.unmute = function() {
  for (var i = 0; i < this._musics.length; ++i) {
    this._musics[i].unmute();
  }
  this._muted = false;
  return this;
};

MusicPlayer.prototype.toggleMute = function() {
  for (var i = 0; i < this._musics.length; ++i) {
    this._musics[i].toggleMute();
  }
  this._muted = (! this._muted);
  return this;
};

MusicPlayer.prototype.isMuted = function() {
  return this._muted;
};

MusicPlayer.prototype.setVolume = function(volume) {
  this._volume = volume;
  for (var i = 0; i < this._musics.length; ++i) {
    this._musics[i].setVolume(volume);
  }
  return this;
};

MusicPlayer.prototype.getVolume = function() {
  return this._volume;
};

MusicPlayer.prototype.increaseVolume = function(value) {
  this._volume = this._volume + (value || 1);
  for (var i = 0; i < this._musics.length; ++i) {
    this._musics[i].increaseVolume(value);
  }
  return this;
};

MusicPlayer.prototype.decreaseVolume = function(value) {
  this._volume = this._volume - (value || 1);
  for (var i = 0; i < this._musics.length; ++i) {
    this._musics[i].decreaseVolume(value);
  }
  return this;
};

// MusicPlayer.prototype.fadeIn = function(duration, callback) {
//   if (this._index >= 0 && this._index < this._musics.length) {
//     this._musics[this._index].fadeIn(duration, callback);
//   }
//   return this;
// };

// MusicPlayer.prototype.fadeOut = function(duration, callback) {
//   if (this._index >= 0 && this._index < this._musics.length) {
//     this._musics[this._index].fadeOut(duration, callback);
//   }
//   return this;
// };

// MusicPlayer.prototype.fadeTo = function(duration, callback) {
//   if (this._index >= 0 && this._index < this._musics.length) {
//     this._musics[this._index].fadeTo(duration, callback);
//   }
//   return this;
// };

// MusicPlayer.prototype.fadeWith = function(duration, callback) {
//   if (this._index >= 0 && this._index < this._musics.length) {
//     this._musics[this._index].fadeWith(duration, callback);
//   }
//   return this;
// };

MusicPlayer.prototype.next = function() {
  this._paused = true;
  if (this._index >= 0 && this._index < this._musics.length) {
    this._musics[this._index].stop();
  }
  this._paused = false;
  this._index = this._play(this._index + 1);
  return this;
};

MusicPlayer.prototype.previous = function() {
  this._paused = true;
  if (this._index >= 0 && this._index < this._musics.length) {
    this._musics[this._index].stop();
  }
  this._paused = false;
  this._index = this._play(this._index - 1);
  return this;
};

MusicPlayer.prototype.first = function() {
  this._paused = true;
  if (this._index >= 0 && this._index < this._musics.length) {
    this._musics[this._index].stop();
  }
  this._paused = false;
  if (this._musics.length > 0) {
    this.paused = false;
    this.stopped = false;
    this._index = 0;
    this._musics[0].play();
  } else {
    this.paused = true;
    this.stopped = true;
  }
  return this;
};

MusicPlayer.prototype.last = function() {
  this._paused = true;
  if (this._index >= 0 && this._index < this._musics.length) {
    this._musics[this._index].stop();
  }
  this._paused = false;
  if (this._musics.length > 0) {
    this.paused = false;
    this.stopped = false;
    this._index = this._musics.length - 1;
    this._musics[this._index].play();
  } else {
    this.paused = true;
    this.stopped = true;
  }
  return this;
};