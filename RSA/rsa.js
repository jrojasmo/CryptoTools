var rmAccents = function (inputText) {
  var accents = "ÁÄáäÓÖóöÉËéÇçÍÏíïÚÜúüÑñ";
  var noAccents = "AAaaOOooEEeeCcIIiiUUuuNn";
  return inputText
    .split("")
    .map(function (chr) {
      const accentIndex = accents.indexOf(chr);
      return accentIndex !== -1 ? noAccents[accentIndex] : chr;
    })
    .join("");
};

var normalizeInput = function (inputText) {
  return rmAccents(inputText)
    .replaceAll(/[^a-zA-Z]/g, "")
    .replaceAll(" ", "")
    .toLowerCase();
};
const dict1 = {
  0: "a",
  1: "b",
  2: "c",
  3: "d",
  4: "e",
  5: "f",
  6: "g",
  7: "h",
  8: "i",
  9: "j",
  10: "k",
  11: "l",
  12: "m",
  13: "n",
  14: "o",
  15: "p",
  16: "q",
  17: "r",
  18: "s",
  19: "t",
  20: "u",
  21: "v",
  22: "w",
  23: "x",
  24: "y",
  25: "z",
};
const dict = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
};

class Pair {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

function power(x, y, p) {
  let res = 1;
  x = x % p;

  if (x == 0) return 0;

  while (y > 0) {
    if (y & 1) res = (res * x) % p;
    y = y >> 1;
    x = (x * x) % p;
  }
  return res;
}

function gcdExtended(a, b, pair) {
  if (a == 0) {
    pair.x = 0;
    pair.y = 1;
    return b;
  }
  let gcd = gcdExtended(b % a, a, pair);

  var temp = pair.x;
  pair.x = pair.y - Math.floor(b / a) * pair.x;
  pair.y = temp;

  return gcd;
}
var maxNumber = 10000000;
var primerArray = sieveOfEratosthenes(maxNumber);

function sieveOfEratosthenes(n) {
  var array = [];
  prime = Array.from({ length: n + 1 }, (_, i) => true);

  for (p = 2; p * p <= n; p++) {
    if (prime[p] == true) {
      for (i = p * p; i <= n; i += p) prime[i] = false;
    }
  }
  for (i = 2; i <= n; i++) {
    if (prime[i] == true) array.push(i);
  }
  return array;
}

const alphSize = 26;

function cipher(clearText, totient, n, b) {
  var pair = new Pair(0, 0);
  var gcd = gcdExtended(b, totient, pair);
  if (gcd != 1) {
    console.log("ERROR, b no es invertible modulo n");
    return;
  }
  console.log(pair.x, pair.y);
  var text = normalizeInput(clearText);
  //   console.log(text);
  var cipheredText = [];
  for (var i = 0; i < text.length; ++i) {
    // console.log(dict[text[i]]);
    var number = power(dict[text[i]], b, n);
    cipheredText.push(number);
  }
  return cipheredText;
}
function decipher(array) {
  for (var i = 0; i < array.length; ++i) {}
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// var pair = new Pair(0, 0);
// var a = 35;
// var b = 15;
// var g = gcdExtended(a, b, pair);
// console.log(pair.x, pair.y);
console.log(cipher("esto es una prueba", 419328, 420643, 292993));
