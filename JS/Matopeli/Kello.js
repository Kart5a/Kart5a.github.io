function Kello() {
  this.x = -2 * grid;
  this.y = -2 * grid;
  this.aika = 0;

  this.donotshow = function() {
    this.x = -2 * grid;
    this.y = -2 * grid;
  }

  this.paallekkain = function() {
    if (mato.intersects(mato.hanta, this, 2)) {
      console.log("Kello synty hännän päälle");
      this.donotshow();
    }
    if (mato.intersects(ruoka, this, 4)) {
      console.log("Kello synty ruuan päälle");
      this.donotshow();
    }
    if (mato.intersects(entsyymi, this, 4)) {
      console.log("Kello synty entsyymin päälle");
      this.donotshow();
    }
    if (mato.intersects(this, kakku, 3)) {
      console.log("Kello synty kakun päälle");
      this.newSpot();
    }
    if (mato.intersects(pommi, this, 4)) {
      console.log("Kello synty pommin päälle");
      this.donotshow();
    }
    if (mato.intersects(timantti, this, 4)) {
      console.log("Kello synty timantin päälle");
      this.donotshow();
    }
  }

  this.ate = function() {
    if (mato.intersects(mato, this, 4)) {
      this.aika = 50;
      this.donotshow();
      tiktak.play();
    }
  }

  this.kellotus = function() {
    if (this.aika > 0) {
      frameRate(5);
      this.aika--;
      console.log("KELLO");
    } else {
      frameRate(8);
    }
  }

  this.newSpot = function() {
    if (frameCount % 50 === 0) {
      if ((floor(Math.random() * (8 + 1)) == 1)) {
        this.x = floor(Math.random() * (width) / grid) * grid;
        this.y = floor(Math.random() * (height - 2 * grid) / grid) * grid + 2 * grid;
        this.paallekkain();
      } else {
        this.donotshow();
      }
    }
  }

  this.update = function() {
    this.ate();
    this.newSpot();
    this.kellotus();
  }

  this.show = function() {
    strokeWeight(4);
    stroke(1, 20);
    fill(0, 40, 0);
    rect(this.x - 1/5 * grid, this.y, grid * 1/5, grid);
    rect(this.x + grid, this.y, grid * 1/5, grid);
    rect(this.x, this.y - 1/5*grid, grid, grid * 1/5);
    rect(this.x, this.y + grid, grid, grid * 1/5);
    rect(this.x + 1/5*grid, this.y - 2 / 5 * grid, 3/5*grid, 2/5*grid);
    rect(this.x + grid * 2 / 5, this.y, 1 / 5 * grid, 3 / 5 * grid);
    rect(this.x + grid * 2 / 5, this.y + grid * 2 / 5, grid * 2 / 5, grid * 1 / 5);
  }
}
