function LED(_x, _y, _x_matrix, _y_matrix) {
   this.x = _x;
   this.y = _y;
   this.x_matrix = _x_matrix;
   this.y_matrix = _y_matrix;
   this.s_l = 56;
   this.red = 0;
   this.green = 0;
   this.blue = 0;

   this.setColor = function(_red, _green, _blue) {
      // Makes LED certain color
      this.red = _red;
      this.green = _green;
      this.blue = _blue;
   }

   // Get functions
   this.getRedColor = function() {
      return this.red;
   }
   this.getGreenColor = function() {
      return this.green;
   }
   this.getBlueColor = function() {
      return this.blue;
   }

   this.click = function(_x, _y, _red, _green, _blue) {
      // When LED is clicked it changes color
      if (this.intersects(_x, _y)) {
         this.setColor(_red, _green, _blue);
      }
   }

   this.update = function() {
      // Checks if mouse is pressed and keeps drawing
      if (this.intersects(mouseX, mouseY)) {
         this.over = true;
      } else {
         this.over = false;
      }
      if (mouseHold && this.over && pipetTool == false && mouseOverSlider == false) {
         this.locked = true;
      }
      if (mouseHold == false || mouseOverSlider) {
         this.locked = false;
      }
      if (this.locked) {
         this.red = pickedRed;
         this.green = pickedGreen;
         this.blue = pickedBlue;
      }
   }


   this.intersects = function(_x, _y) {
      // Checks if something (x,y) is on the LED
      if (this.x <= _x && this.x + this.s_l > _x && this.y <= _y && this.y + this.s_l > _y) {
         return true;
      }
      return false;
   }

   this.show = function() {
      // Shows LED
      noStroke();
      fill(this.red, this.green, this.blue);
      ellipse(this.x + this.s_l / 2, this.y + this.s_l / 2, this.s_l - 8, this.s_l - 8);

   }
}
