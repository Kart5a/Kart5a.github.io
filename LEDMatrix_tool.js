// PYNQ LED MATIX CODE GENERATOR V 1.0
// Made by Tino Kaartovuori

var lm;
var red_slider;
var green_slider;
var blue_slider;
var cd;
var black;
var white;
var clear_btn;
var pipet;
var shift_l;
var shift_r;
var shift_u;
var shift_d;
var copy_btn;

var pickedRed = 0;
var pickedGreen = 0;
var pickedBlue = 0;
var pipetTool = false;
var mp;

function setup() {
   var canvas = createCanvas(758, 488);
   canvas.parent('sketch-holder');

   lm = new LEDMatrix();
   red_slider = new ColorPicker(488, 20, 30, 255, "red");
   green_slider = new ColorPicker(538, 20, 30, 255, "green");
   blue_slider = new ColorPicker(588, 20, 30, 255, "blue");
   black = new Button("Black", 638, 70, 100, 30, color(0, 0, 0), color(255, 255, 255));
   white = new Button("White", 638, 20, 100, 30, color(255, 255, 255), color(0, 0, 0));
   clear_btn = new Button("Clear", 638, 120, 100, 30, color(255, 255, 255), color(0, 0, 0));
   pipet = new Button("Pipet Tool", 488, 332, 130, 30, color(255, 255, 255), color(0, 0, 0));
   shift_l = new Button("Left", 488, 375, 55, 30, color(255, 255, 255), color(0, 0, 0));
   shift_r = new Button("Right", 553, 375, 55, 30, color(255, 255, 255), color(0, 0, 0));
   shift_u = new Button("Up", 618, 375, 55, 30, color(255, 255, 255), color(0, 0, 0));
   shift_d = new Button("Down", 683, 375, 55, 30, color(255, 255, 255), color(0, 0, 0));
   copy_btn = new Button("Show Code", 488, 418, 250, 50, color(255, 255, 255), color(0, 0, 0));
   cd = new ColorDisplay();
   lm.generate();
}

function draw() {
   background(170, 230, 195, 200, 1);
   lm.show();
   red_slider.show();
   green_slider.show();
   blue_slider.show();
   red_slider.update();
   green_slider.update();
   blue_slider.update();
   black.show();
   white.show();
   clear_btn.show();
   cd.show();
   pipet.show();
   for (var i = 0; i < lm.LEDs.length; i++) {
      lm.LEDs[i].update();
   }

   shift_l.show();
   shift_r.show();
   shift_u.show();
   shift_d.show();
   copy_btn.show();
   if (pipetTool) {
      stroke(30);
      strokeWeight(1);
      fill(255);
      rect(mouseX - 5, mouseY + 4, 9, 20);
      fill(200);
      ellipse(mouseX, mouseY + 4, 9, 9);
      fill(100)
      rect(mouseX - 7, mouseY + 12, 13, 15, 4, 4);
      noStroke();
      noCursor();
   } else {
      cursor();
   }
}

function preparePYNQcode() {
   this.x;
   this.y;
   this.red;
   this.green;
   this.blue;
   this.lines = [];

   for (var i = 0; i < lm.LEDs.length; i++) {
      this.x = int(lm.LEDs[i].x_matrix);
      this.y = int(lm.LEDs[i].y_matrix);
      this.red = lm.LEDs[i].red;
      this.green = lm.LEDs[i].green;
      this.blue = lm.LEDs[i].blue;

      if (this.blue != 0 || this.red != 0 || this.green != 0) {
         this.lines.push("led_matrix.set_led_color(" + int(this.x) + ", " + int(this.y) + ", " + this.red + ", " + this.green + ", " + this.blue + ")");
      }
   }
   return (this.lines);
}

function toClipboard(list) {
   document.getElementById("koodi").value = "";
   this.myString = "";
   for (var i = 0; i < list.length; i++) {
      this.myString += list[i] + "\r\n";
   }

   document.getElementById("koodi").value = list.join("\r\n");
}

function shift(dir) {
   for (var i = 0; i < lm.LEDs.length; i++) {
      if (dir == "left") {
         if (lm.LEDs[i].x_matrix == 0) {
            lm.LEDs[i].x_matrix = 7;
            lm.LEDs[i].x += 56 * 7;
            lm.LEDs[i].red = 0;
            lm.LEDs[i].green = 0;
            lm.LEDs[i].blue = 0;
         } else {
            lm.LEDs[i].x_matrix += -1;
            lm.LEDs[i].x += -56;
         }
      }
      if (dir == "right") {
         if (lm.LEDs[i].x_matrix == 7) {
            lm.LEDs[i].x_matrix = 0;
            lm.LEDs[i].x -= 56 * 7;
            lm.LEDs[i].red = 0;
            lm.LEDs[i].green = 0;
            lm.LEDs[i].blue = 0;
         } else {
            lm.LEDs[i].x_matrix += +1;
            lm.LEDs[i].x += +56;
         }
      }
      if (dir == "up") {
         if (lm.LEDs[i].y_matrix == 0) {
            lm.LEDs[i].y_matrix = 7;
            lm.LEDs[i].y += 56 * 7;
            lm.LEDs[i].red = 0;
            lm.LEDs[i].green = 0;
            lm.LEDs[i].blue = 0;
         } else {
            lm.LEDs[i].y_matrix += -1;
            lm.LEDs[i].y += -56;
         }
      }
      if (dir == "down") {
         if (lm.LEDs[i].y_matrix == 7) {
            lm.LEDs[i].y_matrix = 0;
            lm.LEDs[i].y -= 56 * 7;
            lm.LEDs[i].red = 0;
            lm.LEDs[i].green = 0;
            lm.LEDs[i].blue = 0;
         } else {
            lm.LEDs[i].y_matrix += 1;
            lm.LEDs[i].y += 56;
         }
      }
   }
}

function mouseReleased() {
   mp = false;
   for (var i = 0; i < lm.LEDs.length; i++) {
      if (pipetTool == true) {
         if (lm.LEDs[i].intersects(mouseX, mouseY)) {
            pickedRed = lm.LEDs[i].getRedColor();
            pickedGreen = lm.LEDs[i].getGreenColor();
            pickedBlue = lm.LEDs[i].getBlueColor();
            pipetTool = false;
            red_slider.y_piece = red_slider.y + int(red_slider.h) - pickedRed;
            green_slider.y_piece = green_slider.y + int(green_slider.h) - pickedGreen;
            blue_slider.y_piece = blue_slider.y + int(blue_slider.h) - pickedBlue;
         }
      }
   }
}

function mousePressed() {
   mp = true;
   if (mouseButton == LEFT) {
      for (var i = 0; i < lm.LEDs.length; i++) {
         if (pipetTool == false) {
            lm.LEDs[i].click(mouseX, mouseY, pickedRed, pickedGreen, pickedBlue);
         }
      }


      if (red_slider.intersects(mouseX, mouseY)) {
         pickedRed = red_slider.findColor(mouseY);
         pickedRed = constrain(pickedRed, 0, 255);
         red_slider.y_piece = mouseY;
      }
      if (green_slider.intersects(mouseX, mouseY)) {
         pickedGreen = green_slider.findColor(mouseY);
         pickedGreen = constrain(pickedGreen, 0, 255);
         green_slider.y_piece = mouseY;
      }
      if (blue_slider.intersects(mouseX, mouseY)) {
         pickedBlue = blue_slider.findColor(mouseY);
         pickedBlue = constrain(pickedBlue, 0, 255);
         blue_slider.y_piece = mouseY;
      }
      if (black.intersects(mouseX, mouseY)) {
         pickedRed = 0;
         pickedGreen = 0;
         pickedBlue = 0;
         red_slider.y_piece = red_slider.y + int(red_slider.h);
         green_slider.y_piece = green_slider.y + int(green_slider.h);
         blue_slider.y_piece = blue_slider.y + int(blue_slider.h);
      }
      if (white.intersects(mouseX, mouseY)) {
         pickedRed = 255;
         pickedGreen = 255;
         pickedBlue = 255;
         red_slider.y_piece = red_slider.y;
         green_slider.y_piece = green_slider.y;
         blue_slider.y_piece = blue_slider.y;
      }
      if (clear_btn.intersects(mouseX, mouseY)) {
         for (var i = 0; i < lm.LEDs.length; i++) {
            lm.LEDs[i].setColor(0, 0, 0);
         }
      }
      if (pipet.intersects(mouseX, mouseY)) {
         if (pipetTool == false) {
            pipetTool = true;
         } else if (pipetTool == true) {
            pipetTool = false;
         }
      }
      if (copy_btn.intersects(mouseX, mouseY)) {
         var code = preparePYNQcode();
         toClipboard(code);
      }
      if (shift_l.intersects(mouseX, mouseY)) {
         shift("left");
      }
      if (shift_r.intersects(mouseX, mouseY)) {
         shift("right");
      }
      if (shift_u.intersects(mouseX, mouseY)) {
         shift("up");
      }
      if (shift_d.intersects(mouseX, mouseY)) {
         shift("down");
      }
   }
   if (mouseButton == RIGHT) {
      for (var i = 0; i < lm.LEDs.length; i++) {
         if (pipetTool == false) {
            mp = false;
            lm.LEDs[i].click(mouseX, mouseY, 0, 0, 0);
         }
      }
   }
}
