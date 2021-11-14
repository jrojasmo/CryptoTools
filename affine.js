var tools = require("./generalTools");

function gcd(a, b) {
    if (b == 0) return a;
    return gcd(b, a % b);
}

function findInverseModSize(a, size) {
    var b = 1;
    while (b <= size - 1) {
        if ((a * b) % size == 1) return b;
        ++b;
    }
    return b;
}

function affineCipher(clearText, key) {
    var size = 26;
    if (
        key[1] <= size - 1 &&
        key[1] >= 0 &&
        key[0] <= size - 1 &&
        key[0] >= 0 &&
        gcd(size, key[0]) == 1
    ) {
        var normalTextCodes = tools.getCharCodes(
            tools.normalizeInput(clearText),
            false
        );
        for (i = 0; i < normalTextCodes.length; i++) {
            normalTextCodes[i] = (normalTextCodes[i] * key[0] + key[1]) % size;
        }
        return tools.codesToString(normalTextCodes, true);
    }
    return "Invalid key.";
}

function affineDecipher(cipherText, key) {
    var size = 26;
    if (
        key[1] <= size - 1 &&
        key[1] >= 0 &&
        key[0] <= size - 1 &&
        key[0] >= 0 &&
        gcd(size, key[0]) == 1
    ) {
        var newKey = [...key];
        newKey[0] = findInverseModSize(key[0], size);
        newKey[1] = (size - ((key[1] * newKey[0]) % 26)) % size;
        return affineCipher(cipherText, newKey);
    }
    return "Invalid key.";
}

function getAllDeciphers(cipherText) {
    var size = 26;
    var deciphers = [];

    for (var i = 0; i < size; i++) {
        if (gcd(26, i) == 1) {
            for (var j = 0; j < size; j++) {
                var array = [];
                var copy = (" " + cipherText).slice(1);
                array.push([i, j]);
                array.push(affineDecipher(copy, array[0]));
                deciphers.push(array);
            }
        }
    }
    return deciphers;
}
//console.log(getAllDeciphers("sdfaaferfer"));
//console.log(affineDecipher("zymddmfsmfs",[7,3]));
