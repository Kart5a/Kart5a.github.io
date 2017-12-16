var socket;

var grid = 5;
var pickedColor = [255, 255, 255];

var _red;
var _blue;
var _green;
var _black;
var _white;
var _yellow;
var _purple;
var _orange;
var _pink;
var _brown;

var indicator;

function setup() {
   createCanvas(425, 425);
   background(40);

   socket = io.connect('http://localhost:3000')
   socket.on('canvas', loadCanvas);

   ind = new Indicator();

   _white = new Palette(0, [255, 255, 255]);
   _black = new Palette(1, [0, 0, 0]);
   _green = new Palette(3, [0, 255, 0]);
   _red = new Palette(2, [255, 0, 0]);
   _blue = new Palette(4, [0, 0, 255]);
   _yellow = new Palette(5, [255, 255, 0]);
   _purple = new Palette(6, [255, 0, 255]);
   _orange = new Palette(7, [255, 150, 0]);
   _brown = new Palette(8, [105, 70, 0]);

}

function draw() {
   ind.show();

   _red.show();
   _blue.show();
   _green.show();
   _white.show();
   _black.show();
   _purple.show();
   _orange.show();
   _yellow.show();
   _brown.show();
}


function loadCanvas(canvas) {
   i = 0;
   for (var y = 0; y < (height / grid); y++) {
      for (var x = 0; x < (width / grid); x++) {
         fill(canvas[i][0], canvas[i][1], canvas[i][2]);
         noStroke();
         rect(x * grid, y * grid, grid, grid);
         i++;
      }
   }
}

function fillCanvas(_color) {
  var c = _color;
  socket.emit('fill', c);
}

function mousePressed() {
   if (_red.intersects(mouseX, mouseY)) {
      pickedColor = _red._color;
      return;
   }
   if (_blue.intersects(mouseX, mouseY)) {
      pickedColor = _blue._color;
      return;
   }
   if (_green.intersects(mouseX, mouseY)) {
      pickedColor = _green._color;
      return;
   }
   if (_white.intersects(mouseX, mouseY)) {
      pickedColor = _white._color;
      return;
   }
   if (_black.intersects(mouseX, mouseY)) {
      pickedColor = _black._color;
      return;
   }
   if (_yellow.intersects(mouseX, mouseY)) {
      pickedColor = _yellow._color;
      return;
   }
   if (_purple.intersects(mouseX, mouseY)) {
      pickedColor = _purple._color;
      return;
   }
   if (_orange.intersects(mouseX, mouseY)) {
      pickedColor = _orange._color;
      return;
   }
   if (_brown.intersects(mouseX, mouseY)) {
      pickedColor = _brown._color;
      return;
   }

   i = 0;
   for (var y = 0; y < height / grid; y++) {
      for (var x = 0; x < width / grid; x++) {
         if (mouseX > grid * x && mouseX <= grid * (x + 1) && mouseY > grid * y && mouseY <= grid * (y + 1)) {
            var data = [i, pickedColor];
            socket.emit('clicked', data);
            return;
         }
         i++;
      }
   }

}

function Indicator() {
   this._size = 8 * grid;
   this.x = width - this._size;
   this.y = height - this._size;

   this.show = function() {
      fill(pickedColor[0], pickedColor[1], pickedColor[2]);
      stroke(255);
      rect(this.x, this.y, this._size, this._size);
   }
}

function Palette(_y, __color) {

   this._color = __color;
   this._size = 5 * grid;
   this.y = this._size * _y;
   this.x = width - this._size;

   this.show = function() {
      fill(this._color[0], this._color[1], this._color[2]);
      rect(this.x, this.y, this._size, this._size);
   }

   this.intersects = function(_mouseX, _mouseY) {
      if (_mouseX > this.x && _mouseX < this.x + this._size && _mouseY > this.y && _mouseY < this.y + this._size) {
         return true;
      } else {
         return false;
      }
   }
}
