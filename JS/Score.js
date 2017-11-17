function Score() {
  var pks = grid / 5;
  this.x = grid / 2;
  this.y = grid / 2;
  this.score = 0;
  this.highscore = 0;

  this.show = function() {
    stroke(1, 20);
    strokeWeight(4);
    fill(0, 40, 0);
    rect(0, grid * 2 - pks * 2, width, pks * 2);
    fill(20, 60, 20, 30);
    noStroke();
    rect(0, grid * 2 - pks * 1.5, width, pks * 3);
    fill(0, 40, 0);
    stroke(1, 20);
    textSize(grid);
    textFont("nokiafc22");
    text("Score: " + this.score, this.x, this.y + grid * 5 / 6);
    text("Hiscore: " + this.highscore, width/2 + 3 * grid, this.y + grid * 5 / 6 );
    text("L: " + (mato.total + 1), width/3 + grid, this.y + grid * 5/6);
  }
}
