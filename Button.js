function Button( _text,  _x,  _y,  _w,  _h,  _c1,  _c2) {
   this.text = _text;
   this.x = _x;
   this.y = _y;
   this.w = _w;
   this.h = _h;
   this.c1 = _c1;
   this.c2 = _c2;

  this.intersects = function( _x,  _y) {
    if (this.x <= _x && this.x + this.w > _x && this.y <= _y && this.y + this.h > _y) {
      return true;
    }
    return false;
  }

  this.show = function() {
    noStroke();
    fill(this.c1);
    rect(this.x, this.y, this.w, this.h, 4, 4);
    fill(this.c2);
    textFont("SourceCodePro-Light");
    textAlign(CENTER, CENTER);
    textSize(16);
    text(this.text, this.x + this.w/2, this.y + this.h/2);
  }
}
