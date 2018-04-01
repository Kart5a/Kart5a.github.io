function Tree(_name, _age, _growth, _waterLevel, _dryness, _pometrusPicked, _pometrusSpawned, _pometrusMissed, _pometrusFell, _form) {

   this.age = _age; // Age in minutes
   this.growth = _growth;
   this.waterLevel = _waterLevel; // 0 -> 100 (68,5 on ideaali)
   this.dryness = _dryness; // How long time tree has been without water

   this.pometrusPicked = _pometrusPicked;
   this.pometrusSpawned = _pometrusSpawned;
   this.pometrusMissed = _pometrusMissed;
   this.pometrusFell = _pometrusFell;

   this.form = _form; // 0 - 7 (puut)
   this.dead = false;

   this.flag = 1;
   this.name = null;


   this.time = function() {
      this.waterLevel = constrain(this.waterLevel, 0, 100);
      // time interval 1 minute
      if (floor(millis()/1000) % 60 == 0) {
         if (this.flag == 1) {
            return;
         }
            this.tick();
            this.flag = 1;
      }
      if (floor(millis()/1000) % 60 != 0){
         this.flag = 0;
      }
   }

   this.tick = function() {
      this.age += 1;
      this.waterDrain();
      this.grow();
      this.drying();
      this.die();

      for (var fruit of pometrus_fruits) {
         fruit.moreAge();
      }

      if (this.form == 2) {
         rnd = floor(random(0, 120));
         if (rnd == 0) {
            spawnPometrus();
         }
      } else if (this.form == 3) {
         rnd = floor(random(0, 60));
         if (rnd == 0) {
            spawnPometrus();
         }
      } else if (this.form == 4) {
         rnd = floor(random(0, 30));
         if (rnd == 0) {
            spawnPometrus();
         }
      } else if (this.form == 5) {
         rnd = floor(random(0, 15));
         if (rnd == 0) {
            spawnPometrus();
         }
      } else if (this.form == 6) {
         rnd = floor(random(0, 8));
         if (rnd == 0) {
            spawnPometrus();
         }
      } else if (this.form == 7) {
         rnd = floor(random(0, 3));
         if (rnd == 0) {
            spawnPometrus();
         }
      }
      vrm[0] = tree.age;
      this.treeCookie();
      pometrusCookie();
   }

   this.treeCookie = function() {
      _treeData = this.dumpData();
      bake_cookie('treeData', _treeData, 100000);
   }

   this.waterDrain = function() {
      this.drainRate = (4 * (7 - this.form) + (2 * this.pometrusSpawned)) / 50;
      this.waterLevel -= this.drainRate;
   }

   this.grow = function() {
      this.growRate = 8 - ((abs(68.5 - this.waterLevel)) / 10);
      this.growth += this.growRate;
      if (this.form < 7) {
         this.changeForm();
      }
   }

   this.drying = function() {
      if (this.waterLevel == 0) {
         this.dryness += 1;
      } else if (this.waterLevel > 0) {
         this.dryness = 0;
      }
   }

   this.die = function() {
      if (this.dryness >= 20*(1+this.form)) {
         this.dead = true;
      }
   }

   this.changeForm = function() {
      if (this.growth >= 300) {
         this.form = 1;
      }
      if (this.growth >= 3000) {
         this.form = 2;
      }
      if (this.growth >= 30000) {
         this.form = 3;
      }
      if (this.growth >= 90000) {
         this.form = 4;
      }
      if (this.growth >= 200000) {
         this.form = 5;
      }
      if (this.growth >= 2000000) {
         this.form = 6;
      }
      let num = floor(random(0, 40000));
      if (num == 0 && this.form == 6) {
         this.form = 7;
      }
   }

   this.show = function() {
      if (this.dead) {
         ind = constrain(tree.form, 0, 4);
         image(deads[ind], 0, 0);
      } else {
      image(trees[tree.form], 0, 0);
   }
}

   this.showStats = function() {
      fill(0);
      textSize(25);
      textAlign(LEFT);
      text(this.age + " mins", 10, 35);
      textAlign(RIGHT);
      text(this.pometrusPicked + " Pometrus", 780, 35);


      fill(20, 200, 255);
      noStroke();
      rect(25, 200 - this.waterLevel * 2 + 80, 30, this.waterLevel * 2);
      image(meter_img, 0, 50, 80, 250);
   }

   this.dumpData = function() {
      return { 'treeData' : {
         name: this.name,
         age: this.age,
         growth: this.growth,
         waterLevel: this.waterLevel,
         dryness: this.dryness,
         pometrusPicked: this.pometrusPicked,
         pometrusSpawned: this.pometrusSpawned,
         pometrusMissed: this.pometrusMissed,
         pometrusFell: this.pometrusFell,
         form: this.form
      }
   }
   }
   this.setName = function(_name) {
      this.name = _name;
   }
}
