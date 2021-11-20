// Importar funciones de generalTools.
const { normalizeInput, codesToString } = require("./generalTools");
var tools = require("./generalTools");

// Función que cifra con un permutación (permutation) un texto (clearText).
// La permutación es un arreglo que guarda en la i-ésima posición el lugar a dónde permuta la letra.
// Fue necesario rellenar con 'x' el texto al final para que la longitud fuera un múltiplo del tamaño de la permutación y así
// no perder información al final del texto.
function permutationCipher(clearText, permutation) {
    if (isAValidPermutation(permutation)) {
        var normalTextCodes = tools.getCharCodes(
            tools.normalizeInput(clearText)
        );
        var m = permutation.length;
        var indexPerm = 0;
        var auxList;
        for (var i = 0; i < normalTextCodes.length; i++) {
            indexPerm = i % m;
            if (indexPerm == 0) {
                auxList = normalTextCodes.slice(i, i + m);
                while (auxList.length < m) {
                    auxList.push(23);
                    normalTextCodes.push(23);
                }
            }
            normalTextCodes[i] = auxList[permutation.indexOf(indexPerm + 1)];
        }
        return tools.codesToString(normalTextCodes);
    }
    return "Invalid permutation.";
}

// Función que decifra un texto cifrado (cipherText) con una permutación, sabiendo la permutación inversa (si inversePerm=true)
// o dada la permutación original se calcula su inversa para poder decifrar.
function permutationDecipher(cipherText, permutation, inversePerm=false) {
    if (inversePerm) {
        return permutationCipher(cipherText, permutation);
    } else {
        var permutationInv = new Array();
        for (i = 0; i < permutation.length; i++) {
            permutationInv[permutation[i] - 1] = i + 1;
        }
        return permutationCipher(cipherText, permutationInv);
    }
}

// Función que revisa si una permutación es válida o no.
function isAValidPermutation(permutation) {
    var dupMap = {};
    for (var i = 0; i < permutation.length; i++) {
        if (permutation[i] < 1 || permutation[i] > permutation.length)
            return false;
        // Verificar duplicados.
        if (dupMap[permutation[i]]) return false;
        dupMap[permutation[i]] = true;
    }
    return true;
}

// Ejemplo para permutationCipher y permutationDecipher
/* console.log(
    permutationCipher(
        `I have a dream that my four little children will one day 
        live in a nation where they will not be judged by the color 
        of their skin but by the content of their character`, 
        [8, 4, 6, 7, 2, 5, 3, 1]
    )
);
console.log(
    permutationDecipher(
        `redhaavimhtaamtetriflouydhlliectoilelnwrvyieldanintianaet
        eenrwhonilelywhgjdtubeoctedhbyehotlforobkniirsectethbyufno
        ntteoarhhceitxexarctr`,
        [8, 4, 6, 7, 2, 5, 3, 1]
    )
); */

// Función que retorna una permutación aleatoria de tamaño (size).
function ranPermutation(size) {
    var arr = new Array(size);
    for (var i = 0; i < arr.length; i++) arr[i] = i + 1;
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

// Función que retorna las posibles longitudes de la permutación de un texto (strText) cifrado
function getAllPermutationLen(strText) {
    var n = tools.normalizeInput(strText).length;
    var divisors = [n];
    if (n==1) {
        return divisors.push(1);
    }
    for (var i = 2; i * i <= n; ++i){
        if (n % i == 0) {
            divisors.push(i);
            if (i != n / i) 
                divisors.push(n / i);
        }
    }
    return divisors;
}

console.log(
    getAllPermutationLen(
        `redhaavimhtaamtetriflouydhlliectoilelnwrvyieldanintianaet
        eenrwhonilelywhgjdtubeoctedhbyehotlforobkniirsectethbyufno
        ntteoarhhceitxexarctr`
    )
);