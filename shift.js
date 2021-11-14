var tools = require('./generalTools');

function shiftCipher(clearText, key){
    var size = 26;
    if (key <= size - 1 && key >= 0){
        var normalTextCodes = tools.getCharCodes(tools.normalizeInput(clearText), false);
        for (i=0; i<normalTextCodes.length; i++){
            normalTextCodes[i] = (normalTextCodes[i] + key) % size;
        }
        return tools.codesToString(normalTextCodes, true);
    }
    return "Invalid key.";
}

function shiftDecipher(cipherText, key){
    var size = 26;
    if (key <= size - 1 && key >= 0){
        return shiftCipher(cipherText, ((size - key) % size));
    }
    return "Invalid key.";
}
//console.log(shiftDecipher(shiftCipher("riagoalstrneauriaptlaeuniribteroennpueaebdherlsmos",10),10));