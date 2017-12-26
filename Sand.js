function Sand(_x, _y, green) {
   this.x = _x;
   this.y = _y;
   this.r1 = random(40, 60);

   if (green) {
      this.r2 = random(150, 200);
   } else {
      this.r2 = random(30, 50);
   }

   this.show = function() {
      rectMode(CENTER);
      fill(this.r1, this.r2, 3);
      noStroke();
      rect(this.x, this.y, terrain.space, terrain.space);
   }

   this.intersects = function(_x, _y) {
      if (this.x - terrain.space / 2 <= _x && this.x - terrain.space / 2 + terrain.space > _x &&
         this.y - terrain.space / 2 <= _y && this.y - terrain.space / 2 + terrain.space > _y) {
         return true;
      }
      return false;
   }
}
