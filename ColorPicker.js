function ColorPicker( _x,  _y,  _w , _h,  _color) {
  this.x = _x;
  this.y = _y;
  this.w = _w;
  this.h = _h;
  this.y_piece = this.y + int(this.h);
  this.c2 = color(0, 0, 0);

  if (_color == "red") {
    this.c1 = color(255, 0, 0);
  } else if (_color == "green") {
    this.c1 = color(0, 255, 0);
  } else if (_color == "blue") {
    this.c1 = color(0, 0, 255);
  }

  this.findColor = function( _y) {

    this.set_RGB = map(_y, this.y + 2, this.y + this.h - 2, 255, 0);

    return int(this.set_RGB);
  }


  this.intersects = function( _x,  _y) {
    if (this.x <= _x && this.x + this.w > _x && this.y <= _y && this.y + this.h > _y) {
      return true;
    }
    return false;
  }


  this.show = function() {
    this.setGradient(this.x, this.y, this.w, this.h, this.c1, this.c2);
    fill(230);
    rectMode(CENTER);
    rect(this.x + this.w / 2, this.y_piece, this.w * 2 / 3, 5);
    rectMode(CORNER);
  }

  this.setGradient = function( x,  y,  w,  h,  c1,  c2) {
    noFill();
    for (var i = y; i <= y + h; i++) {
      var inter = map(i, y, y + h, 0, 1);
      var c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  }
}
