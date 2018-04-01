function Watering_can() {

   this.x = -10;
   this.y = 510;
   this.w = 180;
   this.h = 100;

   this.intersects = function(_x, _y) {
      if (this.x < _x && this.x + this.w >= _x && this.y < _y && this.y + this.h >= _y) {
         return true;
      } else {
         return false;
      }
   }

   this.show = function() {
      image(watering_can_img, this.x, this.y, this.w, this.h);
   }

}
