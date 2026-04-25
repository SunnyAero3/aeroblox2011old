(function () {

  // prevent double load
  if (document.getElementById("musicPlayer")) return;

  // =========================
  // CREATE UI
  // =========================
  var player = document.createElement("div");
  player.id = "musicPlayer";
  player.innerHTML = "<button id='playBtn'>Play</button> 🎵 Music";

  document.body.appendChild(player);

  // =========================
  // STYLE (IE-safe)
  // =========================
  var style = document.createElement("style");
  style.type = "text/css";
  style.cssText =
    "#musicPlayer{position:fixed;top:10px;left:10px;z-index:999999;background:rgba(0,0,0,0.6);padding:8px 12px;color:#fff;font-family:Arial;display:flex;align-items:center;gap:10px;}#playBtn{cursor:pointer;background:#4CAF50;border:none;padding:5px 10px;border-radius:6px;color:#fff;}";

  document.getElementsByTagName("head")[0].appendChild(style);

  // =========================
  // AUDIO (IE SAFE)
  // =========================
  var audio = document.createElement("audio");
  audio.src = "audio/bloxburg-menu.mp3";
  audio.loop = true;
  audio.volume = 0.5;
  document.body.appendChild(audio);

  var playing = false;
  var btn = document.getElementById("playBtn");

  // =========================
  // PLAY BUTTON (IE compatible)
  // =========================
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

  // =========================
  // UNIVERSAL AUTOSTART (SAFE)
  // =========================
  function startMusic() {
    try {
      audio.currentTime = 0;
      audio.play();
      playing = true;
      btn.innerHTML = "Pause";
    } catch (e) {}

    // remove listener after first trigger
    if (document.removeEventListener) {
      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
    }
  }

  if (document.addEventListener) {
    document.addEventListener("click", startMusic);
    document.addEventListener("touchstart", startMusic);
  } else if (document.attachEvent) {
    document.attachEvent("onclick", startMusic);
  }

  // =========================
  // OPTIONAL: restore position (modern browsers only)
  // =========================
  try {
    var t = localStorage.getItem("musicTime");
    if (t) audio.currentTime = parseFloat(t);
  } catch (e) {}

  window.onbeforeunload = function () {
    try {
      localStorage.setItem("musicTime", audio.currentTime);
    } catch (e) {}
  };

})();
