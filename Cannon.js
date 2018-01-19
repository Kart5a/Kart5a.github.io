function Cannon(left = false) {

   this.y = height / 3;
   this.w = 40;
   this.h = 20;

   this.hp = 100;
   this.money = 120;
   this.power = 35;

   this.repairs = 0;
   this.tss = false;

   if (left) {
      this.x = width / 5 * 4;
      this.turn = false;
   } else {
      this.x = width / 5 - this.w;
      this.turn = true;
   }

   this.showPipe = function() {
      stroke(0);
      strokeCap(SQUARE);
      strokeWeight(10);
      var d = dist(this.x + this.w / 2, this.y + 10, mouseX, mouseY);
      var dx = this.x + this.w / 2 - mouseX;
      var dy = this.y + 10 - mouseY;
      var l = 40;
      line(this.x + this.w / 2, this.y + 10, (this.x + this.w / 2) - dx / d * l, (this.y + 10) - dy / d * l);
      this.pipeX = (this.x + this.w / 2) - dx / d * l;
      this.pipeY = (this.y + 10) - dy / d * l;
      strokeWeight(1);
      noStroke();
   }

   this.showForce = function() {

      strokeCap(SQUARE);
      strokeWeight(2);
      var d = dist(this.pipeX, this.pipeY, mouseX, mouseY);
      var dx = this.pipeX - mouseX;
      var dy = this.pipeY - mouseY;
      var l = constrain(d, 40, 200);
      stroke(l, 255-l, 0);
      line(this.pipeX, this.pipeY, this.pipeX - dx / d * l, this.pipeY - dy / d * l);
      strokeWeight(1);
      noStroke();
      fill(0);
      text('F:' + round(l/2), mouseX - 30, mouseY - 30);
   }

   this.events = function() {
      this.show();
      this.hp = constrain(this.hp, 0, 100);
      this.money = constrain(this.money, 0, 999);
      this.y = constrain(this.y, 0, height - this.h);

      if (this.checkSands()) {
         this.moveDown();
      }

      if (this.turn && mouseY > height/10 && can_shoot) {
         this.showForce();
         this.showPipe();
      }
   }

   this.show = function() {
      rectMode(CORNER);
      fill(10);
      rect(this.x, this.y, this.w, this.h);
   }

   this.isUnder = function(_x, _y, _w) {
      var d = (_y - this.y);
      if (d < this.h && _x < this.x + this.w && _x > this.x) {
         return true;
      } else {
         return false;
      }
   }

   this.checkSands = function() {
      var move = true;
      for (var s of terrain.sands) {
         if (this.isUnder(s.x, s.y, s.w)) {
            move = false;
         }
      }
      return move;
   }

   this.resetAll = function() {
      this.y = height / 3;
      this.w = 40;
      this.h = 20;

      this.hp = 100;
      this.money = 120;
      this.power = 35;

      this.repairs = 0;
      this.tss = false;

      if (left) {
         this.x = width / 5 * 4;
         this.turn = false;
      } else {
         this.x = width / 5 - this.w;
         this.turn = true;
      }
   }

   this.resetPosition = function() {
      this.y = height / 3;
   }

   this.moveDown = function() {
      this.y += 3;
   }

   this.intersects = function(_x, _y) {
      if (_x > this.x && _x < this.x + this.w && _y > this.y && _y < this.y + this.h) {
         return true;
      } else {
         return false;
      }
   }
}
