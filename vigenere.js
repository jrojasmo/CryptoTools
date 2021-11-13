function vigenere(clearText, key, cipher){
    var normalTextCodes = getCharCodes(normalizeInput(clearText));
    var normalKeyCodes = getCharCodes(normalizeInput(key));
    var m = normalKeyCodes.length;
    var indexKey = 0;
    for (i=0; i<normalTextCodes.length; i++){
        indexKey = i%m;
        if (cipher)
            normalTextCodes[i] = (normalTextCodes[i] + normalKeyCodes[indexKey]) % 26;
        else
            normalTextCodes[i] = (normalTextCodes[i] - normalKeyCodes[indexKey]) % 26;
    }
    return codesToString(normalTextCodes);
}

function vigenereCipher(clearText, key){
    return vigenere(clearText, key, true);
}

function vigenereDecipher(cipherText, key){
    return vigenere(cipherText, key, false);
}

//console.log(vigenereCipher(  "wecannotunderstandthistopic", "julia"));
//console.log(vigenereDecipher("fyninwiecnmycatjhobhrmewprw", "julia"));

function charFrecuency(text){
    text = normalizeInput(text);
    var frecuencyMap = { 'a':0, 'b':0, 'c':0, 'd':0, 'e':0, 'f':0, 'g':0, 'h':0, 
                         'i':0, 'j':0, 'k':0, 'l':0, 'm':0, 'n':0, 'o':0, 'p':0, 
                         'q':0, 'r':0, 's':0, 't':0, 'u':0, 'v':0, 'w':0, 'x':0, 'y':0, 'z':0};
    for (i=0; i<text.length; i++){
        frecuencyArr[text.charAt(i)] += 1/text.length;
    }
    return frecuencyMap;
}

//console.log(charFrecuency("fyninwiecnmycatjhobhrmewprw"));

function ranKey(size){
    arrTemp = Array(size).fill().map(() => Math.round(Math.random() * 25));
    return codesToString(arrTemp);
}

//console.log(ranKey(10));