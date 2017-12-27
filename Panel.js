function Panel() {

   this.show = function() {
      this.showBG();
      this.showHP(cannons[0], 10, 10);
      this.showHP(cannons[1], width - 10 - 250, 10);
      this.showPower(cannons[0], 10, 10);
      this.showPower(cannons[1], width - 10 - 250, 10);
      this.showRepairs(cannons[0], 260, 10);
      this.showRepairs(cannons[1], width - 10, 10);;
      this.showMoney(cannons[0], 260, 20);
      this.showMoney(cannons[1], width - 10, 20);
      this.showWind();
      this.shopButton();
   }

   this.showBG = function() {
      fill(240);
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

   this.showWind = function(x, y) {
      stroke(0);
      fill(255);
      rectMode(CENTER);
      rect(width / 2, 20, 200, 20);
      fill(255, 0, 0);
      rect(width / 2, 20, 4, 20);
      fill(150);
      rectMode(CORNER);
      if (wind > 0) {
         rect(width / 2, 10, wind * 100, 20);
      } else {
         rect(width / 2 + wind * 100, 10, wind * 100, 20);
      }
      textAlign(CENTER);
      textSize(20);
      text("Wind: " + nf(wind, 1, 2), width / 2, 52);
      textAlign(LEFT);
      noStroke();
   }

   this.shopButton = function(x, y) {
      rectMode(CENTER);
      fill(200);
      rect(width / 2, 80, 100, 35);
      textAlign(CENTER);
      fill(0);
      textSize(25);
      text("SHOP", width / 2, 90);
      textAlign(LEFT);

   }

   this.showPower = function(cannon, x, y) {
      fill(0);
      textSize(22);
      text(cannon.power + " Power", x, y + 80);
      noStroke();
   }

   this.showRepairs = function(cannon, x, y) {
      if (cannon.repairs > 0) {
         fill(0);
         textSize(22);
         textAlign(RIGHT);
         text(cannon.repairs + " Repairs", x, y + 80);
         noStroke();
         textAlign(LEFT);
      }
   }
}
