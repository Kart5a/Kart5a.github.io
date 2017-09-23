function ColorDisplay() {
   this.x = 638;
   this.y = 170;
   this.w = 100;
   this.h = 100;
   this.bgc = 255;

   this.c = color(pickedRed, pickedGreen, pickedBlue);


   this.update = function() {
      colorDisplay.red_intersects(mouseX, mouseY);
      colorDisplay.green_intersects(mouseX, mouseY);
      colorDisplay.blue_intersects(mouseX, mouseY);
   }

   this.red_intersects = function(_x, _y) {
      if (_x > this.x && _x <= this.x + this.w && _y > 280 && _y <= 280 + 27) {
         return true;
      }
      else { return false; }
   }

   this.green_intersects = function(_x, _y) {
      if (_x > this.x && _x <= this.x + this.w && _y > 280 + 27 && _y <= 280 + 27 * 2) {
         return true;
      } else {
         return false;
      }
   }

   this.blue_intersects = function(_x, _y) {
      if (_x > this.x && _x <= this.x + this.w && _y > 280 + 27 * 2 && _y <= 360) {
         return true;
      } else {
         return false;
      }
   }

   this.show = function() {
      this.c = color(pickedRed, pickedGreen, pickedBlue);
      stroke(255);
      strokeWeight(4);
      fill(this.c);
      rect(this.x, this.y, this.w, this.h, 6, 6);
      fill(0);
      noStroke();
      textAlign(LEFT, CENTER);
      textSize(16);
      fill(this.bgc);
      rect(this.x, 280, 100, 82, 4, 4);
      textFont(myFont);
      if (this.red_intersects(mouseX, mouseY)) {
         fill(255, 0, 0);
         textSize(18);
      } else {
         textSize(16);
         fill(0);
      }

      text("R: " + pickedRed, 650, 296);

      if (this.green_intersects(mouseX, mouseY)) {
         fill(0, 255, 0);
         textSize(18);
      } else {
         textSize(16);
         fill(0);
      }

      text("G: " + pickedGreen, 650, 321);

      if (this.blue_intersects(mouseX, mouseY)) {
         fill(0, 0, 255);
         textSize(18);
      } else {
         textSize(16);
         fill(0);
      }

      text("B: " + pickedBlue, 650, 346);
   }
   textFont(myFont);
}
