var img = new Image();
img.src = 'tuxCrip.png';

img.onload = function () {
    draw(this);
}

function draw(img) {
    var canvas = document.getElementById('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    img.style.display = 'none';
    var imgd = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var pix = imgd.data;

    var encryptAESImg = function () {
        var start = (new Date).getTime();
        var password = strToArr(normalizeInput(document.getElementById('password').value));
        var lenKey = document.getElementById('lenKey').value;
        var iv = strToArr(normalizeInput(document.getElementById('iv').value));
        
        console.log("ENCRIPT");
        console.log("password "+password);
        console.log("lenKey "+lenKey);
        console.log("iv "+iv);
        
        //encrypt -> aesCtr
        var arr = addAlpha(encryptECB(removeAlpha(pix), password, lenKey));
        console.log('Ciphertext len. ' + arr.length);
        for (var i = 0; i < pix.length; i++) { pix[i] = arr[i]; }
        ctx.putImageData(imgd, 0, 0);
        this.value = 'Encrypt ' + ((new Date).getTime() - start) + 'ms';
    };

    var decryptAESImg = function () {
        var start = (new Date).getTime();
        var password = strToArr(normalizeInput(document.getElementById('password').value));
        var lenKey = document.getElementById('lenKey').value;
        var iv = strToArr(normalizeInput(document.getElementById('iv').value));
        
        console.log("DECRIPT");
        console.log("password "+password);
        console.log("lenKey "+lenKey);
        console.log("iv "+iv);
        
        //decrypt -> aesCtr
        var arr = addAlpha(decryptECB(removeAlpha(pix), password, lenKey));
        for (var i = 0; i < pix.length; i++) { pix[i] = arr[i]; }
        ctx.putImageData(imgd, 0, 0);
        this.value = 'Decrypt ' + ((new Date).getTime() - start) + 'ms';
    }

    var btnEnc = document.getElementById('enc');
    btnEnc.addEventListener('click', encryptAESImg);
    var btnDcr = document.getElementById('dcr');
    btnDcr.addEventListener('click', decryptAESImg);
}

function removeAlpha(pix) {
    var s = [];
    // Removes alpha to save space.
    for (var i = 0; i < pix.length; i += 4) {
        s.push(pix[i]);
        s.push(pix[i + 1]);
        s.push(pix[i + 2]);
    }
    return s;
}

function addAlpha(s) {
    var p = [];
    for (var i = 0; i < s.length; i += 3) {
        p.push(s[i]);
        p.push(s[i + 1]);
        p.push(s[i + 2]);
        p.push(255); // Hardcodes alpha to 255.
    }
    return p;
}

var encryptAESText = function () {
    var start = (new Date).getTime();
    //Normalize strings?
    var password = document.getElementById('passText').value;
    var lenKey = document.getElementById('lenKeyText').value;
    var plaintext = normalizeInput(document.getElementById('plain').value);
    //encrypt -> aesCtr
    var encrypted = arrToStr(encryptECB(strToArr(plaintext), password, lenKey));
    document.getElementById('cipher').value = encrypted;
    document.getElementById('plain').value = "";
    console.log('Ciphertext len. ' + encrypted.length);
    this.value = 'Encrypt ' + ((new Date).getTime() - start) + 'ms';
};

var decryptAESText = function () {
    var start = (new Date).getTime();
    //Normalize strings?
    var password = document.getElementById('passText').value;
    var lenKey = document.getElementById('lenKeyText').value;
    //decrypt -> aesCtr
    var plain = arrToStr(decryptECB(strToArr(document.getElementById('cipher').value), password, lenKey));
    document.getElementById('plain').value = plain;
    document.getElementById('cipher').value = "";
    this.value = 'Decrypt ' + ((new Date).getTime() - start) + 'ms';
}
// STRING MANAGEMENT
// Función que sirve para reemplazar una letra con acento con su letra original
var rmAccents = function (inputText) {
    var accents = "ÁÄáäÓÖóöÉËéÇçÍÏíïÚÜúüÑñ";
    var noAccents = "AAaaOOooEEeeCcIIiiUUuuNn";
    return inputText
        .split("")
        .map(function (chr) {
            const accentIndex = accents.indexOf(chr);
            return accentIndex !== -1 ? noAccents[accentIndex] : chr;
        })
        .join("");
};

// Función que quita todos los acentos, caracteres distintos a letras o puntos y los espacios de un texto (input)
var normalizeInput = function (inputText) {
    return rmAccents(inputText)
        .replaceAll(/[^a-zA-Z]/g, "")
        .replaceAll(" ", "")
        .toLowerCase();
};

function strToArr(str) {
    var out = new Array(str.length);
    for (var i = 0; i < out.length; i++) out[i] = str.charCodeAt(i);
    return out;
}

function arrToStr(arr) {
    var out = "";
    for (var i = 0; i < arr.length; i++) out += String.fromCharCode(arr[i]);
    return out;
}

document.getElementById('cipherBtn').addEventListener('click', encryptAESText);
document.getElementById('decipherBtn').addEventListener('click', decryptAESText);