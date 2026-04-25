(function () {

  if (document.getElementById("musicPlayer")) return;

  var player = document.createElement("div");
  player.id = "musicPlayer";
  player.innerHTML = "<button id='playBtn'>Play</button> 🎵 Music";
  document.body.appendChild(player);

  var style = document.createElement("style");
  style.type = "text/css";
  style.cssText =
    "#musicPlayer{position:fixed;top:10px;left:10px;z-index:999999;background:rgba(0,0,0,0.6);padding:8px 12px;color:#fff;font-family:Arial;display:flex;align-items:center;gap:10px;}#playBtn{cursor:pointer;background:#4CAF50;border:none;padding:5px 10px;border-radius:6px;color:#fff;}";
  document.getElementsByTagName("head")[0].appendChild(style);

  var audio = document.createElement("audio");
  audio.src = "audio/bloxburg-menu.mp3";
  audio.loop = true;
  audio.volume = 0.5;
  document.body.appendChild(audio);

  var started = false;
  var playing = false;
  var btn = document.getElementById("playBtn");

  function startMusic() {
    if (started) return;
    started = true;

    try {
      audio.currentTime = 0;
      audio.play();
      playing = true;
      btn.innerHTML = "Pause";
    } catch (e) {}

    removeListeners();
  }

  function removeListeners() {
    var events = ["click", "touchstart", "keydown"];

    for (var i = 0; i < events.length; i++) {
      if (document.removeEventListener) {
        document.removeEventListener(events[i], startMusic);
      }
    }
  }

  // attach only REAL trusted gestures
  var events = ["click", "touchstart", "keydown"];

  for (var i = 0; i < events.length; i++) {
    if (document.addEventListener) {
      document.addEventListener(events[i], startMusic);
    } else if (document.attachEvent) {
      document.attachEvent("on" + events[i], startMusic);
    }
  }

  btn.onclick = function () {
    try {
      if (!playing) {
        audio.currentTime = 0;
        audio.play();
        btn.innerHTML = "Pause";
      } else {
        audio.pause();
        btn.innerHTML = "Play";
      }
      playing = !playing;
    } catch (e) {}
  };

})();
