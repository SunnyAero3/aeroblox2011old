(function () {

  function init() {

    var audio = document.createElement("audio");
    audio.src = "audio/bloxburg-menu.mp3";
    audio.loop = true;
    audio.volume = 0.5;
    document.body.appendChild(audio);

    var started = false;

    function startMusic() {
      if (started) return;
      started = true;

      try {
        audio.currentTime = 0;
        audio.play();
      } catch (e) {}

      // remove listener after first trigger
      document.removeEventListener("click", startMusic);
      document.removeEventListener("touchstart", startMusic);
      document.removeEventListener("keydown", startMusic);
      document.removeEventListener("mousedown", startMusic);
    }

    // attach ONLY safe interactions
    document.addEventListener("click", startMusic, false);
    document.addEventListener("touchstart", startMusic, false);
    document.addEventListener("keydown", startMusic, false);
    document.addEventListener("mousedown", startMusic, false);

  }

  // ensure DOM is ready (prevents “completely broke” issue)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
