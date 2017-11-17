function Pommi() {
  this.x = -2 * grid;
  this.y = -2 * grid;

  this.donotshow = function() {
    this.x = -2 * grid;
    this.y = -2 * grid;
  }

  this.paallekkain = function() {
    if (mato.intersects(mato.hanta, this, 2)) {
      console.log("Pommi synty hännän päälle");
      this.donotshow();
    }
    if (mato.intersects(ruoka, this, 4)) {
      console.log("Pommi synty ruuan päälle");
      this.donotshow();
    }
    if (mato.intersects(entsyymi, this, 4)) {
      console.log("Pommi synty entsyymin päälle");
      this.donotshow();
    }
    if (mato.intersects(this, kakku, 3)) {
      console.log("Pommi synty kakun päälle");
      this.newSpot();
    }
    if (mato.intersects(kello, this, 4)) {
      console.log("Pommi synty kellon päälle");
      this.donotshow();
    }
    if (mato.intersects(timantti, this, 4)) {
      console.log("Pommi synty timantin päälle");
      this.donotshow();
    }
  }

  this.ate = function() {
    if (mato.intersects(mato, this, 4)) {
      pum.play();
      if (score.score > score.highscore) {
        score.highscore = score.score;
        tadaa.play();
        mato.reset();
      } else {
        mato.reset();
      }
    }
  }

  this.newSpot = function() {
    if (frameCount % 50 === 0) {
      if ((floor(Math.random() * (1 + 1)) == 1)) {
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
    strokeWeight(4);
    stroke(1, 20);
    fill(0, 40, 0);
    rect(this.x - 1 / 5 * grid, this.y + 2 * grid / 5, grid + 2 / 5 * grid, grid / 5);
    rect(this.x + 2 * grid / 5, this.y - 1 / 5 * grid, grid / 5, grid + 2 / 5 * grid);
    rect(this.x + grid / 5, this.y + grid / 5, 3 * grid / 5, 3 * grid / 5);
    //rect(this.x + 3 / 5 * grid, this.y - 1 / 5 * grid, 1 / 5 * grid, grid - 1 / 5 * grid);
    rect(this.x, this.y, grid, grid);
  }
}
