function Sand(_x, _y, color) {
   this.x = _x;
   this.y = _y;
   this.col = [0, 0, 0];

   if (color == 1) {
      this.r2 = random(150, 200);
      this.r1 = random(40, 60);
      this.col = [this.r1, this.r2, 3];

   } else if (color == 2){
      this.r1 = random(40, 60);
      this.col = [this.r1, this.r1, 3];

   } else if (color == 3){
      this.col = [255, 255, 255];
   }

   this.show = function() {
      rectMode(CENTER);
      fill(this.col[0], this.col[1], this.col[2]);
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
