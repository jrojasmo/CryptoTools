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

function gcdExtended(a, b, pair = new Pair(0, 0)) {
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
function sieveOfEratosthenes(n) {
  var array = [];
  prime = Array.from({ length: n + 1 }, (_, i) => true);

  for (p = 2; p * p <= n; p++) {
    if (prime[p] == true) {
      for (i = p * p; i <= n; i += p) prime[i] = false;
    }
  }
  for (i = 2; i <= n; i++) {
    if (prime[i] == true && i % 4 == 3) array.push(i);
  }
  return array;
}

function findSquareRoots(y, p, q) {
  var mp = power(y, (p + 1) / 4, p);
  var mq = power(y, (q + 1) / 4, q);
  //console.log(mp, mq);
  var pair = new Pair(0, 0);
  var n = p * q;
  gcdExtended(p, q, pair);
  var yp = pair.x;
  var yq = pair.y;
  var r1 = (yp * p * mq + yq * q * mp) % n;
  while (r1 < 0) {
    r1 += n;
    r1 %= n;
  }
  var r2 = n - r1;
  var r3 = (yp * p * mq - yq * q * mp) % n;
  while (r3 < 0) {
    r3 += n;
    r3 %= n;
  }
  var r4 = n - r3;
  var array = [];
  array.push(r1, r2, r3, r4);
  return array;
}

var maxNumber = 44000;
var primeArray = sieveOfEratosthenes(maxNumber);
var primeNumber = primeArray.length;
const alphSize = 26;
const asciiCodeOfA = 97;
const asciiCodeOfZ = 122;

function cipher(clearText, n, B) {
  var text = normalizeInput(clearText);
  var cipheredText = [];

  for (var i = 0; i < text.length; ++i) {
    var x = dict[text[i]] + asciiCodeOfA;
    var number = x * (x + B);
    number %= n;
    cipheredText.push(number);
  }
  return cipheredText;
}
function decipher(array, p, q, B) {
  if (p * q <= asciiCodeOfZ) {
    console.log(
      "n es algo pequeño por lo que pueden haber problemas en el descifrado"
    );
  }
  var pair = new Pair(0, 0);
  var n = p * q;
  gcdExtended(4, p * q, pair);
  var invFour = pair.x;
  pair.x = 0;
  pair.y = 0;
  gcdExtended(2, p * q, pair);
  var invTwo = pair.x;
  while (invFour < 0) {
    invFour += n;
    invFour %= n;
  }
  while (invTwo < 0) {
    invTwo += n;
    invTwo %= n;
  }
  var toFind = B * B * invFour;
  toFind %= n;
  var posibilities = [];
  for (var i = 0; i < alphSize; ++i) {
    posibilities.push([]);
    //console.log(posibilities[i].length);
  }
  for (var i = 0; i < array.length; ++i) {
    var root = toFind + array[i];
    var roots = findSquareRoots(root, p, q);
    var minus = B * invTwo;
    minus %= n;
    for (var j = 0; j < roots.length; ++j) {
      roots[j] -= minus;
      while (roots[j] < 0) {
        roots[j] += n;
        roots[j] %= n;
      }
    }
    console.log(roots);
    for (var j = 0; j < roots.length; ++j) {
      if (roots[j] >= asciiCodeOfA && roots[j] <= asciiCodeOfZ) {
        var index = roots[j] - asciiCodeOfA;
        if (posibilities[index].indexOf(array[i]) == -1) {
          posibilities[index].push(array[i]);
        }
      }
    }
  }
  var toPrint = [];
  var posib = 1;
  for (var i = 0; i < alphSize; ++i) {
    var arr = [];
    arr.push(dict1[i]);
    if (posibilities[i].length > 0) {
      arr.push(posibilities[i]);
      toPrint.push(arr);
      posib = posib * posibilities[i].length;
    }
  }
  var clearText;
  console.log(toPrint);
  if (posib == 1) {
    console.log("Solo hay una forma de descifrar el siguiente texto:");
    clearText = "";
    var map = new Map();
    for (var i = 0; i < toPrint.length; ++i) {
      map.set(toPrint[i][1][0], toPrint[i][0]);
    }
    for (var i = 0; i < array.length; ++i) {
      clearText += map.get(array[i]);
    }
  } else {
    if (posib > 1) {
      console.log(
        "Hay más de una forma de descifrar el siguiente texto, las posibilidades son las siguientes"
      );
      var mask = [];
      var cota = [];
      var hasMore = [];
      for (var i = 0; i < toPrint.length; ++i) {
        mask.push(0);
        cota.push(toPrint[i][1].length);
        if (toPrint[i][1].length > 1) {
          hasMore.push(true);
        } else hasMore.push(false);
      }
      clearText = [];

      for (var i = 0; i < posib; ++i) {
        var tempPosibility = [];
        clearText.push(tempPosibility);
        addOne(mask, cota);
      }
    }
  }
  return clearText;
}

function generateKey() {
  var p, q;
  var minPrime = 1000;
  p = primeArray[Math.floor(Math.random() * primeNumber)];
  while (p <= minPrime) {
    p = primeArray[Math.floor(Math.random() * primeNumber)];
  }
  q = primeArray[Math.floor(Math.random() * primeNumber)];
  while (q <= minPrime || q == p) {
    q = primeArray[Math.floor(Math.random() * primeNumber)];
  }
  var array = [];
  array.push(p * q);
  array.push(p);
  array.push(q);
  return array;
}
// var pair = new Pair(0, 0);
// var a = 28;
// var b = 75;
// var g = gcdExtended(a, b, pair);
// console.log(g);
// console.log(pair.x, pair.y);
// var array = generateKey();
// console.log(array);
console.log("CIFRAR");
console.log(cipher("abcd", 8561, 9));
console.log("DESCIFRAR");
console.log(decipher(cipher("abcd", 8561, 9), 7, 1223, 9));
//console.log(array);
//console.log(findSquareRoots(23, 7, 11));
