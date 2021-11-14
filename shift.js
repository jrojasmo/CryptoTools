var tools = require("./generalTools");

function shiftCipher(clearText, key) {
    var size = 26;
    if (key <= size - 1 && key >= 0) {
        var normalTextCodes = tools.getCharCodes(
            tools.normalizeInput(clearText),
            false
        );
        for (var i = 0; i < normalTextCodes.length; i++) {
            normalTextCodes[i] = (normalTextCodes[i] + key) % size;
        }
        return tools.codesToString(normalTextCodes, true);
    }
    return "Invalid key.";
}

function shiftDecipher(cipherText, key) {
    var size = 26;
    if (key <= size - 1 && key >= 0) {
        return shiftCipher(cipherText, (size - key) % size);
    }
    return "Invalid key.";
}

function getAllDeciphers(cipherText) {
    var size = 26;
    var deciphers = [];
    for (var i = 0; i < size; i++) {
        var array = [];
        var copy = (" " + cipherText).slice(1);
        array.push(i);
        array.push(shiftDecipher(copy, i));
        deciphers.push(array);
    }
    return deciphers;
}

/*var array = getAllDeciphers("abcfsdjhfg");
for (var i = 0; i < 26; i++) {
    console.log(array[i]);
}*/

/*console.log(
    shiftDecipher(
        shiftCipher("riagoalstrneauriaptlaeuniribteroennpueaebdherlsmos", 10),
        10
    )
);*/
