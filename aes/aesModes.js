/* jshint node:true *//* global define, escape, unescape, btoa, atob */
'use strict';
if (typeof module != 'undefined' && module.exports) var Aes = require('./aes'); // CommonJS (Node.js)
/**
 * See http://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf
 *
 * @augments Aes
 */
/**
 * Complete 128 bit plaintext blocks for AES.
 *
 * @param   {number[]} plaintext - The password to use to generate a key.
 * @returns {number[]} complete plaintext.
 *
 */
function paddingText(plaintext) {
    var blockSize = 16;
    var pad = plaintext.length % blockSize;
    if (pad == 0) {
        return plaintext;
    } else {
        var nleft = (blockSize - pad) % blockSize;
        for (var i = 0; i < nleft; i++) plaintext.push(nleft);
        return plaintext;
    }
}
/**
 * Complete passwords for 128/192/256 bits
 *
 * @param   {number[]} password - The password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {number[]} complete key.
 *
 */
function completeKey(password, nBits) {
    if (!(nBits == 128 || nBits == 192 || nBits == 256)) return [];
    // use AES itself to encrypt password to get cipher key (using plain password as source for key
    // expansion) - gives us well encrypted key (though hashed key might be preferred for prod'n use)
    var nBytes = nBits / 8;  // no bytes in key (16/24/32)
    var pwBytes = new Array(nBytes);
    for (var i = 0; i < nBytes; i++) {  // use 1st 16/24/32 chars of password for key
        pwBytes[i] = isNaN(password[i]) ? 0 : password[i];
    }
    var key = Aes.cipher(pwBytes, Aes.keyExpansion(pwBytes)); // gives us 16-byte key
    key = key.concat(key.slice(0, nBytes - 16));  // expand key to 16/24/32 bytes long

    return key;
}


/**
 * Encrypt a text using AES encryption in Electronic Codebook Mode.
 *
 * @param   {number[]} plaintext - Source text to be encrypted.
 * @param   {number[]} password - The password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {number[]} Encrypted text.
 *
 */
function encryptECB(plaintext, password, nBits) {
    var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
    var key = completeKey(password, nBits);
    //console.log(key);
    var ciphertext = paddingText(plaintext);
    var block = new Array(blockSize);
    var cipherBlock = new Array(blockSize);
    for (var i = 0; i < ciphertext.length / blockSize; i++) {
        block = ciphertext.slice(i * blockSize, (i + 1) * blockSize);
        cipherBlock = Aes.cipher(block, Aes.keyExpansion(key));
        for (var j = 0; j < blockSize; j++) ciphertext[i * blockSize + j] = cipherBlock[j];
    }
    return ciphertext;
};
/**
 * Decrypt a text encrypted by AES in Electronic Codebook Mode.
 *
 * @param   {string} ciphertext - Source text to be encrypted.
 * @param   {string} password - Password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {string} Decrypted text
 */
function decryptECB(ciphertext, password, nBits) {
    var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
    var key = completeKey(password, nBits);
    /*
    console.log("LLAVE");
    console.log(key);
    console.log("BLOQUES");
    */
    var plaintext = paddingText(ciphertext);
    var block = new Array(blockSize);
    var cipherBlock = new Array(blockSize);
    for (var i = 0; i < plaintext.length / blockSize; i++) {
        block = plaintext.slice(i * blockSize, (i + 1) * blockSize);
        //console.log(block);
        cipherBlock = Aes.decipher(block, Aes.keyExpansion(key));
        for (var j = 0; j < blockSize; j++) plaintext[i * blockSize + j] = cipherBlock[j];
    }
    return plaintext;
};

/**
 * Encrypt a text using AES encryption in Cipher Block Chaining mode.
 *
 * @param   {number[]} plaintext - Source text to be encrypted.
 * @param   {number[]} password - The password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {number[]} Encrypted text.
 *
 */
function encryptCBC(plaintext, password, nBits, iv) {
    var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
    var key = completeKey(password, nBits);
    var iniVec = completeKey(iv, 128);
    //var iniVec = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    //console.log(iv);
    var ciphertext = paddingText(plaintext);
    var block = new Array(blockSize);
    var cipherBlock = new Array(blockSize);
    for (var i = 0; i < ciphertext.length / blockSize; i++) {
        block = ciphertext.slice(i * blockSize, (i + 1) * blockSize);
        //console.log(block);
        for (var j = 0; j < blockSize; j++) {
            block[j] ^= iniVec[j];
            //console.log(block[j] + "^" + ciphertext[(i-1)*blockSize+j]);
            //block[j] ^= ciphertext[(i - 1) * blockSize + j];
        }
        //console.log(block);
        cipherBlock = Aes.cipher(block, Aes.keyExpansion(key));
        //console.log(cipherBlock);
        for (var j = 0; j < blockSize; j++) {
            ciphertext[i * blockSize + j] = cipherBlock[j];
            iniVec[j] = ciphertext[i * blockSize + j];
        }
    }
    return ciphertext;
};

/**
 * Decrypt a text encrypted by AES in Cipher Block Chaining mode.
 *
 * @param   {string} ciphertext - Source text to be encrypted.
 * @param   {string} password - Password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {string} Decrypted text
 */
function decryptCBC(ciphertext, password, nBits, iv) {
    var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
    var key = completeKey(password, nBits);
    var iniVec = completeKey(iv, 128);
    //var iniVec = [1, 2, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 3, 2, 1];
    /*
    console.log(key);
    console.log("###################");
    console.log(iv);
    */
    var plaintext = paddingText(ciphertext);
    var block = new Array(blockSize);
    var cipherBlock = new Array(blockSize);
    for (var i = 0; i < plaintext.length / blockSize; i++) {
        //console.log(iniVec);
        block = plaintext.slice(i * blockSize, (i + 1) * blockSize);
        //console.log(block);
        cipherBlock = Aes.decipher(block, Aes.keyExpansion(key));
        //console.log(cipherBlock);
        for (var j = 0; j < blockSize; j++) {
            cipherBlock[j] ^= iniVec[j];
        }
        //console.log(cipherBlock);
        for (var j = 0; j < blockSize; j++) {
            plaintext[i * blockSize + j] = cipherBlock[j];
        }
        iniVec = block;
    }
    return plaintext;
};


/**
 * Encrypt a text using AES encryption in Output Feedback mode.
 *
 * @param   {number[]} plaintext - Source text to be encrypted.
 * @param   {number[]} password - The password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {number[]} Encrypted text.
 *
 */
function encryptOFB(plaintext, password, nBits, iv) {
    var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
    var key = completeKey(password, nBits);
    var iniVec = completeKey(iv, 128);
    var ciphertext = paddingText(plaintext);
    var block = new Array(blockSize);
    for (var i = 0; i < ciphertext.length / blockSize; i++) {
        block = ciphertext.slice(i * blockSize, (i + 1) * blockSize);
        for (var j = 0; j < blockSize; j++) {
            block[j] ^= iniVec[j];
        }
        for (var j = 0; j < blockSize; j++) {
            ciphertext[i * blockSize + j] = block[j];
        }
        iniVec = Aes.cipher(iniVec, Aes.keyExpansion(key));
    }
    return ciphertext;
};

/**
 * Decrypt a text encrypted by AES in Output Feedback mode.
 *
 * @param   {string} ciphertext - Source text to be encrypted.
 * @param   {string} password - Password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {string} Decrypted text
 */
function decryptOFB(ciphertext, password, nBits, iv) {
    return encryptOFB(ciphertext, password, nBits, iv);
};

/**
 * Encrypt a text using AES encryption in Cipher Feedback mode.
 *
 * @param   {number[]} plaintext - Source text to be encrypted.
 * @param   {number[]} password - The password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {number[]} Encrypted text.
 *
 */
function encryptCFB(plaintext, password, nBits, iv) {
    var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
    var key = completeKey(password, nBits);
    var iniVec = completeKey(iv, 128);
    //var iniVec = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    var ciphertext = paddingText(plaintext);
    var block = new Array(blockSize);
    for (var i = 0; i < ciphertext.length / blockSize; i++) {
        block = ciphertext.slice(i * blockSize, (i + 1) * blockSize);
        //console.log(block);
        //console.log(iniVec);
        iniVec = Aes.cipher(iniVec, Aes.keyExpansion(key));
        //console.log(iniVec);
        for (var j = 0; j < blockSize; j++) {
            block[j] ^= iniVec[j];
        }
        //console.log(block);
        for (var j = 0; j < blockSize; j++) {
            ciphertext[i * blockSize + j] = block[j];
            iniVec[j] = ciphertext[i * blockSize + j];
        }
    }
    //console.log("//////////////////////");
    return ciphertext;
};

/**
 * Decrypt a text encrypted by AES in Cipher Feedback mode.
 *
 * @param   {string} ciphertext - Source text to be encrypted.
 * @param   {string} password - Password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {string} Decrypted text
 */
function decryptCFB(ciphertext, password, nBits, iv) {
    var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
    var key = completeKey(password, nBits);
    var iniVec = completeKey(iv, 128);
    //var iniVec = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
    var plaintext = paddingText(ciphertext);
    var block = new Array(blockSize);
    for (var i = 0; i < plaintext.length / blockSize; i++) {
        block = plaintext.slice(i * blockSize, (i + 1) * blockSize);
        //console.log(block);
        //console.log(iniVec);
        iniVec = Aes.cipher(iniVec, Aes.keyExpansion(key));
        //console.log(iniVec);
        for (var j = 0; j < blockSize; j++) {
            block[j] ^= iniVec[j];
        }
        //console.log(block);
        for (var j = 0; j < blockSize; j++) {
            iniVec[j] = plaintext[i * blockSize + j];
            plaintext[i * blockSize + j] = block[j];
        }
    }
    //console.log("//////////////////////");
    return plaintext;
};

/**
 * Encrypt a text using AES encryption in COUNTER mode.
 *
 * @param   {number[]} plaintext - Source text to be encrypted.
 * @param   {number[]} password - The password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {number[]} Encrypted text.
 *
 */
function encryptCTR(plaintext, password, nBits, iv) {
    var blockSize = 16;  // block size fixed at 16 bytes / 128 bits (Nb=4) for AES
    var key = completeKey(password, nBits);
    var ctr = completeKey(iv, 128);
    var ciphertext = paddingText(plaintext);
    var block = new Array(blockSize);
    var cipherCtr = new Array(blockSize);
    for (var i = 0; i < ciphertext.length / blockSize; i++) {
        // Add 1 to ctr
        for (var c = 0; c < 11; c++) ctr[15 - c] = (i >>> c * 8) & 0xff;
        for (var c = 0; c < 11; c++) ctr[15 - c - 4] = (i / 0x100000000 >>> c * 8);
        block = ciphertext.slice(i * blockSize, (i + 1) * blockSize);
        cipherCtr = Aes.cipher(ctr, Aes.keyExpansion(key));
        for (var j = 0; j < blockSize; j++) {
            block[j] ^= cipherCtr[j];
        }
        for (var j = 0; j < blockSize; j++) {
            ciphertext[i * blockSize + j] = block[j];
        }
    }
    return ciphertext;
};

/**
 * Decrypt a text encrypted by AES in COUNTER mode.
 *
 * @param   {string} ciphertext - Source text to be encrypted.
 * @param   {string} password - Password to use to generate a key.
 * @param   {number} nBits - Number of bits to be used in the key; 128 / 192 / 256.
 * @returns {string} Decrypted text
 */
function decryptCTR(ciphertext, password, nBits, iv) {
    return encryptCTR(ciphertext, password, nBits, iv);
};

//var pp = encryptCTR([255, 254, 253, 252, 0, 250, 0, 1, 2, 50, 100, 43, 36, 33, 56, 43, 23, 15], [1, 2, 3, 4], 128, [1, 2, 3, 4]);
//console.log(pp);
//console.log(decryptCTR(pp, [1, 2, 3, 4], 128, [1, 2, 3, 4]));
