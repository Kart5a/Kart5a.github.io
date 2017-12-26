function Indicator() {
  this.x = 0;
  this.size = 6 * grid;
  this.y = height - this.size;

  this.show = function() {
    fill(selectedColor[0], selectedColor[1], selectedColor[2]);
    rect(this.x, this.y, this.size, this.size);
  }
}
