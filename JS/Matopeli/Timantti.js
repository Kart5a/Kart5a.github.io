function Timantti() {
  this.x = -2 * grid;
  this.y = -2 * grid;

  this.donotshow = function() {
    this.x = -2 * grid;
    this.y = -2 * grid;
  }

  this.paallekkain = function() {
    if (mato.intersects(mato.hanta, this, 2)) {
      console.log("Timantti synty hännän päälle");
      this.donotshow();
    }
    if (mato.intersects(ruoka, this, 4)) {
      console.log("Timantti synty ruuan päälle");
      this.donotshow();
    }
    if (mato.intersects(entsyymi, this, 4)) {
      console.log("Timantti synty entsyymin päälle");
      this.donotshow();
    }
    if (mato.intersects(this, kakku, 3)) {
      console.log("Timantti synty kakun päälle");
      this.newSpot();
    }
    if (mato.intersects(kello, this, 4)) {
      console.log("Timantti synty kellon päälle");
      this.donotshow();
    }
    if (mato.intersects(pommi, this, 4)) {
      console.log("Timantti synty pommin päälle");
      this.donotshow();
    }
  }

  this.ate = function() {
    if (mato.intersects(mato, this, 4)) {
      score.score += 5;
      this.donotshow();
      pling.play();
      }
    }

  this.newSpot = function() {
    if (frameCount % 20 === 0) {
      if ((floor(Math.random() * (15 + 1)) == 1)) {
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
    image(timanttikuva, this.x - 1 / 5 * grid, this.y - 1 / 5 * grid, grid + 2 / 5 * grid, grid + 2 / 5 * grid);
  }
}
