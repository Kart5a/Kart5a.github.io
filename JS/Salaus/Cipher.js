var avain;
var viesti;
var salaabtn;
var poistasalaus;
var teksti = [];
var key = [];
var shift = [];
var merk = [];
var salattu = [];
var desalattu = [];
var superkey;

function preload() {
  merk = loadStrings("JS/Salaus/Add/kirjaimet.txt");
}

function setup() {
  noCanvas();

  viesti = select("#muunnettava");

  avain = select("#salasana");

  tulos = select("#muunnettu");
}

function resetoi() {
  teksti = [];
  key = [];
  shift = [];
  salattu = [];
  desalattu = [];
}

function salaa() {
  resetoi();
  if (avain.value() == "") {
    document.getElementById("muunnettu").value = "Virhe!\nAvainta ei asetettu!";

  } else {
    superKey();
    kyyperi();
    document.getElementById("muunnettu").value = salattu.join("");
    console.log("Valmis!");

  }
}

function desalaa() {
  resetoi();
  if (avain.value() == "") {
    document.getElementById("muunnettu").value = "Virhe!\nAvainta ei asetettu!";
  } else {
    superKey();
    dekyyperi();
    document.getElementById("muunnettu").value = desalattu.join("");
    console.log("Valmis!");
  }
}


function superKey() {
  superkey = avain.value();
  teksti = viesti.value().split('');
  this.kerto = ceil(viesti.value().length / avain.value().length);
  for (var i = 0; i < this.kerto - 1; i++) {
    superkey += avain.value();
  }
  var apituus = superkey.length;
  var tpituus = viesti.value().length;

  if (viesti.value().length % superkey.length !== 0) {
    var yli = apituus - tpituus;
    superkey = superkey.slice(0, superkey.length - yli);
  }

  key = superkey.split('');

  for (var i = 0; i < key.length; i++) {
    for (var j = 0; j < merk.length; j++) {
      if (key[i] === merk[j]) {
        shift[i] = j;
      }
    }
  }
}

function kyyperi() {
  for (var i = 0; i < key.length; i++) {
    if (teksti[i] === "\n") {
      salattu[i] = "⼄";
    }
    for (var j = 0; j < merk.length; j++) {
      if (teksti[i] === merk[j]) {
        var s = shift[i];
        if (j + s <= merk.length) {
          salattu[i] = merk[j + s];
        }
        if (j + s > merk.length) {
          salattu[i] = merk[j + s - merk.length];
        }
      }
    }
  }
}

function dekyyperi() {
  //var m = '\n';
  for (var i = 0; i < key.length; i++) {
    if (teksti[i] === "⼄") {
      desalattu[i] = "\n";
    }
    for (var j = 0; j < merk.length; j++) {
      if (teksti[i] === merk[j]) {
        var s = shift[i];
        if (j - s >= 0) {
          desalattu[i] = merk[j - s];
        }
        if (j - s < 0) {
          desalattu[i] = merk[merk.length + (j - s)];
        }
      }
    }
  }
}
