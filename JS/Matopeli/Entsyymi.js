function Entsyymi() {
  this.x = -2 * grid;
  this.y = -2 * grid;

  this.donotshow = function() {
    this.x = -2 * grid;
    this.y = -2 * grid;
  }

  this.paallekkain = function() {
    if (mato.intersects(mato.hanta, this, 2)) {
      console.log("Entsyymi synty hännän päälle");
      this.donotshow();
    }
    if (mato.intersects(ruoka, this, 4)) {
      console.log("Entsyymi synty ruuan päälle");
      this.donotshow();
    }
    if (mato.intersects(pommi, this, 4)) {
      console.log("Entsyymi synty pommin päälle");
      this.donotshow();
    }
    if (mato.intersects(this, kakku, 3)) {
      console.log("Entsyymi synty kakun päälle");
      this.newSpot();
    }
    if (mato.intersects(kello, this, 4)) {
      console.log("Entsyymi synty kellon päälle");
      this.donotshow();
    }
    if (mato.intersects(timantti, this, 4)) {
      console.log("Entsyymi synty timantin päälle");
      this.donotshow();
    }
  }

  this.ate = function() {

    if (mato.intersects(mato, this, 4)) {
      viush.play();
      if (mato.hanta.length > 0) {
        mato.hanta.splice(0, 1);
        mato.total--;
        this.donotshow();
      } else {
        this.donotshow();
      }
    }
  }

  this.newSpot = function() {
    if (frameCount % 80 === 0) {
      if ((floor(Math.random() * (4 + 1)) == 4)) {
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
  }

  this.show = function() {
    strokeWeight(grid / 5);
    stroke(0, 20, 0, 20);
    fill(10, 40, 10);
    stroke(1, 255);
    fill(1, 1);
    rect(this.x + 1 / 5 * grid, this.y + 1 / 5 * grid, grid - 2 / 5 * grid, grid - 2 / 5 * grid);
    noFill();
    strokeWeight(8);
    stroke(50, 80, 20, 70);
    rect(this.x + 2 / 5 * grid, this.y + 2 / 5 * grid, grid - 3 / 5 * grid, grid - 3 / 5 * grid);
  }
}
