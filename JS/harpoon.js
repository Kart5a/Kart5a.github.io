const W = 18;
const H = 10;
const scale = 30;
var field_matrix = [];
var tuuli = 0;
var ammuttu = false;

var images = [];

function preload() {
  for (var i = 1; i < 11; i++) {
    images.push(loadImage("Images/Harpoon -kuvakkeet/" + i + ".png"));
  }
}

function setup() {
  createCanvas(W*scale, H*scale);
  newgame();
}

function draw() {
  background(80, 100, 220);
  Show();

}

function newgame() {
  ammuttu = false;
  field_matrix = [];
    for (var i = 0; i < H; i++) {
      field_matrix[i] = [];
      for (var j = 0; j < W; j++) {
        if (i == H - 1) {
          field_matrix[i][j] = 8;
        } else {
          field_matrix[i][j] = 0;
        }

      }
    }
  field_matrix[H-1][0] = 9;

  // Kala
    var kala_r = Math.floor(Math.random() * Math.floor(5 + 1));


    if (kala_r < 2) {

      var ilmapallo_x = Math.floor(Math.random() * Math.floor(W - 4 + 1)) + 3;
      var ilmapallo_y = Math.floor(Math.random() * Math.floor(H - 3));
      field_matrix[ilmapallo_y][ilmapallo_x] = 2;

    } else {

      var ilmapallo = Math.floor(Math.random() * Math.floor(2 + 1));

      var ilmapallo_x = Math.floor(Math.random() * Math.floor(W - 4 + 1)) + 3;
      var ilmapallo_y = Math.floor(Math.random() * Math.floor(H - 3));
      var kala = Math.floor(Math.random() * Math.floor(W - 2));

      if (ilmapallo == 1) {
        field_matrix[ilmapallo_y][ilmapallo_x] = 2;
      }
      field_matrix[H - 1][kala + 2] = 1;
    }

    // EpicKala
    var rnd = Math.floor(Math.random() * Math.floor(15 + 1));

    if (rnd == 1) {
      while (true) {
        var epic = Math.floor(Math.random() * Math.floor(W - 2));
        if (field_matrix[H - 1][epic + 3] != 1) {
          field_matrix[H - 1][epic + 3] = 3;
          break;
        } else {
          continue;
        }
      }
    }
  tuuli = Math.floor(Math.random() * Math.floor(10 + 1)) - 5;


}

function Show() {
  textSize(15);
  textAlign(LEFT, CENTER);
  text("Tuuli: " + tuuli, 10, 15);

  for (let y = 0; y < H; y++) {
      for (let x = 0; x < W; x++) {
        if (field_matrix[y][x] == 0) {

        } else if (field_matrix[y][x] == 8) {
          image(images[8], x*scale, y*scale, scale, scale);
        } else if (field_matrix[y][x] == 1) {
          image(images[1], x*scale, y*scale, scale, scale);
        } else if (field_matrix[y][x] == 2) {
          image(images[2], x*scale, y*scale, scale, scale);
        } else if (field_matrix[y][x] == 3) {
          image(images[3], x*scale, y*scale, scale, scale);
        } else if (field_matrix[y][x] == 9) {
          image(images[9], x*scale, y*scale, scale, scale);
        } else if (field_matrix[y][x] == 6) {
          image(images[6], x*scale, y*scale, scale, scale);
        } else if (field_matrix[y][x] == 7) {
          image(images[7], x*scale, y*scale, scale, scale);
        } else if (field_matrix[y][x] == 4) {
          image(images[4], x*scale, y*scale, scale, scale);
        }
      }
    }

}

function ammu(_deg, _force) {
      if (ammuttu) {
        return console.log("Kirjoita newgame();");
      }
  		ammuttu = true;
  		let c_w = W * 10;
      let c_h = H * 10;

      let _x = 0;
      let _y = c_w - c_h/H * (H-1) ;

      let g = -0.2;

      let f_x = Math.cos(_deg / 180 * Math.PI) * _force;
      let f_y = Math.sin(_deg / 180 * Math.PI) * _force;

      let i = 0;
      let flag = true;

      while (flag) {

        i++;

        _x = _x + tuuli/5*i/2000 + f_x / 100;
        _y = _y - (g * i / 100 + f_y / 100);

        if (_x <= 0 || _x > c_w) {
          break;
        }
        if (_y >= c_h) {
          break;
        }

        _xtile = Math.floor(_x / c_w * W);
        _ytile = Math.floor(_y / c_h * H);

        if (_xtile == 0 && _ytile == H - 1) {
          continue;
        }

        try {
        // OSUMAT

        if (field_matrix[_ytile][_xtile] == 1) {
          console.log("Osuit haihin! Voitit");
          field_matrix[_ytile][_xtile] = 7;
          break;

        }
        if (field_matrix[_ytile][_xtile] == 2) {

          console.log("Osuit palloon! Voitit");
          field_matrix[_ytile][_xtile] = 7;
          flag = false;
          break;

        }
        if (field_matrix[_ytile][_xtile] == 3) {

          console.log("Osuit valaaseen! Voitit");
          field_matrix[_ytile][_xtile] = 7;
          flag = false;
          break;

        }

        if (_ytile ==  H - 1) {
          field_matrix[_ytile][_xtile] = 4;
          flag = false;
          break;
        }
          field_matrix[_ytile][_xtile] = 6;
        } catch (err) {
          continue;
        }

      }
}
