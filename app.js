import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
const ball = new Ball(document.getElementById("ball"));
const playerPaddle = new Paddle(document.getElementById("player-paddle"));
const compPaddle = new Paddle(document.getElementById("comp-paddle"));
const playeScoreElem = document.getElementById("player-score");
const compScoreElem = document.getElementById("comp-score");
const won = document.getElementById("won");
const lost = document.getElementById("lose");
let lastTime;
function update(time) {
  if (lastTime != null) {
    const delta = time - lastTime;
    ball.update(delta, [playerPaddle.rect(), compPaddle.rect()]); //a method for Ball class
    compPaddle.update(delta, ball.y);

    const hue = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--hue")
    );
    document.documentElement.style.setProperty("--hue", hue + delta * 0.1);
    if (isLose()) {
      handleLose();
    }
  }
  lastTime = time;
  window.requestAnimationFrame(update);
  // todo make a win and lose screen
  // if (parseInt(playeScoreElem) == 1) {
  //   // console.log(playeScoreElem);
  //   ball.stop();
  //   won.style.display = "block";
  // } else if (parseInt(compScoreElem) == 1) {
  //   ball.stop();
  //   // console.log(compScoreElem);
  //   lost.style.display = "block";
  // }
}
function isLose() {
  const rect = ball.rect();
  return rect.right >= window.innerWidth || rect.left <= 0;
}
function handleLose() {
  const rect = ball.rect();
  if (rect.right >= window.innerWidth) {
    compPaddle.reset();
    ball.reset();
    playeScoreElem.textContent = parseInt(playeScoreElem.textContent) + 1;
  } else {
    ball.reset();
    compScoreElem.textContent = parseInt(compScoreElem.textContent) + 1;
  }
}
// setInterval(update, 10); is a bad practise will run in between frames
document.addEventListener("mousemove", (e) => {
  // e is an obj that has x and y props
  playerPaddle.position = (e.y / window.innerHeight) * 100;
}); //make the player paddle move with the mouse
document.addEventListener("touchmove", (e) => {
  playerPaddle.position = (e.y / window.innerHeight) * 100;
});
window.requestAnimationFrame(update); //infinite loop that will keep running untill u close the browser
