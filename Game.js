let terrain;
let panel;
let cannons = [];
let bullets = [];

let gravity = 0.15;
let can_shoot = true;

function setup() {
   createCanvas(800, 1000);
   terrain = new Terrain();
   panel = new Panel();
   cannons.push(new Cannon(left = false));
   cannons.push(new Cannon(left = true));
   terrain.generate();
}

function draw() {
   background(120, 140, 240);

   var end = false;
   for (let i = 0; i < bullets.length; i++) {

      bullets[i].move();
      bullets[i].show();

      // Tarkastaa jos bulletti lentää kentästä yli
      if (bullets[i].x > width || bullets[i].x < 0) {
         explode(bullets[i].power, bullets[i].x, bullets[i].y);
         setTurn();
         can_shoot = true;
         bullets.splice(i, 1);
         end = true;
         break;
      }

      // Tarkastaa osuuko bulletti maahan
      for (var s of terrain.sands) {
         if (bullets[i].intersects(s.x - terrain.space / 2, s.y - terrain.space / 2, terrain.space, terrain.space)) {
            explode(bullets[i].power, bullets[i].x, bullets[i].y);
            setTurn();
            can_shoot = true;
            bullets.splice(i, 1);
            end = true;
            break;
         }
      }

      if (end) {
         break;
      }

      for (var c of cannons) {
         if (bullets[i].intersects(c.x, c.y, c.w, c.h)) {
            explode(bullets[i].power, bullets[i].x, bullets[i].y);
            setTurn();
            can_shoot = true;
            bullets.splice(i, 1);
            end = true;
            break;
         }
      }
      if (end) {
         break;
      }
   }

   terrain.show();

   for (var c of cannons) {
      c.events();
   }

   panel.show();

   if (mouseY > height / 10) {
      redCross();
   } else {
      cursor();
   }
}

function setTurn() {
   if (cannons[0].turn) {
      cannons[0].turn = false;
      cannons[1].turn = true;
   } else if (cannons[1].turn) {
      cannons[0].turn = true;
      cannons[1].turn = false;
   }
}

function mousePressed() {
   for (var c of cannons) {
      if (can_shoot && c.turn) {
         var d = dist(c.pipeX, c.pipeY, mouseX, mouseY);
         f = constrain(d, 40, 200);
         var dx = mouseX - c.pipeX;
         var dy = mouseY - c.pipeY;
         var xspeed = dx / d * f / 12;
         var yspeed = dy / d * f / 12;
         bullets.push(new Bullet(c.pipeX, c.pipeY, xspeed, yspeed));
         can_shoot = false;

      }

   }
}

function keyPressed() {
   terrain.generate();
   for (var c of cannons) {
      c.reset();
   }
}

function explode(_d, _x, _y) {
   for (var s = 0; s < 20; s++) {
      for (var i = 0; i < terrain.sands.length; i++) {
         var d = dist(terrain.sands[i].x, terrain.sands[i].y, _x, _y);
         if (d < _d) {
            terrain.sands.splice(i, 1);
         }
      }
   }
   for (var c of cannons) {
      var dc = dist(c.x + c.w / 2, c.y + c.h / 2, _x, _y);
      if (dc < _d * 1.2) {
         var dmg1 = floor(1.2 * (_d - dc / 1.2 + _d / 10));
         dmg1 = floor(constrain(dmg1, 0, _d * 0.75));
         c.hp = floor(c.hp - dmg1);
      }

   }
}


function redCross() {
   noCursor();
   fill(255, 0, 0);
   rectMode(CENTER);
   rect(mouseX, mouseY, 3, 20);
   rect(mouseX, mouseY, 20, 3);
}
