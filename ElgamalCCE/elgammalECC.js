function Elliptic_Curve(a, b, p) {
    // were  a,b \in N : y^2 = x^3 + ax + b mod p
    array_points = [];
    for (let x = 0; x < p; x++) {
        y_2 = ((x * x * x) + (a * (x)) + b) % p;
        for (let i = 0; i < 10; i++) {
            sqrt_y = Math.sqrt(y_2);
            if (sqrt_y - Math.floor(sqrt_y) == 0) {
                array_points.push([x, sqrt_y])
            }
            y_2 += p;
        }
    }
    console.log("array points ECC", array_points);
    return array_points;
}
function verification_neg_mod(n, p) {
    // negative numbers to positive number in Z_p
    while (n < 0) {
        n = n + p;
    }
    return n % p
}
function getRandomInt(min, max) {
    // random int in (min, max)
    return Math.floor(Math.random() * (max - min)) + min;
}
function private_key_a(prime) {
    // Alice or Bob take a random key in [1,p-1]
    priv_key_a = getRandomInt(1, prime - 1);
    // console.log(priv_key_a);
    return priv_key_a;
}
function point_doubling(alpha, a_ecuation, p) {
    // compute 2P where P is a point in EC
    x1 = alpha[0];
    y1 = alpha[1];
    lambda = ((((3 * x1 * x1) + a_ecuation) % p) * modInverse((2 * y1) % p, p)) % p;
    // console.log("x1,y1,lambda",x1,y1,lambda);
    // console.log((2*y1)%p);
    x2 = verification_neg_mod((lambda * lambda) - (2 * x1), p);
    y2 = verification_neg_mod((((x1 - x2) * lambda) - y1), p);
    doubling = [x2, y2];
    // console.log('doubling =', doubling);
    return doubling
}
function a_and_p_product(alpha, escalar, a_ecuation, p) {
    // Compute the public key (beta) with private key and point in ECC
    // return beta (array size 2)
    original_point = alpha
    //console.log("daaaat",alpha,escalar,a_ecuation,p);
    bin_esc = escalar.toString(2).split('');
    //console.log("bin_esc",bin_esc)
    alpha_array = [];
    for (let i = 0; i < bin_esc.length; i++) { // length of bin
        pot = Math.pow(2, bin_esc.length - i - 1)
        if (bin_esc[i] == '1') { // if bin == 1
            //console.log("pot",pot);
            alpha = original_point;
            for (let j = 0; j < bin_esc.length - i - 1; j++) {
                //console.log("ROUNDS ALPHA", alpha) ;  
                if (i == bin_esc.length - 1) {
                    alpha = original_point;
                }
                else {
                    PP = point_doubling(alpha, a_ecuation, p);
                    //console.log("PP",PP);
                    alpha = PP;
                }

            }
            alpha_array.unshift(alpha);
            // console.log("alpha array",alpha_array);                                       
        }
    }
    for (let k = 0; k < alpha_array.length - 1; k++) {
        sum_p_a = sum_P_Q(alpha_array[k + 1], alpha_array[k], p);
        //console.log("SUM",sum_p_a);
        alpha_array[k + 1] = sum_p_a;
    }
    //console.log("SOLUTION",alpha_array[alpha_array.length-1]);
    return alpha_array[alpha_array.length - 1];
}
function plaintext_2_array(plain_t) {
    // 1 Plaintext to array numbers x char
    array_plain = [];
    for (let i = 0; i < plain_t.length; i++) {
        var ascii_p = plain_t.charCodeAt(i);
        ascii_p = ascii_p.toString(16);
        array_plain.push([parseInt(ascii_p[0], 16), parseInt(ascii_p[1], 16)]);
    }
    //console.log("array",array_plain);
    return array_plain;
}
function array_decipher_2_pt(array_decipher) {
    // 1 array_decifer in decimal pair to string
    array_ascii_decipher = [];
    for (let i = 0; i < array_decipher.length; i++) {
        pair = array_decipher[i];
        pair_hexa = [pair[0].toString(16), pair[1].toString(16)];
        hexa_decipher = pair_hexa.join('');
        Char_Ascci = String.fromCharCode(parseInt(hexa_decipher, 16));
        array_ascii_decipher.push(Char_Ascci);
    }
    plain_text_decipher = array_ascii_decipher.join('');
    return plain_text_decipher;
}

function generateKey(primeNumber, primeArray, min) {
    var p;
    var minPrime = min;
    p = primeArray[Math.floor(Math.random() * primeNumber)];
    while (p <= minPrime) {
        p = primeArray[Math.floor(Math.random() * primeNumber)];
    }
    return p;
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


// Function to return gcd of a and b
function gcd(a, b) {
    if (a == 0)
        return b;
    return gcd(b % a, a);
}

// Print generators of n
function printGenerators(n) {
    // 1 is always a generator
    console.log("1 ");
    for (var i = 2; i < n; i++)
        // A number x is generator of
        // GCD is 1
        if (gcd(i, n) == 1)
            console.log(i + " ");
}
// var n = 29;
// printGenerators(n);

function sum_P_Q(point1, point2, p) {
    // compute P+Q were P and Q are points in EC
    x1s = point1[0];
    y1s = point1[1];
    x2s = point2[0];
    y2s = point2[1];
    lambda_sum = (verification_neg_mod((y2s - y1s), p) * (verification_neg_mod(modInverse(x2s - x1s, p), p))) % p;
    x3s = verification_neg_mod(((lambda_sum * lambda_sum) - x1s - x2s), p);
    y3s = verification_neg_mod(((lambda_sum * (x1s - x3s)) - y1s), p);
    point3 = [x3s, y3s];
    return point3;
}

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
function inv_aditive(point, p) {
    //compute the aditive inverse of point mod p
    point = [(point[0]), verification_neg_mod(-point[1], p)];
    return point
}

function discrete_log(point1_a, point2_a, a, p) {
    // find the discrete logarithm
    product = [];
    for (let i = 1; i < 16; i++) {
        sol_discret = i;
        product = a_and_p_product(point2_a, sol_discret, a, p);
        if (((point1_a[0] - product[0]) === 0) && ((point1_a[1] - product[1]) === 0)) {
            solution_discrete_log = i;
        }
    }
    // -------------------------------------------------
    return solution_discrete_log;
}




function Elgamal_ECC_cipher(plainText, a, b, p, kPrivBob) {
    // var primeArray = sieveOfEratosthenes(p-1);
    // var primeNumber = primeArray.length;
    var Plain_text_array = plaintext_2_array(plainText);
    var ECC_array = Elliptic_Curve(a, b, p);  // a,b,p : ((y^2 = x^3 + ax + b) mod p), return array of points in ECC
    var alpha = ECC_array[0];
    var random_K = 13; // random K of text
    var betaBob = a_and_p_product(alpha, kPrivBob, a, p);
    array_char_ciphers = [];
    for (let i = 0; i < Plain_text_array.length; i++) {
        d_1 = Plain_text_array[i][0];
        d_2 = Plain_text_array[i][1];
        P_1 = a_and_p_product(alpha, d_1, a, p);
        P_2 = a_and_p_product(alpha, d_2, a, p);
        //console.log("Pes",P_1,P_2);
        K_c = a_and_p_product(betaBob, random_K, a, p);
        //console.log("KK",K_c); 
        C_1 = sum_P_Q(P_1, K_c, p);
        C_2 = sum_P_Q(P_2, K_c, p);
        //console.log("Cs",C_1,C_2);
        array_char_ciphers.push([C_1, C_2])
    }
    console.log("Cipher : ", array_char_ciphers);
    return array_char_ciphers;
}

function Elgamal_ECC_decipher(Cipher_text_array, a, b, p, kPrivBob) {
    var ECC_array = Elliptic_Curve(a, b, p);  // a,b,p : ((y^2 = x^3 + ax + b) mod p), return array of points in ECC
    var alpha = ECC_array[0];
    var array_char_deciphers = [];
    var random_K = 13; // random K of text
    var y_0 = a_and_p_product(alpha, random_K, a, p);
    K_c2 = a_and_p_product(y_0, kPrivBob, a, p);
    //console.log(K_c2);
    for (let i = 0; i < Cipher_text_array.length; i++) {
        P_1p = sum_P_Q(Cipher_text_array[i][0], inv_aditive(K_c2, p), p);
        P_2p = sum_P_Q(Cipher_text_array[i][1], inv_aditive(K_c2, p), p);
        //console.log("PES_2",P_1p,P_2p);
        D_1 = discrete_log(P_1p, alpha, a, p);
        D_2 = discrete_log(P_2p, alpha, a, p);
        //console.log("des",D_1,D_2);
        char = [D_1, D_2];
        array_char_deciphers.push(char);
    }
    console.log("array char", array_char_deciphers);
    plaintext_sol = array_decipher_2_pt(array_char_deciphers);
    console.log("Decipher : ", plaintext_sol);
    return plaintext_sol;
}


// ------------------------------------------------- INPUTS -------------------------------------------------------------------------
var primeArrayz = sieveOfEratosthenes(100000);
var primeNumberz = primeArrayz.length;

function generateRandomInt(max) {
    return Math.floor(Math.random() * max) + 1;
}

function generateParams() {
    var arr = [];
    //Primo
    var prime_z = generateKey(primeNumberz, primeArrayz, 300);
    //a
    var a = getRandomInt(2, 300);
    //b
    var b = getRandomInt(2, 300);
    //k
    var primeArray = sieveOfEratosthenes(prime_z - 1);
    var primeNumber = primeArray.length;
    var kPriv = generateKey(primeNumber, primeArray, 300); // private key for Alice or Bob

    arr.push(a);
    arr.push(b);
    arr.push(prime_z);
    arr.push(kPriv);

    return arr;
}

//--------------------------------------------- Cipher & Decipher ------------------------------------------------------------------ 

var params = generateParams();
//var params = [194, 198, 5039, 743];
//Normalize Input
list_cipher = Elgamal_ECC_cipher("hola", params[0], params[1], params[2], params[3]);
// Curva Elíptica: a, b, primo
// Punto Base (alpha) (Interno)
// K_of_priv_key_bob


Elgamal_ECC_decipher(list_cipher, params[0], params[1], params[2], params[3]);
// Curva Elíptica: a, b, primo
// Punto Base (alpha) (Interno)
// K_of_priv_key_bob
