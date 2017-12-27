function Shop() {
   this.x = width / 2;
   this.y = height / 3;
   this.w = 500;
   this.h = 400;
   this.hbw = 200;
   this.hbh = 160;


   this.show = function() {
      rectMode(CENTER);
      fill(150, 150);
      rect(this.x, this.y, this.w, this.h);

      this.hitBox(this.x - this.w / 4.5, this.y - this.h / 4.5, "Power +10", 200);
      this.hitBox(this.x + this.w / 4.5, this.y - this.h / 4.5, "Repair", 160);
      //this.hitBox(this.x - this.w/4.5, this.y + this.h/4.5, "Barrier", 285);
      this.hitBox(this.x + this.w / 4.5, this.y + this.h / 4.5, "50-TSS", 420);
   }

   this.hitBox = function(x, y, item, price) {
      if (cannons[0].money >= price && cannons[0].turn) {
         fill(100, 200, 100);
      } else if (cannons[1].money >= price && cannons[1].turn) {
         fill(100, 200, 100);
      } else {
         fill(200, 100, 100);
      }
      rectMode(CENTER);

      rect(x, y, this.hbw, this.hbh);
      fill(0);
      textAlign(CENTER);
      textSize(30);
      text(item, x, y - 20);
      textSize(22);

      text(price + " $", x, y + 70);
      textAlign(LEFT);

   }
}
