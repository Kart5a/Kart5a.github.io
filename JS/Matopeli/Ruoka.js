function Ruoka() {
  this.x = floor(Math.random() * width / grid) * grid;
  this.y = floor(Math.random() * (height - 2 * grid) / grid) * grid + 2 * grid;

  this.newSpot = function() {
    this.x = floor(Math.random() * width / grid) * grid;
    this.y = floor(Math.random() * (height - 2 * grid) / grid) * grid + 2 * grid;

    if (mato.intersects(mato.hanta, this, 1)) {
      console.log("Ruoka synty hännän päälle");
      this.newSpot();
    }
    if (mato.intersects(this, kakku, 3)) {
      console.log("Ruoka synty kakun päälle");
      this.newSpot();
    }
    if (mato.intersects(entsyymi, this, 4)) {
      console.log("Ruoka synty entsyymin päälle");
      this.newSpot();
    }
    if (mato.intersects(pommi, this, 4)) {
      console.log("Ruoka synty pommin päälle");
      this.newSpot();
    }
    if (mato.intersects(kello, this, 4)) {
      console.log("Ruoka synty kellon päälle");
      this.newSpot();
    }
    if (mato.intersects(timantti, this, 4)) {
      console.log("Ruoka synty timantin päälle");
      this.newSpot();
    }
  }

  this.ate = function() {
    var d = dist(this.x, this.y, mato.x, mato.y);
    if (d < 1) {
      this.newSpot();
      mato.rasti += 1;
      score.score++;
      plop.play(1);
    }
  }

  this.update = function() {
    this.ate();
  }

  this.show = function() {
    strokeWeight(4);
    stroke(1, 20);
    fill(0, 40, 0);
    rect(this.x, this.y + 2 * grid / 5, grid, grid / 5);
    rect(this.x + 2 * grid / 5, this.y, grid / 5, grid);
    rect(this.x + grid / 5, this.y + grid / 5, 3 * grid / 5, 3 * grid / 5);
    //rect(this.x, this.y, grid, grid);
  }
}
