/*
PYNQ LED MATIX CODE TOOL V 1.2
Made by Tino Kaartovuori
*/

// LED-Matrix
var ledMatrix;

// Sliders
var red_slider;
var green_slider;
var blue_slider;

// Color Display
var colorDisplay;

// Buttons
var black_btn;
var white_btn;
var clear_btn;
var pipet_btn;
var shiftLeft_btn;
var shiftRight_btn;
var shiftUp_btn;
var shiftDown_btn;
var showCode_btn;

// Picked Colors
var pickedRed = 0;
var pickedGreen = 0;
var pickedBlue = 0;

// Tools and activities
var pipetTool = false;
var mouseHold = false;
var mouseOverLed = false;
var mouseOverSlider = false;


function setup() {
   // Creating canvas
   var canvas = createCanvas(758, 488);
   canvas.parent('sketch-holder');
   frameRate(25);

   // Creating objects
   ledMatrix = new LEDMatrix();
   red_slider = new ColorPicker(488, 20, 30, 255, "red");
   green_slider = new ColorPicker(538, 20, 30, 255, "green");
   blue_slider = new ColorPicker(588, 20, 30, 255, "blue");
   black_btn = new Button("Black", 638, 70, 100, 30, color(0, 0, 0), color(255, 255, 255));
   white_btn = new Button("White", 638, 20, 100, 30, color(255, 255, 255), color(0, 0, 0));
   clear_btn = new Button("Clear", 638, 120, 100, 30, color(255, 255, 255), color(0, 0, 0));
   pipet_btn = new Button("Pipet Tool", 488, 332, 130, 30, color(255, 255, 255), color(0, 0, 0));
   shiftLeft_btn = new Button("Left", 488, 375, 55, 30, color(255, 255, 255), color(0, 0, 0));
   shiftRight_btn = new Button("Right", 553, 375, 55, 30, color(255, 255, 255), color(0, 0, 0));
   shiftUp_btn = new Button("Up", 618, 375, 55, 30, color(255, 255, 255), color(0, 0, 0));
   shiftDown_btn = new Button("Down", 683, 375, 55, 30, color(255, 255, 255), color(0, 0, 0));
   showCode_btn = new Button("Show Code", 488, 418, 250, 50, color(255, 255, 255), color(0, 0, 0));
   colorDisplay = new ColorDisplay();

   // Generating LED Matrix and LEDs
   ledMatrix.generate();
}

function draw() {
   background(170, 230, 195, 200, 1);

   // Updating objects
   for (var i = 0; i < ledMatrix.LEDs.length; i++) {
      ledMatrix.LEDs[i].update();
   }
   red_slider.update();
   green_slider.update();
   blue_slider.update();

   // Showing everything
   ledMatrix.show();
   red_slider.show();
   green_slider.show();
   blue_slider.show();
   black_btn.show();
   white_btn.show();
   clear_btn.show();
   colorDisplay.show();
   pipet_btn.show();
   shiftLeft_btn.show();
   shiftRight_btn.show();
   shiftUp_btn.show();
   shiftDown_btn.show();
   showCode_btn.show();
   if (pipetTool) {
      // Showing pipet tool
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
   inspectMouse();
}

function inspectMouse() {
   var flag = false;
   for (var i = 0; i < ledMatrix.LEDs.length; i++) {
      if (ledMatrix.LEDs[i].intersects(mouseX, mouseY)) {
         flag = true
         mouseOverLed = true;
         break;
      }
   }
   if (!flag){
      mouseOverLed = false;
   }

   if (red_slider.intersects(mouseX, mouseY)) {
      mouseOverSlider = true;
   } else if (green_slider.intersects(mouseX, mouseY)) {
      mouseOverSlider = true;
   } else if (blue_slider.intersects(mouseX, mouseY)) {
      mouseOverSlider = true;
   } else {
      mouseOverSlider = false;
   }
}

function preparePYNQcode() {
   // Converts information from ledMatrix to list of strings
   this.x;
   this.y;
   this.red;
   this.green;
   this.blue;
   this.lines = [];

   for (var i = 0; i < ledMatrix.LEDs.length; i++) {
      this.x = int(ledMatrix.LEDs[i].x_matrix);
      this.y = int(ledMatrix.LEDs[i].y_matrix);
      this.red = ledMatrix.LEDs[i].red;
      this.green = ledMatrix.LEDs[i].green;
      this.blue = ledMatrix.LEDs[i].blue;

      if (this.blue != 0 || this.red != 0 || this.green != 0) {
         this.lines.push("led_matrix.set_led_color(" + int(this.x) + ", " + int(this.y) + ", " + this.red + ", " + this.green + ", " + this.blue + ")");
      }
   }
   return (this.lines);
}

function showCode(list) {
   // Shows PYNQ codes in the box
   document.getElementById("koodi").value = "";
   this.myString = "";
   for (var i = 0; i < list.length; i++) {
      this.myString += list[i] + "\r\n";
   }
   document.getElementById("koodi").value = list.join("\r\n");
}

function shift(dir) {
   // Move all LEDs to certain direction
   for (var i = 0; i < ledMatrix.LEDs.length; i++) {
      if (dir == "left") {
         if (ledMatrix.LEDs[i].x_matrix == 0) {
            ledMatrix.LEDs[i].x_matrix = 7;
            ledMatrix.LEDs[i].x += 56 * 7;
            ledMatrix.LEDs[i].red = 0;
            ledMatrix.LEDs[i].green = 0;
            ledMatrix.LEDs[i].blue = 0;
         } else {
            ledMatrix.LEDs[i].x_matrix += -1;
            ledMatrix.LEDs[i].x += -56;
         }
      }
      if (dir == "right") {
         if (ledMatrix.LEDs[i].x_matrix == 7) {
            ledMatrix.LEDs[i].x_matrix = 0;
            ledMatrix.LEDs[i].x -= 56 * 7;
            ledMatrix.LEDs[i].red = 0;
            ledMatrix.LEDs[i].green = 0;
            ledMatrix.LEDs[i].blue = 0;
         } else {
            ledMatrix.LEDs[i].x_matrix += +1;
            ledMatrix.LEDs[i].x += +56;
         }
      }
      if (dir == "up") {
         if (ledMatrix.LEDs[i].y_matrix == 0) {
            ledMatrix.LEDs[i].y_matrix = 7;
            ledMatrix.LEDs[i].y += 56 * 7;
            ledMatrix.LEDs[i].red = 0;
            ledMatrix.LEDs[i].green = 0;
            ledMatrix.LEDs[i].blue = 0;
         } else {
            ledMatrix.LEDs[i].y_matrix += -1;
            ledMatrix.LEDs[i].y += -56;
         }
      }
      if (dir == "down") {
         if (ledMatrix.LEDs[i].y_matrix == 7) {
            ledMatrix.LEDs[i].y_matrix = 0;
            ledMatrix.LEDs[i].y -= 56 * 7;
            ledMatrix.LEDs[i].red = 0;
            ledMatrix.LEDs[i].green = 0;
            ledMatrix.LEDs[i].blue = 0;
         } else {
            ledMatrix.LEDs[i].y_matrix += 1;
            ledMatrix.LEDs[i].y += 56;
         }
      }
   }
}

function mouseReleased() {
   mouseHold = false;
   for (var i = 0; i < ledMatrix.LEDs.length; i++) {
      if (pipetTool == true) {
         if (ledMatrix.LEDs[i].intersects(mouseX, mouseY)) {
            pickedRed = ledMatrix.LEDs[i].getRedColor();
            pickedGreen = ledMatrix.LEDs[i].getGreenColor();
            pickedBlue = ledMatrix.LEDs[i].getBlueColor();
            pipetTool = false;
            red_slider.y_piece = red_slider.y + int(red_slider.h) - pickedRed;
            green_slider.y_piece = green_slider.y + int(green_slider.h) - pickedGreen;
            blue_slider.y_piece = blue_slider.y + int(blue_slider.h) - pickedBlue;
         }
      }
   }
}

function mousePressed() {
   mouseHold = true;
   if (mouseButton == LEFT) {
      for (var i = 0; i < ledMatrix.LEDs.length; i++) {
         if (pipetTool == false) {
            ledMatrix.LEDs[i].click(mouseX, mouseY, pickedRed, pickedGreen, pickedBlue);
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
      if (black_btn.intersects(mouseX, mouseY)) {
         pickedRed = 0;
         pickedGreen = 0;
         pickedBlue = 0;
         red_slider.y_piece = red_slider.y + int(red_slider.h);
         green_slider.y_piece = green_slider.y + int(green_slider.h);
         blue_slider.y_piece = blue_slider.y + int(blue_slider.h);
      }
      if (white_btn.intersects(mouseX, mouseY)) {
         pickedRed = 255;
         pickedGreen = 255;
         pickedBlue = 255;
         red_slider.y_piece = red_slider.y;
         green_slider.y_piece = green_slider.y;
         blue_slider.y_piece = blue_slider.y;
      }
      if (clear_btn.intersects(mouseX, mouseY)) {
         for (var i = 0; i < ledMatrix.LEDs.length; i++) {
            ledMatrix.LEDs[i].setColor(0, 0, 0);
         }
      }
      if (pipet_btn.intersects(mouseX, mouseY)) {
         if (pipetTool == false) {
            pipetTool = true;
         } else if (pipetTool == true) {
            pipetTool = false;
         }
      }
      if (showCode_btn.intersects(mouseX, mouseY)) {
         var code = preparePYNQcode();
         showCode(code);
      }
      if (shiftLeft_btn.intersects(mouseX, mouseY)) {
         shift("left");
      }
      if (shiftRight_btn.intersects(mouseX, mouseY)) {
         shift("right");
      }
      if (shiftUp_btn.intersects(mouseX, mouseY)) {
         shift("up");
      }
      if (shiftDown_btn.intersects(mouseX, mouseY)) {
         shift("down");
      }
   }
   if (mouseButton == RIGHT) {
      for (var i = 0; i < ledMatrix.LEDs.length; i++) {
         if (pipetTool == false) {
            mouseHold = false;
            ledMatrix.LEDs[i].click(mouseX, mouseY, 0, 0, 0);
         }
      }
   }
}
