function Terrain() {

   this.space = 8;
   this.xoff = 100;
   this.y;

   this.sands = [];

   this.generate = function() {

      this.sands = [];
      for (var i = 0; i <= (width / this.space); i++) {

         this.y = floor(map(noise(this.xoff), 0, 1, 0, 3 * height / 5) / this.space) * this.space;
         for (var j = 0; j < ((3 * height / 5) - this.y) / this.space; j++) {
            var num = random(1, 4);
            if (j < num) {
               this.sands.push(new Sand(i * this.space, 2 * height / 5 + this.y + j * this.space, true));
            } else {
               this.sands.push(new Sand(i * this.space, 2 * height / 5 + this.y + j * this.space, false));
            }
         }
         this.xoff += width / 140000 * this.space;
      }
   }

   this.newTerrain = function() {
      this.xoff = random(0, 10000);
   }

   this.show = function() {
      for (var i = 0; i < this.sands.length; i++) {
         this.sands[i].show();
      }
   }
}
