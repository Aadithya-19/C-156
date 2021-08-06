AFRAME.registerComponent("game-play", {
  schema: {
    elementId: { type: "string", default: "#ring1" },
  },
  update: function () {
    this.isCollided(this.data.elementId);
  },

  init: function () {
    var duration = 120;
    const timerEl = document.querySelector("#timer");
    this.startTimer(duration, timerEl);
  },

  startTimer: function (duration, timerEl) {
    var minutes;
    var seconds;

    setInterval(() => {

        if (duration >= 0) {
          minutes = parseInt(duration / 60);
          seconds = parseInt(duration % 60);

          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }

          timerEl.setAttribute("text", {
            value: minutes + ":" + seconds,
          });

          duration -= 1;
        }
        else {
          this. gameOver();
        
      }
    }, 1000)


  },
  isCollided: function (elemntId) {

    const element = document.querySelector(elemntId);

    element.addEventListener("collide", (e) => {

      if (elemntId.includes("#ring")) {

        element.setAttribute("visible", false)

        this.updateScore();

        this.updateTarget();

      } else {

        this.gameOver();

      }
    });
  },

  updateTarget: function () {

    const uT = document.querySelector("#targets");

    var count = uT.getAttribute("text").value;

    var currentTargets = parseInt(count);

    currentTargets -= 1;

    uT.setAttribute("text", { value: currentTargets });
  },

  updateScore: function () {

    const uS = document.querySelector("#score");

    var count = uS.getAttribute("text").value;

    var currentScore = parseInt(count);

    currentScore += 50;

    uS.setAttribute("text", { value: currentScore });
  },

  gameOver: function () {

    const gO = document.querySelector("#plane_model");

    var element = document.querySelector("#game_over_text")



    element.setAttribute("visible", true)

    gO.setAttribute("dynamic-body", { mass: 1 })

  },
});
