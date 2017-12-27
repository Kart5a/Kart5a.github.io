function Bullet(_x, _y, _xspeed, _yspeed, power) {
   this.x = _x;
   this.y = _y;
   this.xspeed = _xspeed;
   this.yspeed = _yspeed;
   this.power = power;
   this.d = (this.power/6)*(1+(1-(this.power/100)));
   this.color = 255 - this.power * 2.55;
   this.color = constrain(this.color, 0, 255);
   this.power = constrain(this.power, 10, 100);

   this.show = function() {
      fill(this.color);
      stroke(0);
      ellipse(this.x, this.y, this.d);
      if (this.y < height / 10) {
         fill(0, 80);
         rect(this.x, height/10 + 20, 5, 20);
         noStroke();
         text(floor(this.y*-1/2 + height/10), this.x + 10, height/10 + 40);
      }
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
