function Pometrus(_age, _x, _y) {
   this.size = 50;
   this.angle = random(0, TWO_PI);

   this.age = 0;

   if (_age == null) {
      let a, b, c, d;

      if (tree.form == 2) {
         a = 280;
         b = 320;
         c = 200;
         d = 100;
      } else if (tree.form == 3) {
         a = 240;
         b = 120;
         c = 230;
         d = 260;
      } else if (tree.form >= 4) {
         a = 240;
         b = 120;
         c = 320;
         d = 240;
      }

      this.x = floor(random(a, a + c));
      this.y = floor(random(b, b + d));
   } else {
      this.age = _age;
      this.x = _x;
      this.y = _y;
   }

   this.moreAge = function() {
      this.age += 1;
   }

   this.intersects = function(_x, _y) {
      if (this.x - this.size / 2 < _x && this.x + this.size / 2 >= _x && this.y - this.size / 2 < _y && this.y + this.size / 2 >= _y) {
         return true;
      } else {
         return false;
      }
   }

   this.fall = function() {
      this.y = 550;
   }

   this.show = function() {
      image(pometrus_img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
   }

}
