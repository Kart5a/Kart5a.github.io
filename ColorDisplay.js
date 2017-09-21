function ColorDisplay() {
  this.x = 638;
  this.y = 170;
  this.w = 100;
  this.h = 100;

  this.c = color(pickedRed, pickedGreen, pickedBlue);

  this.show = function() {
    this.c = color(pickedRed, pickedGreen, pickedBlue);
    fill(this.c);
    rect(this.x, this.y, this.w, this.h);
    fill(0);
    textAlign(LEFT, CENTER);
    textSize(20);
    text("RGB: (" + pickedRed + ", " + pickedGreen + ", " + pickedBlue + ")", 488, 295);
  }
}
