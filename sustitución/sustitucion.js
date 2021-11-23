// Si no se da una Key el progarama asigna una automáticamente, por ejemplo:  'a','s','o','h','b','i','e','y',... (El alfabeto desordenado)

const plaintext = "this is a plaintext"; // INPUT TEXTO PLANO          ---------------------INPUT1---------------------------
let key_substitution = ""; // INPUT KEY (No Necesaria)     ---------------------INPUT2---------------------------
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const arr_plaintext = plaintext.split(""); /// Array texto plano
const fs = require("fs");
var array = fs.readFileSync("english_quadgrams.txt").toString().split("\n");
const quadGramMap = new Map();
var quadNumber = 0;
for (i in array) {
    var temp = array[i].split(" ");
    temp[0] = temp[0].toLowerCase();
    if (temp.length == 2 && temp[1].length > 0) {
        quadNumber = quadNumber + parseInt(temp[1]);
        quadGramMap.set(temp[0], parseInt(temp[1]));
    }
}
function verification_key(key_substitution) {
    if (key_substitution == "") {
        let alphabet_arr = "abcdefghijklmnopqrstuvwxyz".split("");
        let key_cipher = alphabet_arr.sort(function () {
            return Math.random() - 0.5;
        }); // Array alphabeto deordenado "KEY ALEATORIA"
        return key_cipher;
    } else {
        let key_substitution_arr = key_substitution.split("");
        alphabet_key_arrset = new Set(key_substitution_arr);
        if (alphabet_key_arrset.length === 26) {
            let key_cipher = alphabet_key_arrset;
            return key_cipher;
        } else {
            console.log(
                "La Key corresponde a una clave de cifrado por sustitución"
            );
        }
    }
}
function cipher(arr_plaintext, alphabet, alphabet_key) {
    // FUNCION QUE CIFRA ----- ENTRADAS: (TEXTO PLANO - ALFABETO - KEY) ----- SALIDA: (TEXTO CIFRADO)
    var ciphertext_array = [];
    //console.log(alphabet_key);
    for (let i in arr_plaintext) {
        if (arr_plaintext[i] != " ") {
            let ind = alphabet.indexOf(arr_plaintext[i]);
            ciphertext_array.push(alphabet_key[ind]);
        }
    }
    const ciphertext = ciphertext_array.join("").toUpperCase();
    return ciphertext; // Retorna texto cifrado ---STRING---
}
function decipher_with_key(ciphertext, alphabet, alphabet_key) {
    // FUNCION QUE DECIFRA ----- ENTRADAS: (TEXTO CIFRADO - ALFABETO - KEY) ----- SALIDA: (TEXTO DECIFRADO)
    ciphertext = ciphertext.toLowerCase();
    arr_ciphertext = ciphertext.split("");
    let deciphertext_array = [];
    for (i in arr_ciphertext) {
        var ind = alphabet_key.indexOf(arr_ciphertext[i]);
        deciphertext_array.push(alphabet[ind]);
    }
    const deciphertext = deciphertext_array.join("");
    return deciphertext; // Retorna texto decifrado ---STRING---
}

function sustitutionCryptanalysis(ciphertext) {
    if (ciphertext.length <= 100) {
        console.log(
            "La longitud del texto cifrado no es lo suficientemente larga para realizar un buen criptoanálisis"
        );
        return;
    }
    ciphertext = ciphertext.toLowerCase();
    var key = verification_key("");
    var max_key = key.slice();
    var count = 0;
    var max_score = -999999;
    var max_iter = 100000;
    while (max_iter > 0) {
        var score = fitness(ciphertext, key);
        while (count < 1000) {
            a = Math.floor(Math.random() * 26);
            b = Math.floor(Math.random() * 26);
            child = key.slice();
            //swap two characters in the child
            var temp = child[a];
            child[a] = child[b];
            child[b] = temp;
            var scoreT = fitness(ciphertext, child);
            //console.log(scoreT);
            if (scoreT > score) {
                score = scoreT;
                key = child;
                count = 0;
            }
            count = count + 1;
        }
        if (score > max_score) {
            max_score = score;
            max_key = key;
        }
        --max_iter;
    }
    //console.log(max_score);
    console.log(decipher_with_key(ciphertext, alphabet, max_key));
}
function fitness(text, key) {
    var copy = (" " + text).slice(1);
    var clearText = decipher_with_key(copy, alphabet, key);
    var quadClear = quadGrams(clearText);
    var coincidences = 0;
    for (var i = 0; i < quadClear.length; ++i) {
        var quad = quadClear[i];
        if (quadGramMap.get(quad) != undefined) {
            coincidences =
                coincidences + Math.log(quadGramMap.get(quad) / quadNumber);
        } else {
            coincidences = coincidences - 1000;
        }
    }
    return coincidences;
}
function quadGrams(text) {
    var array = [];
    for (var i = 0; i < text.length - 3; i++) {
        var copy = (" " + text).slice(1);
        array.push(copy.slice(i, i + 4));
    }
    return array;
}
//console.log(alphabet);
const key_system = verification_key(key_substitution);

//console.log(cipher(arr_plaintext, alphabet, key_system));

var text =
    "SOWFBRKAWFCZFSBSCSBQITBKOWLBFXTBKOWLSOXSOXFZWWIBICFWUQLRXINOCIJLWJFQUNWXLFBSZXFBTXAANTQIFBFSFQUFCZFSBSCSBIMWHWLNKAXBISWGSTOXLXTSWLUQLXJBUUWLWISTBKOWLSWGSTOXLXTSWLBSJBUUWLFULQRTXWFXLTBKOWLBISOXSSOWTBKOWLXAKOXZWSBFIQSFBRKANSOWXAKOXZWSFOBUSWJBSBFTQRKAWSWANECRZAWJ";
sustitutionCryptanalysis(text);
//console.log(decipher_with_key(ciphertext, alphabet, key_system));
