let terrain;
let panel;
let cannons = [];
let bullets = [];

let gravity = 0.15;
let can_shoot = true;
let wind = 0;
let shop = [];
let rounds = 0;

function setup() {
   createCanvas(800, 1000);
   terrain = new Terrain();
   panel = new Panel();
   cannons.push(new Cannon(left = false));
   cannons.push(new Cannon(left = true));
   terrain.generate();
   newWind();
}

function draw() {
   background(120, 140, 240);

   var end = false;
   for (let i = 0; i < bullets.length; i++) {

      bullets[i].move();
      bullets[i].show();

      // Tarkastaa jos bulletti lentää kentästä yli
      if (bullets[i].x > width || bullets[i].x < 0 || bullets[i].y > height) {
         explode(bullets[i].power, bullets[i].x, bullets[i].y);
         setTurn();
         can_shoot = true;
         bullets.splice(i, 1);
         end = true;
         newWind();
         break;
      }

      // Tarkastaa osuuko bulletti maahan
      for (var s of terrain.sands) {
         if (bullets[i].intersects(s.x - terrain.space / 2, s.y - terrain.space / 2, terrain.space, terrain.space)) {
            explode(bullets[i].power, bullets[i].x, bullets[i].y);
            setTurn();
            can_shoot = true;
            bullets.splice(i, 1);
            newWind();
            end = true;
            break;
         }
      }

      if (end) {
         break;
      }
      // Tarkastaa osuuko kuti cannoniin
      for (var c of cannons) {
         if (bullets[i].intersects(c.x, c.y, c.w, c.h)) {
            explode(bullets[i].power, bullets[i].x, bullets[i].y);
            setTurn();
            can_shoot = true;
            bullets.splice(i, 1);
            newWind();
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

   for (var s of shop) {
      s.show();
      can_shoot = false;
   }

   if (mouseY > height / 10 && shop.length == 0) {
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
      rounds += 1;
   }
   for (var c of cannons) {
      if (c.repairs > 0) {
         c.repairs -= 1;
         c.hp += 10;

      }
      c.money += floor(10 * (1 + rounds / 8));

   }
}

function newWind() {
   var r = random(-1, 1);
   wind = wind * 2 / 3 + r / 3;
   wind = constrain(wind, -1, 1);
}

function mousePressed() {
   for (var c of cannons) {
      if (can_shoot && c.turn && mouseY > height / 10) {
         var d = dist(c.pipeX, c.pipeY, mouseX, mouseY);
         f = constrain(d, 40, 200);
         var dx = mouseX - c.pipeX;
         var dy = mouseY - c.pipeY;
         var xspeed = dx / d * f / 12;
         var yspeed = dy / d * f / 12;
         if (c.tss) {
            bullets.push(new TSS(c.pipeX, c.pipeY, xspeed, yspeed));

         } else {
            bullets.push(new Bullet(c.pipeX, c.pipeY, xspeed, yspeed, c.power));
         }
         can_shoot = false;
         c.tss = false;
      }
   }
   if (mouseX > width / 2 - 50 && mouseX < width / 2 + 50 && mouseY > 80 - 35 / 2 && mouseY < 80 + 35 / 2) {
      if (shop.length > 0) {
         shop = [];
         can_shoot = true;
      } else {
         shop.push(new Shop());
      }
   }
   if (shop.length > 0) {
      // Jos kauppa on auki
      if (cannons[0].turn) {
         var cannon = cannons[0];
      } else if (cannons[1].turn) {
         var cannon = cannons[1];
      }
      if (mouseX > shop[0].x - shop[0].w / 4.5 - shop[0].hbw / 2 && mouseX < shop[0].x - shop[0].w / 4.5 + shop[0].hbw / 2 && mouseY > shop[0].y - shop[0].h / 4.5 - shop[0].hbh / 2 && mouseY < shop[0].y - shop[0].y / 4.5 + shop[0].hbh / 2) {
         if (cannon.money >= 200) {
            cannon.money -= 200;
            cannon.power += 10;
         }
      } else if (mouseX > shop[0].x + shop[0].w / 4.5 - shop[0].hbw / 2 && mouseX < shop[0].x + shop[0].w / 4.5 + shop[0].hbw / 2 && mouseY > shop[0].y - shop[0].h / 4.5 - shop[0].hbh / 2 && mouseY < shop[0].y - shop[0].y / 4.5 + shop[0].hbh / 2) {
         if (cannon.money >= 160) {
            cannon.money -= 160;
            cannon.repairs += 3;
         }
      } else if (mouseX > shop[0].x - shop[0].w / 4.5 - shop[0].hbw / 2 && mouseX < shop[0].x - shop[0].w / 4.5 + shop[0].hbw / 2 && mouseY > shop[0].y + shop[0].h / 4.5 - shop[0].hbh / 2 && mouseY < shop[0].y + shop[0].y / 4.5 + shop[0].hbh / 2) {
      } else if (mouseX > shop[0].x + shop[0].w / 4.5 - shop[0].hbw / 2 && mouseX < shop[0].x + shop[0].w / 4.5 + shop[0].hbw / 2 && mouseY > shop[0].y + shop[0].h / 4.5 - shop[0].hbh / 2 && mouseY < shop[0].y + shop[0].y / 4.5 + shop[0].hbh / 2) {
         if (cannon.money >= 420) {
            cannon.tss = true;
            cannon.money -= 420;
         }
      }

   }

   if (!can_shoot && shop.length == 0) {
      // Erikoistapaukset
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
