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

function ranPermutation() {
  var size = Math.floor(Math.random() * 26);
  while (size == 0) {
    size = Math.floor(Math.random() * 26);
  }
  var arr = new Array(size);
  for (var i = 0; i < arr.length; i++) arr[i] = i;
  var j;
  var temp;
  for (var i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

function isAValidPermutation(permutation) {
  var dupMap = {};
  for (var i = 0; i < permutation.length; i++) {
    if (
      permutation.length == 0 ||
      permutation[i] < 0 ||
      permutation[i] > permutation.length - 1
    )
      return false;
    // Verificar duplicados.
    if (dupMap[permutation[i]]) return false;
    dupMap[permutation[i]] = true;
  }
  return true;
}
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
class Node {
  constructor(posX, posY, generation) {
    this.posX = posX;
    this.posY = posY;
    this.numIn = 0;
    this.maxSlope = 0;
    this.nodeOut = [];
    this.generation = generation;
  }
}

const alphSize = 26;
var nodes = [];
var map = new Map();

function posToId(x0, y0, x, y, length) {
  var len = length;
  if (x0 < 0) {
    len += Math.abs(x0);
  }
  return (y - y0) * len + (x - x0);
}

function gammaGraph(x0, y0, length, graphType) {
  nodes = [];
  map = new Map();
  var slopes = [];
  var maxY = 25;
  if (y0 <= 0) maxY += Math.abs(y0);
  if (graphType == 1) {
    //natural numbers
    for (var i = 0; i <= maxY; ++i) {
      slopes.push(i);
    }
    nodes.push(new Node(x0, y0, 1));
    map.set(posToId(x0, y0, x0, y0, length), nodes.length - 1);
    //console.log(map.get(0));
    var i = 0;
    var generation = 1;
    while (true) {
      var x = nodes[i].posX + 1;
      var y = nodes[i].posY + slopes[i];
      if (x < length && y < alphSize) {
        nodes.push(new Node(x, y, generation));
        nodes[i + 1].numIn++;
        nodes[i + 1].maxSlope = slopes[i];
        nodes[i].nodeOut.push(posToId(x0, y0, x, y, length));
        map.set(posToId(x0, y0, x, y, length), nodes.length - 1);
        ++i;
      } else {
        break;
      }
    }
    //                    Generacion 2
    var size = nodes.length;
    //console.log(size);
    generation = 2;
    for (var i = 1; i < size; ++i) {
      var j = 0;
      var index = i;
      while (true) {
        var x = nodes[index].posX + 1;
        var y = nodes[index].posY + slopes[j];
        var id = posToId(x0, y0, x, y, length);
        if (map.get(id) >= 0) {
          pos = map.get(id);
        } else {
          pos = -1;
        }
        if (x < length && y < alphSize) {
          if (pos == -1) {
            nodes.push(new Node(x, y, generation));
            pos = nodes.length - 1;
            map.set(posToId(x0, y0, x, y, length), pos);
          }
          var exists = false;
          for (var k = 0; k < nodes[index].nodeOut.length; ++k) {
            if (nodes[index].nodeOut[k] == posToId(x0, y0, x, y, length)) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            nodes[pos].numIn++;
            nodes[pos].maxSlope = Math.max(slopes[j], nodes[pos].maxSlope);
            nodes[index].nodeOut.push(posToId(x0, y0, x, y, length));
          }
          ++j;
          index = pos;
        } else {
          break;
        }
      }
    }
    //                    Generacion 3
    generation = 3;
    var maxId =
      (length + Math.abs(Math.min(x0, 0))) *
      (alphSize + Math.abs(Math.min(y0, 0)));
    for (var i = 0; i <= maxId; ++i) {
      if (map.get(i) >= 0) {
        var node = nodes[map.get(i)];
        if (node.generation == 2) {
          var j = 0;
          var index = map.get(i);
          var maxSlope = node.maxSlope;
          while (slopes[j] <= maxSlope) {
            var x = nodes[index].posX + 1;
            var y = nodes[index].posY + slopes[j];
            var id = posToId(x0, y0, x, y, length);
            if (map.get(id) >= 0) {
              pos = map.get(id);
            } else {
              pos = -1;
            }
            if (x < length && y < alphSize) {
              if (pos == -1) {
                nodes.push(new Node(x, y, generation));
                pos = nodes.length - 1;
                map.set(posToId(x0, y0, x, y, length), pos);
                nodes[pos].numIn++;
              }
              var exists = false;
              for (var k = 0; k < nodes[index].nodeOut.length; ++k) {
                if (nodes[index].nodeOut[k] == posToId(x0, y0, x, y, length)) {
                  exists = true;
                  break;
                }
              }
              if (!exists) {
                nodes[pos].numIn++;
                nodes[pos].maxSlope = Math.max(slopes[j], nodes[pos].maxSlope);
                nodes[index].nodeOut.push(posToId(x0, y0, x, y, length));
              }
              ++j;
              index = pos;
            } else {
              break;
            }
          }
        }
      }
    }
  } else {
    //triangular numbers
    for (var i = 0; (i * (i + 1)) / 2 <= maxY; ++i) {
      slopes.push((i * (i + 1)) / 2);
    }
    nodes.push(new Node(x0, y0, 1));
    map.set(posToId(x0, y0, x0, y0, length), nodes.length - 1);
    //console.log(map.get(0));
    var i = 0;
    //                    Generacion 1
    var generation = 1;
    while (true) {
      var x = nodes[i].posX + 1;
      var y = nodes[i].posY + slopes[i];
      if (x < length && y < alphSize) {
        nodes.push(new Node(x, y, generation));
        nodes[i + 1].numIn++;
        nodes[i + 1].maxSlope = slopes[i];
        nodes[i].nodeOut.push(posToId(x0, y0, x, y, length));
        map.set(posToId(x0, y0, x, y, length), nodes.length - 1);
        ++i;
      } else {
        break;
      }
    }
    //                    Generacion 2
    var size = nodes.length;
    //console.log(size);
    generation = 2;
    for (var i = 1; i < size; ++i) {
      var j = 0;
      var index = i;
      while (true) {
        var x = nodes[index].posX + 1;
        var y = nodes[index].posY + slopes[j];
        var id = posToId(x0, y0, x, y, length);
        if (map.get(id) >= 0) {
          pos = map.get(id);
        } else {
          pos = -1;
        }
        if (x < length && y < alphSize) {
          if (pos == -1) {
            nodes.push(new Node(x, y, generation));
            pos = nodes.length - 1;
            map.set(posToId(x0, y0, x, y, length), pos);
          }
          var exists = false;
          for (var k = 0; k < nodes[index].nodeOut.length; ++k) {
            if (nodes[index].nodeOut[k] == posToId(x0, y0, x, y, length)) {
              exists = true;
              break;
            }
          }
          if (!exists) {
            nodes[pos].numIn++;
            nodes[pos].maxSlope = Math.max(slopes[j], nodes[pos].maxSlope);
            nodes[index].nodeOut.push(posToId(x0, y0, x, y, length));
          }
          ++j;
          index = pos;
        } else {
          break;
        }
      }
    }
    //                    Generacion 3
    generation = 3;
    var maxId =
      (length + Math.abs(Math.min(x0, 0))) *
      (alphSize + Math.abs(Math.min(y0, 0)));
    for (var i = 0; i <= maxId; ++i) {
      if (map.get(i) >= 0) {
        var node = nodes[map.get(i)];
        if (node.generation == 2) {
          var j = 1;
          var index = map.get(i);
          var maxSlope = node.maxSlope;
          while (slopes[j] <= maxSlope) {
            var x = nodes[index].posX + 1;
            var y = nodes[index].posY + slopes[j];
            var id = posToId(x0, y0, x, y, length);
            if (map.get(id) >= 0) {
              pos = map.get(id);
            } else {
              pos = -1;
            }
            if (x < length && y < alphSize) {
              if (pos == -1) {
                nodes.push(new Node(x, y, generation));
                pos = nodes.length - 1;
                map.set(posToId(x0, y0, x, y, length), pos);
                nodes[pos].numIn++;
              }
              var exists = false;
              for (var k = 0; k < nodes[index].nodeOut.length; ++k) {
                if (nodes[index].nodeOut[k] == posToId(x0, y0, x, y, length)) {
                  exists = true;
                  break;
                }
              }
              if (!exists) {
                nodes[pos].numIn++;
                nodes[pos].maxSlope = Math.max(slopes[j], nodes[pos].maxSlope);
                nodes[index].nodeOut.push(posToId(x0, y0, x, y, length));
              }
              ++j;
              index = pos;
            } else {
              break;
            }
          }
        }
      }
    }
  }
  return nodes;
}

function calculatePosition(shiftNumber, letter) {
  var res = dict[letter] - shiftNumber;
  res = (res + alphSize) % alphSize;
  return res;
}

function cipher(x0, y0, permutation, clearText, graphType) {
  if (!isAValidPermutation(permutation)) {
    console.log("WHOOPS");
    return;
  }
  var text = normalizeInput(clearText);
  size = permutation.length;
  nodes = gammaGraph(x0, y0, size, graphType);
  //console.log(nodes);
  var cipheredText = "";
  var position = 0;
  for (var i = 0; i < text.length; ++i) {
    var y = calculatePosition(permutation[position], text[i]);
    var shift = 0;
    if (map.get(posToId(x0, y0, position, y, size)) >= 0) {
      shift = nodes[map.get(posToId(x0, y0, position, y, size))].numIn;
    }
    cipheredText += "(";
    cipheredText += ((shift + dict[text[i]]) % alphSize) + "," + y;
    cipheredText += ")";
    if (i < text.length - 1) cipheredText += ",";
    ++position;
    position %= size;
  }
  return cipheredText;
}
function decipher(x0, y0, permutation, cipherText, graphType) {
  if (!isAValidPermutation(permutation)) {
    console.log("WHOOPS");
    return;
  }
  size = permutation.length;
  var clearText = "";
  var position = 0;
  for (var i = 0; i < cipherText.length; ++i) {
    if (cipherText[i] == "(") {
      ++i;
      var a = "";
      while (cipherText[i] != ",") {
        a += cipherText[i];
        ++i;
      }
      ++i;
      var b = "";
      while (cipherText[i] != ")") {
        b += cipherText[i];
        ++i;
      }
      console.log(a, b);
    } else continue;
    var c = parseInt(b);
    nodes = gammaGraph(x0, y0, size, graphType);
    var shift = 0;
    if (map.get(posToId(x0, y0, a, b, size)) >= 0) {
      shift = nodes[map.get(posToId(x0, y0, a, b, size))].numIn;
    }
    clearText += dict1[(c + permutation[position]) % alphSize];
    ++position;
    position %= size;
  }

  return clearText;
}
console.log(cipher(-8, -6, [3, 0, 2, 7, 9, 6, 1, 5, 4, 8], "the almond", 1));
console.log(
  decipher(
    -8,
    -6,
    [3, 0, 2, 7, 9, 6, 1, 5, 4, 8],
    cipher(-8, -6, [3, 0, 2, 7, 9, 6, 1, 5, 4, 8], "the almond", 1),
    1
  )
);
