function ranPermutation() {
  var size = Math.floor(Math.random() * 26);
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

var normalizeInput = function (inputText) {
  return rmAccents(inputText)
    .replaceAll(/[^a-zA-Z]/g, "")
    .replaceAll(" ", "")
    .toLowerCase();
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
  /*// Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }*/
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
//console.log(posToId(2, 2, 0, 0, 4));

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
  } else {
    //triangular numbers
    for (var i = 0; (i * (i + 1)) / 2 <= maxY; ++i) {
      slopes.push((i * (i + 1)) / 2);
    }
  }
  //console.log(slopes);
  //                    Generacion 1
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
  console.log(size);
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
  return nodes;
}

console.log(gammaGraph(1, 1, 5, 2));

function cipher(x0, y0, permutation, clearText, graphType) {
  text = normalizeInput(clearText);
  nodes = gammaGraph(x0, y0, permutation.length, graphType);
}
//nodes.push(new Node(5, 5));
/*map.set(12, 1);
console.log(map.get(12));*/
