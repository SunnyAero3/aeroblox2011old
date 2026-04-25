(function () {

  // =========================
  // DETECT IE
  // =========================
  var isIE = !!document.documentMode;

  // =========================
  // AUDIO SETUP
  // =========================
  var audio = document.createElement("audio");
  audio.src = "audio/bloxburg-menu.mp3";
  audio.loop = true;
  audio.volume = 0.5;
  document.body.appendChild(audio);

  var started = false;

  // =========================
  // MODERN MODE
  // =========================
  function startMusicModern() {
    if (started) return;
    started = true;

    try {
      audio.currentTime = 0;
      audio.play();
    } catch (e) {}

    detachModern();
  }

  function detachModern() {
    var events = ["click", "touchstart", "keydown"];
    for (var i = 0; i < events.length; i++) {
      if (document.removeEventListener) {
        document.removeEventListener(events[i], startMusicModern);
      }
    }
  }

  // =========================
  // IE MODE (SAFE BUTTON ONLY)
  // =========================
  function createIEButton() {
    var btn = document.createElement("button");
    btn.innerHTML = "Play Music 🎵";

    btn.style.position = "fixed";
    btn.style.top = "10px";
    btn.style.left = "10px";
    btn.style.zIndex = "999999";
    btn.style.padding = "8px 12px";
    btn.style.fontFamily = "Arial";

    document.body.appendChild(btn);

    btn.onclick = function () {
      try {
        audio.currentTime = 0;
        audio.play();
        btn.innerHTML = "Music Playing 🎵";
      } catch (e) {
        btn.innerHTML = "Blocked in IE";
      }
    };
  }

  // =========================
  // RUN MODE
  // =========================
  if (isIE) {

    // IE fallback only
    createIEButton();

  } else {

    // =========================
    // MODERN: first interaction anywhere
    // =========================
    var events = ["click", "touchstart", "keydown"];

    for (var i = 0; i < events.length; i++) {
      document.addEventListener(events[i], startMusicModern, false);
    }

  }

})();
