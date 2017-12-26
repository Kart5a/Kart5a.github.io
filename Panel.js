function Panel() {

   this.show = function() {
      this.showBG();
      this.showHP(cannons[0], 10, 10);
      this.showHP(cannons[1], width - 10 - 250, 10);
      this.showMoney(cannons[0], 260, 20);
      this.showMoney(cannons[1], width - 10, 20);
   }

   this.showBG = function() {
      fill(230);
      rectMode(CORNER);
      rect(0, 0, width, height / 10);
   }

   this.showHP = function(cannon, x, y) {
      fill(0, 255, 0);
      stroke(0);
      rect(x, y, 250, 20);
      fill(255, 0, 0);
      rect(x + cannon.hp * 2.5, 10, 250 - cannon.hp * 2.5, 20);
      fill(0);
      textSize(22);
      text(cannon.hp + "/100 HP", x, y + 50);
      noStroke();
   }

   this.showMoney = function(cannon, x, y) {
      fill(0);
      textSize(25);
      textAlign(RIGHT);
      text(cannon.money + " $", x, y + 40);
      textAlign(LEFT);
   }
}
