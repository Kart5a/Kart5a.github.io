var tree;
var data;

var trees = [];
var deads = [];
var watering_can_img;
var pometrus_img;
var meter_img;
var bg_img;

var pometrus_fruits = [];
var _temp;

function preload() {

   for (var i = 0; i < 8; i++) {
      img = loadImage("images/puu" + i + ".png");
      trees.push(img);
   }
   for (var i = 0; i < 5; i++) {
      img = loadImage("images/k" + i + ".png");
      deads.push(img);
   }

   watering_can_img = loadImage("images/kannu.png");
   pometrus_img = loadImage("images/pometrus.png");
   meter_img = loadImage("images/mittari.png");
   bg_img = loadImage("images/tausta.png");

   data = read_cookie('treeData');

   if (read_cookie('pometrus') == null) {
      pometrus_fruits = [];
   } else {
      temp = read_cookie('pometrus');

      for (var i of temp) {
         pometrus_fruits.push(new Pometrus(i.age, i.x, i.y));
      }
   }

   if (data == null) {
      data = {
         'treeData': {
            name: null,
            age: 0,
            growth: 0,
            waterLevel: 50,
            dryness: 0,
            pometrusPicked: 0,
            pometrusSpawned: 0,
            pometrusMissed: 0,
            pometrusFell: 0,
            form: 0
         }
      }
   }
}

function setup() {
   createCanvas(800, 600);
   frameRate(20);

   tree = new Tree(data.treeData.name, data.treeData.age, data.treeData.growth, data.treeData.waterLevel, data.treeData.dryness, data.treeData.pometrusPicked, data.treeData.pometrusSpawned, data.treeData.pometrusMissed, data.treeData.pometrusFell, data.treeData.form);
   watering_can = new Watering_can();

}

function draw() {
   background(0);
   image(bg_img, 0, 0);

      tree.showStats();
      tree.show();
      watering_can.show();

      if (tree.dead == false) {
         tree.time();
      }

      if (tree.dead == true) {
         pometrus_fruits = [];
         showResults();
         bake_cookie('treeData', null, 1000);
      }

      for (let i = 0; i < pometrus_fruits.length; i++) {
         pometrus_fruits[i].show();
         if (pometrus_fruits[i].age >= 40) {
            pometrus_fruits[i].fall();
            tree.pometrusFell += 1;
         }
         if (pometrus_fruits[i].age >= 80) {
            pometrus_fruits.splice(i, 1);
            tree.pometrusMissed += 1;
         }
      }
}

function mousePressed() {
   for (var i = 0; i < pometrus_fruits.length; i++) {
      if (pometrus_fruits[i].intersects(mouseX, mouseY)) {
         tree.pometrusPicked += 1;
         vrm[2] += 1;
         pometrus_fruits.splice(i, 1);
      }
   }
   if (watering_can.intersects(mouseX, mouseY)) {
      tree.waterLevel += 10;
   }
   tree.treeCookie();
   pometrusCookie();
}


function spawnPometrus() {
   pometrus_fruits.push(new Pometrus());
   console.log("Pometrus has spawn!");
   tree.waterLevel -= 7 - tree.form;
   tree.pometrusSpawned += 1;
}

function showResults() {
   fill(100, 100, 100, 200);
   rect(0, 200, width, height - 2 * 200);
   fill(255);
   textAlign(CENTER, CENTER);
   textSize(30);
   text("Tree died :(", width / 2, height / 2 - 50);
   textSize(20);
   text("Your tree survived " + tree.age + " minutes and it produced " + tree.pometrusPicked + " pometrus fruits!", width / 2, height / 2 + 20);
   text("You missed " + tree.pometrusMissed + " pometrus fruits.", width / 2, height / 2 + 60);
}

function pometrusCookie() {
   bake_cookie('pometrus', pometrus_fruits, 100000);
}

function bake_cookie(cname, cvalue, exdays) {
   var d = new Date();
   d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
   var expires = "expires=" + d.toUTCString();
   cvalue = JSON.stringify(cvalue);
   document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function read_cookie(name) {
   var result = document.cookie.match(new RegExp(name + '=([^;]+)'));
   result && (result = JSON.parse(result[1]));
   return result;
}


function delete_cookie(name) {
   document.cookie = [name, '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; path=/; domain=.', window.location.host.toString()].join('');
}
