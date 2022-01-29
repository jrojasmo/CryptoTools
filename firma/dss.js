var text = '50137ab0be5e0c73ee0cd747f457e71822d6d5dcf00a7e807ed283467e42ffff';
/*
var p = 607;
var q = 101;
var alpha = 331;
var a = 321;
*/

var p = 7879;
var q = 101;
var alpha = 170;
var a = 75;
//console.log(power(alpha, a, p));
function sign(numb, ranK){ // k entre 1 y q
  var gamma = power(alpha, ranK, p) % q;
  var delta = (numb+a*gamma)*modInverse(ranK, q) % q;
  var arr = [];
  arr.push(gamma);
  arr.push(delta);
  return arr;
}

function verify(numb, gamma, delta){
  var e1 = numb*modInverse(delta, q);
  var e2 = gamma*modInverse(delta, q);
  var beta = power(alpha,a,p);
  return gamma==((power(alpha,e1,p)*power(beta,e2,p))%p)%q;
}

var firma = sign(215, 50);
console.log(firma);
var valido = verify(255, firma[0], firma[1]);
console.log(valido);

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
/*
[ 347, 173 ],
  [ 439, 73 ],
  [ 467, 233 ],
  [ 563, 281 ],
  [ 587, 293 ],
  [ 607, 101 ]
*/
var alpha = 4;
// p = 58907; q = 29453;
var arr = [];
var jump = 2;
for (var i = 0; i < text.length / jump; i++) {
  arr.push(Number("0x" + text.slice(i * jump, (i + 1) * jump)));
}
//console.log(arr);

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
    for (let i = 2; i <= Math.sqrt(num); i++)
    {
      if (num % i === 0) return false;
    }
    return true;
  }
  const result = [];
  for (let i = 2; i <= num; i++)
  {
    while (is_prime(i) && num % i === 0) 
    {
      if (!result.includes(i)) result.push(i);
      num /= i;
    }
  }
  return result;
}

function sieveOfEratosthenes(n) {
  var array = [];
  var prime = Array.from({ length: n + 1 }, (_, i) => true);

  for (var p = 2; p * p <= n; p++) {
    if (prime[p] == true) {
      for (var i = p * p; i <= n; i += p) prime[i] = false;
    }
  }
  for (var i = 2; i <= n; i++) {
    if (prime[i] == true && i % 4 == 3) array.push(i);
  }
  return array;
}

function gcd(a, b) {
  if (a == 0)
    return b;
  return gcd(b % a, a);
}
function genRootOfUnity(n, q) {
  var arr = [];
  for (var i = 2; i < n; i++){
    if(power(i,q,n)==1){
      arr.push(i);
    }
  }
  return arr;
}
/*
var primes = sieveOfEratosthenes(100000).slice(100);
//console.log(primes);
var result = [];
for(var i=0; i<primes.length; i++){
  var factorsPm1 = prime_factors(primes[i]-1);
  for (var j=0; j < factorsPm1.length; j++){
    if(power(factorsPm1[j],factorsPm1[j],primes[i])==1){
      result.push([primes[i], factorsPm1[j]])
    }
  } 
}
console.log(result[300]);
*/
/*
var gen = [];
var factorPm1 = prime_factors(p-1);
out:
for(var g=2; g<p-2; g++){
  for(var i=0; i<factorPm1.length; i++){
    if(power(g,(p-1)/factorPm1[i],p)==1){
      continue out;
    }
  }
  gen.push(g);
}
console.log(gen);
*/