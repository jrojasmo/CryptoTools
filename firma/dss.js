function modInverse(a, mod) {
  // validate inputs
  [a, mod] = [Number(a), Number(mod)]
  if (Number.isNaN(a) || Number.isNaN(mod)) {
    return NaN // invalid input
  }
  a = (a % mod + mod) % mod
  if (!a || mod < 2) {
    return NaN // invalid input
  }
  // find the gcd
  const s = []
  let b = mod
  while (b) {
    [a, b] = [b, a % b]
    s.push({ a, b })
  }
  if (a !== 1) {
    return NaN // inverse does not exists
  }
  // find the inverse
  let x = 1
  let y = 0
  for (let i = s.length - 2; i >= 0; --i) {
    [x, y] = [y, x - y * Math.floor(s[i].a / s[i].b)]
  }
  return (y % mod + mod) % mod
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

function prime_factors(num) {
  function is_prime(num) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  const result = [];
  for (let i = 2; i <= num; i++) {
    while (is_prime(i) && num % i === 0) {
      if (!result.includes(i)) result.push(i);
      num /= i;
    }
  }
  return result;
}

function gcd(a, b) {
  if (a == 0)
    return b;
  return gcd(b % a, a);
}
//// KEY MANAGEMENT
function sieveOfEratosthenes(n) {
  var array = [];
  var prime = Array.from({ length: n + 1 }, (_, i) => true);

  for (var p = 2; p * p <= n; p++) {
    if (prime[p] == true) {
      for (var i = p * p; i <= n; i += p) prime[i] = false;
    }
  }
  for (var i = 2; i <= n; i++) {
    if (prime[i] == true) array.push(i);
  }
  return array;
}

function generatePandQ() {
  var primes = sieveOfEratosthenes(maxNumber).slice(50);
  var result = [];
  for (var i = 0; i < primes.length; i++) {
    var factorsPm1 = prime_factors(primes[i] - 1);
    for (var j = 0; j < factorsPm1.length; j++) {
      if (power(factorsPm1[j], factorsPm1[j], primes[i]) == 1) {
        result.push([primes[i], factorsPm1[j]])
      }
    }
  }
  return result;
}

function getRandomInt(min, max) {
  // random int in (min, max)
  return Math.floor(Math.random() * (max - min)) + min;
}

const maxNumber = 11000;
const pAndQArr = generatePandQ();
const pAndQArrLen = pAndQArr.length;

function generateKey() {
  var key = [];
  var gen = [];
  var ranNum = getRandomInt(0, pAndQArrLen);
  var p = pAndQArr[ranNum][0];
  var q = pAndQArr[ranNum][1];
  //p
  key.push(p);
  //q
  key.push(q);
  // Get generators of p
  /*
  var factorPm1 = prime_factors(p - 1);
  out:
  for (var g = 2; g < p - 2; g++) {
    for (var i = 0; i < factorPm1.length; i++) {
      if (power(g, (p - 1) / factorPm1[i], p) == 1) {
        continue out;
      }
    }
    gen.push(g);
  }
  */
  for (var g = 2; g < p - 1; g++) {
    if (power(g, q, p) == 1) {
      gen.push(g);
    }
  }
  ranNum = getRandomInt(0, gen.length);
  var alpha = gen[ranNum];
  ranNum = getRandomInt(0, q - 1);
  var a = ranNum;
  var beta = power(alpha, a, p);
  key.push(alpha);
  key.push(beta);
  key.push(a);
  return key;
}

function signSha(shaString, p, q, alpha, a) {
  var arr = [];
  var signArr = [];
  var jump = 2;
  for (var i = 0; i < shaString.length / jump; i++) {
    arr.push(Number("0x" + shaString.slice(i * jump, (i + 1) * jump)));
  }
  for (var i = 0; i < arr.length; i++) {
    signArr.push(sign(arr[i], p, q, alpha, a));
  }

  return signArr;
}

function sign(numb, p, q, alpha, a) { // k entre 1 y q
  var ranK;
  var gamma = 0;
  var delta = 0;
  while (gamma == 0 || delta == 0) {
    ranK = getRandomInt(1, q - 1);
    gamma = power(alpha, ranK, p) % q;
    delta = ((numb + a * gamma) * modInverse(ranK, q)) % q;
  }
  var arr = [];
  arr.push(gamma);
  arr.push(delta);
  return arr;
}

function verifySha(shaString, signArr, p, q, alpha, beta) {
  var arr = [];
  var jump = 2;
  for (var i = 0; i < shaString.length / jump; i++) {
    arr.push(Number("0x" + shaString.slice(i * jump, (i + 1) * jump)));
  }
  for (var i = 0; i < arr.length; i++) {
    /*
    if (!verify(arr[i], signArr[i][0], signArr[i][1], p, q, alpha, beta)) {
      console.log('MUERE EN ' + arr[i])
    } else {
      console.log('CORRECTO PARA ' + arr[i])
    }
    */
    if (!verify(arr[i], signArr[i][0], signArr[i][1], p, q, alpha, beta)) return false;
  }
  return true;
}

function verify(numb, gamma, delta, p, q, alpha, beta) {
  var e1 = numb * modInverse(delta, q) % q;
  var e2 = gamma * modInverse(delta, q) % q;
  return gamma === ((power(alpha, e1, p) * power(beta, e2, p)) % p) % q;
}

var text = '50137ab0be5e0c73ee0cd747f457e71822d6d5dcf00a7e807ed283467e42ffff';
var text2 = '50137ab0be5e0c73ee0cd747f457e71822d6d5dcf00a7e801ed283467e42ffff';
var llave = generateKey(); // [p, q, alpha, beta, a]
console.log(llave);
var firma = signSha(text, llave[0], llave[1], llave[2], llave[4]);
console.log(firma);
console.log(verifySha(text2, firma, llave[0], llave[1], llave[2], llave[3]));

/*
var llave = generateKey();
console.log(llave);
var test = getRandomInt(0, 255);
var ranK = getRandomInt(1, llave[1] - 1);
var firma = sign(test, llave[0], llave[1], llave[2], llave[4]);
console.log(firma);
console.log(verify(test+1, firma[0], firma[1], llave[0], llave[1], llave[2], llave[3]));
*/