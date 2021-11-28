// Si no se da una Key el progarama asigna una automáticamente, por ejemplo:  'a','s','o','h','b','i','e','y',... (El alfabeto desordenado)

const plaintext = "this is a plaintext"; // INPUT TEXTO PLANO          ---------------------INPUT1---------------------------
let key_substitution = ""; // INPUT KEY (No Necesaria)     ---------------------INPUT2---------------------------
const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
const arr_plaintext = plaintext.split(""); /// Array texto plano
const fs = require("fs");
const quadGramMap = new Map();
const triGramMap = new Map();
const biGramMap = new Map();
const monoGramMap = new Map();
var quadNumber = 0;
var triNumber = 0;
var biNumber = 0;
var monoNumber = 0;
{
    var array = fs.readFileSync("english_quadgrams.txt").toString().split("\n");
    for (i in array) {
        var temp = array[i].split(" ");
        temp[0] = temp[0].toLowerCase();
        if (temp.length == 2 && temp[1].length > 0) {
            quadNumber = quadNumber + parseInt(temp[1]);
            quadGramMap.set(temp[0], parseInt(temp[1]));
        }
    }
}
{
    var array = fs.readFileSync("english_trigrams.txt").toString().split("\n");
    for (i in array) {
        var temp = array[i].split(" ");
        temp[0] = temp[0].toLowerCase();
        if (temp.length == 2 && temp[1].length > 0) {
            triNumber = triNumber + parseInt(temp[1]);
            triGramMap.set(temp[0], parseInt(temp[1]));
        }
    }
}
{
    var array = fs.readFileSync("english_digrams.txt").toString().split("\n");
    for (i in array) {
        var temp = array[i].split(" ");
        temp[0] = temp[0].toLowerCase();
        if (temp.length == 2 && temp[1].length > 0) {
            biNumber = biNumber + parseInt(temp[1]);
            biGramMap.set(temp[0], parseInt(temp[1]));
        }
    }
}
{
    var array = fs.readFileSync("english_monograms.txt").toString().split("\n");
    for (i in array) {
        var temp = array[i].split(" ");
        temp[0] = temp[0].toLowerCase();
        if (temp.length == 2 && temp[1].length > 0) {
            monoNumber = monoNumber + parseInt(temp[1]);
            monoGramMap.set(temp[0], parseInt(temp[1]));
        }
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

function getFrequencies(ciphertext) {
    ciphertext = ciphertext.toLowerCase();
    var map = new Map();
    var frequencyArr = [];
    for (var j = 1; j < 4; ++j) {
        map = new Map();
        var array = [];
        for (var i = 0; i < ciphertext.length - j + 1; i++) {
            var copy = (" " + ciphertext).slice(1);
            var substring = copy.slice(i, i + j);
            if (map.get(substring) != undefined) {
                array[map.get(substring)][1]++;
            } else {
                array.push([substring, parseInt(1)]);
                map.set(substring, array.length - 1);
            }
        }
        array.sort(function (a, b) {
            if (a[1] == b[1]) {
                return a[0].localeCompare(b[0]);
            } else {
                return b[1] - a[1];
            }
        });
        frequencyArr.push(array);
    }
    return frequencyArr;
}

function sustitutionCryptanalysis(ciphertext, numberOfTexts = 10) {
    if (ciphertext.length <= 25) {
        console.log(
            "La longitud del texto cifrado no es lo suficientemente larga para realizar un buen criptoanálisis"
        );
        return;
    }
    ciphertext = ciphertext.toLowerCase();
    var tries = 1;
    while (tries <= numberOfTexts) {
        var key = verification_key("");
        var max_key = key.slice();
        var count = 0;
        var max_score = -999999;
        var max_iter = 1000;
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
        console.log("Max score for the try", tries, ":", max_score);
        console.log("Key with max score: ", max_key);
        console.log(
            "Undeciphered text: ",
            decipher_with_key(ciphertext, alphabet, max_key)
        );
        ++tries;
    }
}
function quadGrams(text) {
    var array = [];
    for (var i = 0; i < text.length - 3; i++) {
        var copy = (" " + text).slice(1);
        array.push(copy.slice(i, i + 4));
    }
    return array;
}
function triGrams(text) {
    var array = [];
    for (var i = 0; i < text.length - 2; i++) {
        var copy = (" " + text).slice(1);
        array.push(copy.slice(i, i + 3));
    }
    return array;
}
function biGrams(text) {
    var array = [];
    for (var i = 0; i < text.length - 1; i++) {
        var copy = (" " + text).slice(1);
        array.push(copy.slice(i, i + 2));
    }
    return array;
}
function monoGrams(text) {
    var array = [];
    for (var i = 0; i < text.length; i++) {
        var copy = (" " + text).slice(1);
        array.push(copy.slice(i, i + 1));
    }
    return array;
}
function fitness(text, key) {
    var copy = (" " + text).slice(1);
    var clearText = decipher_with_key(copy, alphabet, key);
    var quadClear = quadGrams(clearText);
    var triClear = triGrams(clearText);
    var biClear = biGrams(clearText);
    var monoClear = monoGrams(clearText);
    var score = 0;
    for (var i = 0; i < monoClear.length; ++i) {
        var gram = monoClear[i];
        if (monoGramMap.get(gram) != undefined) {
            score = score + Math.log(monoGramMap.get(gram) / monoNumber);
        }
    }
    for (var i = 0; i < biClear.length; ++i) {
        var gram = biClear[i];
        if (biGramMap.get(gram) != undefined) {
            score = score + Math.log(biGramMap.get(gram) / biNumber);
        } else {
            score = score - 1000;
        }
    }
    for (var i = 0; i < triClear.length; ++i) {
        var gram = triClear[i];
        if (triGramMap.get(gram) != undefined) {
            score = score + Math.log(triGramMap.get(gram) / triNumber);
        } else {
            score = score - 100;
        }
    }
    for (var i = 0; i < quadClear.length; ++i) {
        var gram = quadClear[i];
        if (quadGramMap.get(gram) != undefined) {
            score = score + Math.log(quadGramMap.get(gram) / quadNumber);
        } else {
            score = score - 10;
        }
    }
    return score;
}
//console.log(alphabet);
const key_system = verification_key(key_substitution);

//console.log(cipher(arr_plaintext, alphabet, key_system));

var text =
    "SOWFBRKAWFCZFSBSCSBQITBKOWLBFXTBKOWLSOXSOXFZWWIBICFWUQLRXINOCIJLWJFQUNWXLFBSZXFBTXAANTQIFBFSFQUFCZFSBSCSBIMWHWLNKAXBISWGSTOXLXTSWLUQLXJBUUWLWISTBKOWLSWGSTOXLXTSWLBSJBUUWLFULQRTXWFXLTBKOWLBISOXSSOWTBKOWLXAKOXZWSBFIQSFBRKANSOWXAKOXZWSFOBUSWJBSBFTQRKAWSWANECRZAWJ";

//sustitutionCryptanalysis(text, 10);
console.log(getFrequencies(text));
//console.log(decipher_with_key(ciphertext, alphabet, key_system));
