function Mato() {
  this.x = 0;
  this.y = grid * 2;
  this.xspeed = 1;
  this.yspeed = 0;
  this.hanta = [];
  this.total = 0;
  this.rasti = 0;

  this.dir = function(x, y) {
    this.xspeed = x;
    this.yspeed = y;
  }

  this.reset = function() {
    this.total = 0;
    this.hanta = [];
    this.xspeed = 1;
    this.yspeed = 0;
    this.x = 0;
    this.y = grid * 2;
    ruoka.newSpot();
    kakku.newSpot();
    timantti.newSpot();
    pommi.newSpot();
    kello.newSpot();
    entsyymi.newSpot();
    score.score = 0;
    frameCount = 0;
    kello.aika = 0;
  }

  this.intersects = function(a, k, aste) {
    var tot = false;
    if (aste == 1) {
      for (var i = 0; i < a.length; i++) {
        var pos = a[i];
        var d = dist(k.x, k.y, pos.x, pos.y);
        if (d < 1) {
          tot = true;
        }
      }
      return tot;

    } else if (aste == 2) {
      for (var i = 0; i < a.length; i++)  {
        var pos = a[i];
        var d1 = dist(k.x, k.y, pos.x, pos.y);
        var d2 = dist(k.x + grid, k.y, pos.x, pos.y);
        var d3 = dist(k.x, k.y + grid, pos.x, pos.y);
        var d4 = dist(k.x + grid, k.y + grid, pos.x, pos.y);
        if (d1 < 1 || d2 < 1 || d3 < 1 || d4 < 1) {
          tot = true;
        }
      }
      return tot;
    } else if (aste == 3) {
      var d1 = dist(k.x, k.y, a.x, a.y);
      var d2 = dist(k.x + grid, k.y, a.x, a.y);
      var d3 = dist(k.x, k.y + grid, a.x, a.y);
      var d4 = dist(k.x + grid, k.y + grid, a.x, a.y);
      if (d1 < 1 || d2 < 1 || d3 < 1 || d4 < 1) {
        tot = true;
      }
      return tot;
    } else if (aste == 4) {
      var d = dist(k.x, k.y, a.x, a.y);
      if (d < 1) {
        tot = true;
      }
      return tot;
    }
  }

  this.death = function() {
    for (var i = 0; i < this.hanta.length; i++) {
      var pos = this.hanta[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        if (score.score > score.highscore) {
          score.highscore = score.score;
          au.play();
          tadaa.play();
          this.reset();
        } else {
          au.play();
          this.reset();
        }
      }
    }
  }

  this.kasvata = function() {
    if (mato.rasti > 0) {
      this.total += 1;
      this.rasti -= 1;
    }
  }

  this.update = function() {
    if (this.total === this.hanta.length) {
      for (var i = 0; i < this.hanta.length - 1; i++) {
        this.hanta[i] = this.hanta[i + 1];
      }
    }

    this.hanta[this.total - 1] = createVector(this.x, this.y);

    this.x += this.xspeed * grid;
    this.y += this.yspeed * grid;

    this.comeback();
    this.kasvata();

  }

  this.comeback = function() {
    if (this.x > width - grid) {
      this.x = 0;
    }
    if (this.x < 0) {
      this.x = width;
    }
    if (this.y > height - grid) {
      this.y = grid * 2;
    }
    if (this.y < grid * 2) {
      this.y = height;
    }
  }

  this.show = function() {
    strokeWeight(6);
    stroke(0, 20, 0, 20);
    fill(10, 40, 10);
    for (var i = 0; i < this.hanta.length; i++) {
      rect(this.hanta[i].x, this.hanta[i].y, grid, grid);
    }
    rect(this.x, this.y, grid, grid);
    noFill();
    strokeWeight(1);
    stroke(50, 80, 20, 70);
    for (var i = 0; i < this.hanta.length; i++) {
      rect(this.hanta[i].x, this.hanta[i].y, grid, grid);
    }
    rect(this.x, this.y, grid, grid);
  }
}
