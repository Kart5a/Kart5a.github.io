function ColorDisplay() {
  this.x = 638;
  this.y = 170;
  this.w = 100;
  this.h = 100;

  this.c = color(pickedRed, pickedGreen, pickedBlue);

  this.show = function() {
    this.c = color(pickedRed, pickedGreen, pickedBlue);
    stroke(255);
    strokeWeight(4);
    fill(this.c);
    rect(this.x, this.y, this.w, this.h, 6, 6);
    fill(0);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(19);
    fill(255);
    rect(488, 292, 250, 30, 4, 4);
    fill(0);
    text("RGB: (" + pickedRed + ", " + pickedGreen + ", " + pickedBlue + ")", 498, 307);
  }
}
