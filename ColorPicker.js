function ColorPicker(_x, _y, _w, _h, _color) {
   this.x = _x;
   this.y = _y;
   this.w = _w;
   this.h = _h;
   this.y_piece = this.y + int(this.h);
   this.c2 = color(0, 0, 0);
   this.locked = false;
   this.over = false;

   if (_color == "red") {
      this.c1 = color(255, 0, 0);
   } else if (_color == "green") {
      this.c1 = color(0, 255, 0);
   } else if (_color == "blue") {
      this.c1 = color(0, 0, 255);
   }

   this.findColor = function(_y) {

      this.set_RGB = map(_y, this.y + 2, this.y + this.h - 2, 255, 0);

      return int(this.set_RGB);
   }

   this.update = function() {
      if (this.intersects(mouseX, mouseY)) {
         this.over = true;
      } else {
         this.over = false;
      }
      if (mouseHold && this.over && pipetTool == false && mouseOverLed == false) {
         this.locked = true;
      }
      if (mouseHold == false || mouseOverLed) {
         this.locked = false;
      }
      if (this.locked) {
         if (_color == "red") {
            pickedRed = this.findColor(mouseY);
            pickedRed = constrain(pickedRed, 0, 255);
         }
         else if (_color == "green") {
            pickedGreen = this.findColor(mouseY);
            pickedGreen = constrain(pickedGreen, 0, 255);
         }
         else if (_color == "blue") {
            pickedBlue = this.findColor(mouseY);
            pickedBlue = constrain(pickedBlue, 0, 255);
         }
         this.y_piece = mouseY;
         this.y_piece = constrain(this.y_piece, this.y, this.y + this.h);
      }
   }

   this.intersects = function(_x, _y) {
      if (this.x <= _x && this.x + this.w > _x && this.y <= _y && this.y + this.h > _y) {
         return true;
      }
      return false;
   }


   this.show = function() {
      this.setGradient(this.x, this.y, this.w, this.h, this.c1, this.c2);
      fill(255);
      noStroke();
      rectMode(CENTER);
      rect(this.x + this.w / 2, this.y_piece, this.w * 2 / 3, 5, 6, 6);
      rectMode(CORNER);
   }

   this.setGradient = function(x, y, w, h, c1, c2) {
      noFill();
      for (var i = y; i <= y + h; i++) {
         var inter = map(i, y, y + h, 0, 1);
         var c = lerpColor(c1, c2, inter);
         stroke(c);
         line(x, i, x + w, i);

      }
      stroke(255);
      strokeWeight(4);
      noFill();
      rect(this.x - 4, this.y - 4, this.w + 8, this.h + 8, 6, 6);
   }
}
