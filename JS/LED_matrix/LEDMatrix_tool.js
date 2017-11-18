/*
PYNQ LED MATIX CODE TOOL V 1.3
Made by Tino Kaartovuori 22.9.2017
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

// Font
var myFont;


function preload() {
  myFont = loadFont('Fonts/SourceCodePro-Regular.ttf');
}

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
   pipet_btn = new Button("Pipet Tool", 488, 292, 130, 70, color(255, 255, 255), color(0, 0, 0));
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
   // This function disables color-sliding and drawing leds at the same time
   var flag = false;
   for (var i = 0; i < ledMatrix.LEDs.length; i++) {
      if (ledMatrix.LEDs[i].intersects(mouseX, mouseY)) {
         flag = true
         mouseOverLed = true;
         break;
      }
   }
   if (!flag) {
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

function keyPressed() {
   if (colorDisplay.red_intersects(mouseX, mouseY)) {
      if (keyCode == BACKSPACE || keyCode == DELETE) {
         pickedRed = 0;
      } else if (String(pickedRed).length < 3) {
         //if (String(pickedRed).length > 2) {
         //   pickedRed = 0;
         //}
         if (key == 1) {
            pickedRed = String(pickedRed);
            pickedRed += "1";
            pickedRed = int(pickedRed);

         }
         if (key == 2) {
            pickedRed = String(pickedRed);
            pickedRed += "2";
            pickedRed = int(pickedRed);

         }
         if (key == 3) {
            pickedRed = String(pickedRed);
            pickedRed += "3";
            pickedRed = int(pickedRed);

         }
         if (key == 4) {
            pickedRed = String(pickedRed);
            pickedRed += "4";
            pickedRed = int(pickedRed);

         }
         if (key == 5) {
            pickedRed = String(pickedRed);
            pickedRed += "5";
            pickedRed = int(pickedRed);

         }
         if (key == 6) {
            pickedRed = String(pickedRed);
            pickedRed += "6";
            pickedRed = int(pickedRed);

         }
         if (key == 7) {
            pickedRed = String(pickedRed);
            pickedRed += "7";
            pickedRed = int(pickedRed);

         }
         if (key == 8) {
            pickedRed = String(pickedRed);
            pickedRed += "8";
            pickedRed = int(pickedRed);

         }
         if (key == 9) {
            pickedRed = String(pickedRed);
            pickedRed += "9";
            pickedRed = int(pickedRed);

         }
         if (key == 0) {
            pickedRed = String(pickedRed);
            pickedRed += "0";
            pickedRed = int(pickedRed);

         }
      }
   }
   if (colorDisplay.green_intersects(mouseX, mouseY)) {
      if (keyCode == BACKSPACE || keyCode == DELETE) {
         pickedGreen = 0;
      } else if (String(pickedGreen).length < 3) {
         //if (String(pickedGreen).length > 2) {
         //   pickedGreen = 0;
         //}
         if (key == 1) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "1";
            pickedGreen = int(pickedGreen);

         }
         if (key == 2) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "2";
            pickedGreen = int(pickedGreen);

         }
         if (key == 3) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "3";
            pickedGreen = int(pickedGreen);

         }
         if (key == 4) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "4";
            pickedGreen = int(pickedGreen);

         }
         if (key == 5) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "5";
            pickedGreen = int(pickedGreen);

         }
         if (key == 6) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "6";
            pickedGreen = int(pickedGreen);

         }
         if (key == 7) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "7";
            pickedGreen = int(pickedGreen);

         }
         if (key == 8) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "8";
            pickedGreen = int(pickedGreen);

         }
         if (key == 9) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "9";
            pickedGreen = int(pickedGreen);

         }
         if (key == 0) {
            pickedGreen = String(pickedGreen);
            pickedGreen += "0";
            pickedGreen = int(pickedGreen);
         }

      }
   }
   if (colorDisplay.blue_intersects(mouseX, mouseY)) {
      if (keyCode == BACKSPACE || keyCode == DELETE) {
         pickedBlue = 0;
      } else if (String(pickedBlue).length < 3) {
         //if (String(pickedBlue).length > 2) {
            //pickedBlue = 0;
         //}
         if (key == 1) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "1";
            pickedBlue = int(pickedBlue);

         }
         if (key == 2) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "2";
            pickedBlue = int(pickedBlue);

         }
         if (key == 3) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "3";
            pickedBlue = int(pickedBlue);

         }
         if (key == 4) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "4";
            pickedBlue = int(pickedBlue);

         }
         if (key == 5) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "5";
            pickedBlue = int(pickedBlue);

         }
         if (key == 6) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "6";
            pickedBlue = int(pickedBlue);

         }
         if (key == 7) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "7";
            pickedBlue = int(pickedBlue);

         }
         if (key == 8) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "8";
            pickedBlue = int(pickedBlue);

         }
         if (key == 9) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "9";
            pickedBlue = int(pickedBlue);

         }
         if (key == 0) {
            pickedBlue = String(pickedBlue);
            pickedBlue += "0";
            pickedBlue = int(pickedBlue);
         }
      }
   }

   pickedRed = constrain(pickedRed, 0, 255);
   pickedGreen = constrain(pickedGreen, 0, 255);
   pickedBlue = constrain(pickedBlue, 0, 255);
   red_slider.y_piece = red_slider.y + int(red_slider.h) - pickedRed;
   green_slider.y_piece = green_slider.y + int(green_slider.h) - pickedGreen;
   blue_slider.y_piece = blue_slider.y + int(blue_slider.h) - pickedBlue;
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

      if (colorDisplay.red_intersects(mouseX, mouseY)) {
         pickedRed = 0;
         red_slider.y_piece = red_slider.y + int(red_slider.h);
      }
      if (colorDisplay.green_intersects(mouseX, mouseY)) {
         pickedGreen = 0;
         green_slider.y_piece = green_slider.y + int(green_slider.h);
      }
      if (colorDisplay.blue_intersects(mouseX, mouseY)) {
         pickedBlue = 0;
         blue_slider.y_piece = blue_slider.y + int(blue_slider.h);
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
