var img = new Image();
img.src = 'panda.png';

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

    var encryptAES = function () {
        var start = (new Date).getTime();
        //Normalize strings?
        var password = document.getElementById('password').value;
        var lenKey = document.getElementById('lenKey').value;
        var s = canvasArrToString(pix);
        //encrypt -> aesCtr
        var encrypted = encrypt(s, password, lenKey);
        document.getElementById('out').value = encrypted;
        console.log('Ciphertext len. ' + encrypted.length);
        var arr = canvasStringToArr(encrypted);
        for (var i = 0; i < pix.length; i++) { pix[i] = arr[i] - 0; }
        ctx.putImageData(imgd, 0, 0);
        this.value = 'Encrypt ' + ((new Date).getTime() - start) + 'ms';
    };

    var decryptAES = function () {
        var start = (new Date).getTime();
        //Normalize strings?
        var password = document.getElementById('password').value;
        var lenKey = document.getElementById('lenKey').value;
        //decrypt -> aesCtr
        var arr = canvasStringToArr(decrypt(document.getElementById('out').value, password, lenKey));
        for (var i = 0; i < pix.length; i++) { pix[i] = arr[i] - 0; }
        ctx.putImageData(imgd, 0, 0);
        document.getElementById('out').value = "";
        this.value = 'Decrypt ' + ((new Date).getTime() - start) + 'ms';
    }

    var btnEnc = document.getElementById('enc');
    btnEnc.addEventListener('click', encryptAES);
    var btnDcr = document.getElementById('dcr');
    btnDcr.addEventListener('click', decryptAES);
}

function canvasArrToString(pix) {
    var s = "";
    // Removes alpha to save space.
    for (var i = 0; i < pix.length; i += 4) {
        s += (String.fromCharCode(pix[i])
            + String.fromCharCode(pix[i + 1])
            + String.fromCharCode(pix[i + 2]));
    }
    return s;
}

function canvasStringToArr(s) {
    var p = [];
    for (var i = 0; i < s.length; i += 3) {
        for (var j = 0; j < 3; j++) {
            p.push(s.substring(i + j, i + j + 1).charCodeAt());
        }
        p.push(255); // Hardcodes alpha to 255.
    }
    return p;
}

var encryptAESText = function () {
    var start = (new Date).getTime();
    //Normalize strings?
    var password = document.getElementById('passText').value;
    var lenKey = document.getElementById('lenKeyText').value;
    //encrypt -> aesCtr
    var encrypted = encrypt(document.getElementById('plain').value, password, lenKey);
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
    var plain = decrypt(document.getElementById('cipher').value, password, lenKey);
    document.getElementById('plain').value = plain;
    document.getElementById('cipher').value = "";
    this.value = 'Decrypt ' + ((new Date).getTime() - start) + 'ms';
}

document.getElementById('cipherBtn').addEventListener('click', encryptAESText);
document.getElementById('decipherBtn').addEventListener('click', decryptAESText);