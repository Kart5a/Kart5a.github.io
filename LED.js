function LED( _x,  _y,  _x_matrix, _y_matrix) {
  this.x = _x;
  this.y = _y;
  this.x_matrix = _x_matrix;
  this.y_matrix = _y_matrix;
  this.s_l = 56;
  this.red = 0;
  this.green = 0;
  this.blue = 0;

  this.setColor = function(  _red,  _green,  _blue) {
    this.red = _red;
    this.green = _green;
    this.blue = _blue;
  }

  this.getRedColor = function() {
    return this.red;
  }
  this.getGreenColor = function() {
    return this.green;
  }
  this.getBlueColor = function() {
    return this.blue;
  }

  this.click = function(  _x,  _y,  _red,  _green,  _blue) {
    if (this.intersects(_x, _y)) {
      this.setColor(_red, _green, _blue);
    }
  }


  this.intersects = function( _x,  _y) {
    if (this.x <= _x && this.x + this.s_l > _x && this.y <= _y && this.y + this.s_l > _y) {
      return true;
    }
    return false;
  }

  this.show = function() {
    noStroke();
    fill(0);
    rect(this.x, this.y, this.s_l, this.s_l);
    stroke(50);
    strokeWeight(1);
    fill(this.red, this.green, this.blue);
    ellipse(this.x+this.s_l/2, this.y+this.s_l/2, this.s_l - 2, this.s_l - 2);
    fill(255, 100);
    if (this.red > 0 || this.green > 0 || this.blue > 0) {
      noStroke();
      ellipse(this.x+this.s_l/3, this.y+this.s_l/3, 12, 12);
    }
  }
}
