var socket;
var res = 5;
var pixels = [];
var palettes = [];
//jee settii

function setup() {

   pickedColor = [0, 0, 0];

   createCanvas(420, 420);
   background(200);
   frameRate(5);

   socket = io.connect('https://pixlplace.herokuapp.com/');
   //socket = io.connect('http://localhost:5000');

   socket.on('loadColor', loadColor);
   socket.on('loadFill', loadFill);
   socket.on('canvas', startCanvas);

   loadCanvas();

   indicator = new Indicator(res * 5 * 11.5 , res);

   palettes.push(new Palette(0, 0, [255, 255, 255]));
   palettes.push(new Palette(res * 5, 0, [0, 0, 0]));
   palettes.push(new Palette(res * 5 * 2, 0, [255, 0, 0]));
   palettes.push(new Palette(res * 5 * 3, 0, [0, 255, 0]));
   palettes.push(new Palette(res * 5 * 4, 0, [0, 0, 255]));
   palettes.push(new Palette(res * 5 * 5, 0, [255, 255, 0]));
   palettes.push(new Palette(res * 5 * 6, 0, [255, 0, 255]));
   palettes.push(new Palette(res * 5 * 7, 0, [100, 200, 255]));
   palettes.push(new Palette(res * 5 * 8, 0, [255, 120, 0]));
   palettes.push(new Palette(res * 5 * 9, 0, [80, 50, 0]));
   palettes.push(new Palette(res * 5 * 10, 0, [120, 120, 120]));

}

function draw() {
   for (let p of pixels) {
      p.show();
   }

   for (let p of palettes) {
      p.show();
   }

   indicator.show();
}

function mousePressed() {
   for (let p of pixels) {
      if (p.intersect(mouseX, mouseY)) {
         p.changeColor(pickedColor);
         return
      }
   }

   for (let palette of palettes) {
      if (palette.intersect(mouseX, mouseY)) {
         pickedColor = palette.getColor();
         return
      }
   }
}

function startCanvas(canvas) {
   for (var i = 0; i < canvas.length; i++) {
      pixels[i].setColor(canvas[i]);
   }

}

function loadCanvas() {
   for (var y = 5; y < (height / res); y++) {
      for (var x = 0; x < (width / res); x++) {
         pixels.push(new Pixel(x * res, y * res, [0, 0, 0]));
      }
   }
}

function fillRect(_x, _y, _w, _h, _color) {
   for (var y = _y; y < _y + _h; y++) {
      for (var x = _x; x < _x + _w; x++) {
         pixels[y*(width/res) + x].changeColor(_color);
      }
   }
}

function fillCanvas(_color) {
   socket.emit('fill', _color);
}

function loadFill(_color) {
   for (let p of pixels) {
      p.setColor(_color);
   }
}

function loadColor(data) {
   pixels[data[0]].setColor(data[1]);
}

function Pixel(_x, _y, _color) {
   this.x = _x;
   this.y = _y;
   this.index = -420 + (this.x/res + (this.y*(width/res))/res);
   this.color = _color;

   this.show = function() {
      fill(this.color[0], this.color[1], this.color[2]);
      noStroke();
      rect(this.x, this.y, res, res);
   }

   this.setColor = function(_color) {
      this.color = _color;

   }

   this.changeColor = function(_color) {
      var data = [this.index, _color];
      socket.emit("sendColor", data);

   }

   this.intersect = function(_mouseX, _mouseY) {
      // Jos mouseX ja mouseY on tämän pikelin alueella niin palauta
      if (_mouseX > this.x && _mouseX <= this.x + res &&
         _mouseY > this.y && _mouseY <= this.y + res) {
         return true;
      } else {
         return false;
      }
   }
}

function Indicator(_x, _y) {
   this.x = _x;
   this.y = _y;
   this.w = res * 24.5;
   this.h = res * 3;

   this.show = function() {
      fill(pickedColor[0], pickedColor[1], pickedColor[2]);
      rect(this.x, this.y, this.w, this.h);
   }

}

function Palette(_x, _y, _color) {
   this.x = _x;
   this.y = _y;
   this.color = _color;
   this.size = res * 5;

   this.show = function() {
      fill(this.color[0], this.color[1], this.color[2]);
      strokeWeight(3);
      stroke(0);
      rect(this.x, this.y, this.size, this.size);
   }
   this.getColor = function() {
      return this.color;
   }

   this.changeColor = function(_color) {
      this.color = _color;
   }

   this.intersect = function(_mouseX, _mouseY) {
      // Jos mouseX ja mouseY on tämän pikelin alueella niin palauta
      if (_mouseX > this.x && _mouseX <= this.x + this.size &&
         _mouseY > this.y && _mouseY <= this.y + this.size) {
         return true;
      } else {
         return false;
      }
   }
}
