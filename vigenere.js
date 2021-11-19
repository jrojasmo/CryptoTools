var tools = require("./generalTools");

function vigenere(clearText, key, cipher) {
    var normalTextCodes = tools.getCharCodes(tools.normalizeInput(clearText));
    var normalKeyCodes = tools.getCharCodes(tools.normalizeInput(key));
    var m = normalKeyCodes.length;
    var indexKey = 0;
    for (var i = 0; i < normalTextCodes.length; i++) {
        indexKey = i % m;
        if (cipher)
            normalTextCodes[i] =
                (normalTextCodes[i] + normalKeyCodes[indexKey]) % 26;
        else
            normalTextCodes[i] =
                (normalTextCodes[i] - normalKeyCodes[indexKey] + 26) % 26;
    }
    return tools.codesToString(normalTextCodes);
}

function vigenereCipher(clearText, key) {
    return vigenere(clearText, key, true);
}

function vigenereDecipher(cipherText, key) {
    return vigenere(cipherText, key, false);
}

//console.log(vigenereCipher(  "Una poderosa voluntad, una gloria grandiosa son tu herencia para toda la eternidad", "ussr"));
/*
console.log(
    vigenereDecipher(
        "ofsgivwiiksmidmensvlhsycijarajsexagjukgenmzvlwftcshrlslfxsdrylwihavrx",
        "ussr"
    )
);
*/

function charFrecuency(text, lenChar) {
    text = tools.normalizeInput(text);
    var frecuencyMap = {};
    for (var i = 0; i < text.length - (lenChar - 1); i++) {
        if  (frecuencyMap[text.substring(i, i + lenChar)])
            frecuencyMap[text.substring(i, i + lenChar)] += 1 / (text.length - (lenChar - 1));
        else
            frecuencyMap[text.substring(i, i + lenChar)] = 1 / (text.length - (lenChar - 1));
    }
    return frecuencyMap;
}

console.log(
    charFrecuency(
        "ofsgivwiiksmidmensvlhsycijarajsexagjukgenmzvlwftcshrlslfxsdrylwihavrx",
        2
    )
);

function ranKey(size) {
    arrTemp = Array(size)
        .fill()
        .map(() => Math.round(Math.random() * 25));
    return tools.codesToString(arrTemp);
}

//console.log(ranKey(10));
