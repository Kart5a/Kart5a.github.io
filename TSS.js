function TSS(_x, _y, _xspeed, _yspeed) {
   this.x = _x;
   this.y = _y;
   this.xspeed = _xspeed;
   this.yspeed = _yspeed;
   this.power = 100;
   this.d = 10;

   this.show = function() {
      fill(220, 0, 110);
      strokeWeight(3);
      stroke(0, 0, 255);
      ellipse(this.x, this.y, this.d);
      if (this.y < height / 10) {
         fill(0, 80);
         rect(this.x, height/10 + 20, 5, 20);
         noStroke();
         text(floor(this.y*-1/2 + height/10), this.x + 10, height/10 + 40);
      }
      strokeWeight(1);
      noStroke();
   }

   this.move = function() {
      this.yspeed += gravity;
      this.xspeed += wind * 0.02;

      this.x += this.xspeed;
      this.y += this.yspeed;
   }

   this.intersects = function(_x, _y, _w, _h) {
      if (this.x > _x && this.x <= _x + _w && this.y > _y && this.y <= _y + _h) {
         return true;
      } else {
         return false;
      }
   }

}
