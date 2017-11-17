var grid = 15;
var mato;
var koristeet;
var ruoka;
var kakku;
var entsyymi;
var pommi;
var kello;
var timantti;

function preload() {
  loadFont("JS/Img/nokiafc22.ttf");
  timanttikuva = loadImage("JS/Img/Timantti.png");
  plop = new Audio("JS/Sounds/Plop.wav");
  nam = new Audio("JS/Sounds/Nam.wav");
  pling = new Audio("JS/Sounds/Pling.wav");
  pum = new Audio("JS/Sounds/Pum.wav");
  tiktak = new Audio("JS/Sounds/Tiktak.wav");
  viush = new Audio("JS/Sounds/Viush.wav");
  tadaa = new Audio("JS/Sounds/Tadaa.wav");
  au = new Audio("JS/Sounds/Au.wav");
}

function setup() {
  createCanvas(300, 240);
  frameRate(8);
  mato = new Mato();
  koristeet = new Koristeet();
  score = new Score();
  ruoka = new Ruoka();
  kakku = new Kakku();
  entsyymi = new Entsyymi();
  pommi = new Pommi();
  kello = new Kello();
  timantti = new Timantti();
}

function draw() {
  background(40, 150, 0);
  mato.death();
  mato.update();
  ruoka.update();
  kakku.update();
  kello.update();
  timantti.update();
  entsyymi.update();
  pommi.update();
  koristeet.showAll();
  score.show();
  ruoka.show();
  mato.show();
  kakku.show();
  entsyymi.show();
  pommi.show();
  kello.show();
  timantti.show();
}

function keyPressed() {
  if (keyCode === UP_ARROW && mato.yspeed !== 1) {
    mato.dir(0, -1);
  } else if (keyCode === DOWN_ARROW && mato.yspeed !== -1) {
    mato.dir(0, 1);
  } else if (keyCode === LEFT_ARROW && mato.xspeed !== 1) {
    mato.dir(-1, 0);
  } else if (keyCode === RIGHT_ARROW && mato.xspeed !== -1) {
    mato.dir(1, 0);
  }
}

function Koristeet() {

  this.x = 0;
  this.y = 0;

  this.showAll = function() {
    koristeet.showReuna(0);
    koristeet.showReuna(width);
    koristeet.showKeskiosa();
  }
  this.showReuna = function(x) {
    this.x = x;
    noStroke();
    fill(100, 230, 100, 5);
    ellipse(x, height / 2, width / 4, height);
    fill(100, 230, 100, 15);
    ellipse(x, height / 2, width / 6, height);
    fill(100, 230, 100, 15);
    ellipse(x, height / 2, width / 8, height);
    fill(100, 230, 100, 25);
    ellipse(x, height / 2, width / 12, height);
  }
  this.showKeskiosa = function() {
    noStroke();
    fill(0, 20, 0, 10);
    ellipse(width / 2, height / 2, width - 4 * grid, height - grid)
    fill(0, 20, 0, 10);
    ellipse(width / 2, height / 2, width - 6 * grid, height - 2 * grid)
    fill(0, 20, 0, 10);
    ellipse(width / 2, height / 2, width - 8 * grid, height - 4 * grid)
  }
}
