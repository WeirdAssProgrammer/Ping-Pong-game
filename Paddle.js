const COMP_MAX_SPEED = 0.02;

export default class Paddle {
  constructor(paddleElem) {
    this.paddleElem = paddleElem;
    this.reset();
  }

  get position() {
    return parseFloat(
      getComputedStyle(this.paddleElem).getPropertyValue("--position")
    );
  }
  set position(value) {
    this.paddleElem.style.setProperty("--position", value);
  }
  update(delta, ballHeight) {
    this.position += COMP_MAX_SPEED * delta * (ballHeight - this.position);
    //comment above and uncomment this for sigma mode :D
    // this.position = ballHeight;
  }
  reset() {
    this.position = 50;
  }
  rect() {
    return this.paddleElem.getBoundingClientRect();
  }
}
