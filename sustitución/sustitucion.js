
// Si no se da una Key el progarama asigna una automáticamente, por ejemplo:  'a','s','o','h','b','i','e','y',... (El alfabeto desordenado)

const plaintext = 'this is a plaintext'; // INPUT TEXTO PLANO          ---------------------INPUT1---------------------------
let key_substitution = '';             // INPUT KEY (No Necesaria)     ---------------------INPUT2---------------------------
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
const arr_plaintext = plaintext.split(''); /// Array texto plano

function verification_key(key_substitution){
    if (key_substitution == ''){
        let alphabet_arr = 'abcdefghijklmnopqrstuvwxyz'.split('');
        let key_cipher = alphabet_arr.sort(function(){ return Math.random() - 0.5 }); // Array alphabeto deordenado "KEY ALEATORIA"
        return key_cipher;
    }
    else{
        let key_substitution_arr = key_substitution.split('');
        alphabet_key_arrset = new Set(key_substitution_arr);
        if (alphabet_key_arrset.length === 26){
            let key_cipher = alphabet_key_arrset  
            return key_cipher;
        }
        else{
            console.log('La Key corresponde a una clave de cifrado por sustitución');
        }
    }
}
function cipher(arr_plaintext, alphabet, alphabet_key) { // FUNCION QUE CIFRA ----- ENTRADAS: (TEXTO PLANO - ALFABETO - KEY) ----- SALIDA: (TEXTO CIFRADO)
    var ciphertext_array = [];
    console.log(alphabet_key)
    for ( let i in arr_plaintext ) {
        if (arr_plaintext[i] != " "){
            let ind = alphabet.indexOf(arr_plaintext[i]);
            ciphertext_array.push(alphabet_key[ind]);
        }
    }
    const ciphertext = ciphertext_array.join('').toUpperCase();
    return ciphertext; // Retorna texto cifrado ---STRING---
}
function decipher_with_key(ciphertext, alphabet, alphabet_key) { // FUNCION QUE DECIFRA ----- ENTRADAS: (TEXTO CIFRADO - ALFABETO - KEY) ----- SALIDA: (TEXTO DECIFRADO)  
    ciphertext = ciphertext.toLowerCase();
    arr_ciphertext = ciphertext.split('');
    let deciphertext_array = [];
    for ( i in arr_ciphertext) {
        var ind = alphabet_key.indexOf(arr_ciphertext[i]);
        deciphertext_array.push(alphabet[ind]);
    }
    const deciphertext = deciphertext_array.join('');
    return deciphertext; // Retorna texto decifrado ---STRING---
}

console.log(alphabet);
const key_system = verification_key(key_substitution)

console.log(cipher(arr_plaintext, alphabet, key_system))

let ciphertext = cipher(arr_plaintext, alphabet, key_system);

console.log(decipher_with_key(ciphertext, alphabet, key_system));
