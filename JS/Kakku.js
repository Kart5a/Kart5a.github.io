function Kakku() {
  this.x = -2 * grid;
  this.y = -2 * grid;

  this.donotshow = function() {
    this.x = -2 * grid;
    this.y = -2 * grid;
  }

  this.paallekkain = function() {
    if (mato.intersects(mato.hanta, this, 2)) {
      console.log("Kakku synty hännän päälle");
      this.donotshow();
    }
    if (mato.intersects(ruoka, kakku, 3)) {
      console.log("Kakku synty ruuan päälle");
      this.donotshow();
    }
    if (mato.intersects(entsyymi, this, 3)) {
      console.log("Kakku synty entsyymin päälle");
      this.donotshow();
    }
    if (mato.intersects(pommi, this, 3)) {
      console.log("Kakku synty pommin päälle");
      this.donotshow();
    }
    if (mato.intersects(kello, this, 3)) {
      console.log("Kakku synty kellon päälle");
      this.donotshow();
    }
    if (mato.intersects(timantti, this, 3)) {
      console.log("Kakku synty timantin päälle");
      this.donotshow();
    }
  }

  this.ate = function() {
    if (this.intersect(mato)) {
      //this.newSpot();
      mato.rasti = 3;
      score.score += 4;
      this.donotshow();
      nam.play();
    }
  }

  this.newSpot = function() {
    if (frameCount % 80 === 0) {
      //if ((floor(Math.random()) === 1)) {
      if ((floor(Math.random() * (5 + 1)) == 1)) {
        this.x = floor(Math.random() * (width - grid) / grid) * grid;
        this.y = floor(Math.random() * (height - 3 * grid) / grid) * grid + 2 * grid;
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

  this.intersect = function(a) {
    var d1 = dist(this.x, this.y, a.x, a.y);
    var d2 = dist(this.x + grid, this.y, a.x, a.y);
    var d3 = dist(this.x, this.y + grid, a.x, a.y);
    var d4 = dist(this.x + grid, this.y + grid, a.x, a.y);
    if (d1 < 1 || d2 < 1 || d3 < 1 || d4 < 1) {
      return true;
    } else {
      return false;
    }
  }

  this.show = function() {
    stroke(1, 20);
    strokeWeight(4);
    fill(0, 40, 0);
    rect(this.x + 1 / 5 * grid, this.y + grid - 1 / 5 * grid, grid * 2 - 2 / 5 * grid, grid * 2 - grid);
    rect(this.x, this.y + 4 / 5 * grid, 2 * grid, 2 / 5 * grid);
    rect(this.x + grid - 1 / 10 * grid, this.y + 1 / 5 * grid, grid / 5, grid);
    rect(this.x + 1 / 5 * grid, this.y + 1 / 5 * grid, grid / 5, grid);
    rect(this.x + 2 * grid - 2 / 5 * grid, this.y + 1 / 5 * grid, grid / 5, grid);
  }
}
