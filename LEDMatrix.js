function LEDMatrix() {
  this.x_size = 8;
  this.y_size = 8;
  this.LEDs = [];

  this.generate = function() {
    for (var y = 0; y < 8; y++) {
      for (var x = 0; x < 8; x++) {
        this.LEDs.push(new LED(20 + 56*x, 20 + 56*y, x, y));
      }
    }
  }

  this.show = function() {
    for (var i = 0; i < this.LEDs.length; i++) {
      this.LEDs[i].show();
    }
  }
}
