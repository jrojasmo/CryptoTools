function matrix_numbers(text){ 
    //Función que recibe str text ya sea el texto plano o el texto cifrado
    //La salida es la matriz de 2 columnas y 2
    alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
    let array_matrix = text.replaceAll(" ","").toLowerCase().split("");
    let matrix_2 = new Array;
    for (let i=0; i <= 2; i+=2 ){
        matrix_2.push([ (alphabet.indexOf(array_matrix[i])),(alphabet.indexOf(array_matrix[i+1]))]);
    }
    return matrix_2;
}
function mod_inv_mult(element_m){
    // Calcula en inverso multilicativo modular de element_m
    for (let i=0; i<=26; i++){
        if ((element_m*i)%26==1){
            return i;
        }
    }
}
function sum_modular(x,y){
    // Realiza y retorna la suma modular de x,y en Z_deg(l)
    if(x+y<0){
        z = (x+y)%26;
        while(z<0){
            z+=26;
        }
        return z;
    } else {
        let z = x+y;
        return z;
    }
}
function inverse(key_m){           // Función que calcula la inversa de una matriz 2x2 mod
    const det=sum_modular((key_m[0][0]*key_m[1][1])-(key_m[0][1]*key_m[1][0]),0);
    fn_key = new Array;
    fn_key = [[0,0],[0,0]]
    fn_key[0][0] = ((key_m[1][1]));
    fn_key[0][1] = ((-key_m[0][1]));
    fn_key[1][0] = ((-key_m[1][0]));
    fn_key[1][1] = ((key_m[0][0]));
    for(var k=0; k <= 26; k++){
        if(((det*k)%26)==1){
            fn_key[0][0] = (sum_modular( fn_key[0][0] , 0 ) * k)%26;
            fn_key[0][1] = (sum_modular( fn_key[0][1] , 0 ) * k)%26;
            fn_key[1][0] = (sum_modular( fn_key[1][0] , 0 ) * k)%26;
            fn_key[1][1] = (sum_modular( fn_key[1][1] , 0 ) * k)%26;
            console.log(fn_key,"inversa")
            return fn_key
        }
    }
};
function key(inv_m,cipher_matrix){
    let key_matr = [[0,0],[0,0]]
    key_matr[0][0] = sum_modular((inv_m[0][0]*cipher_matrix[0][0]) , (inv_m[0][1]*cipher_matrix[1][0]))%26;
    key_matr[0][1] = sum_modular((inv_m[0][0]*cipher_matrix[0][1]) , (inv_m[0][1]*cipher_matrix[1][1]))%26;
    key_matr[1][0] = sum_modular((inv_m[1][0]*cipher_matrix[0][0]) , (inv_m[1][1]*cipher_matrix[1][0]))%26;
    key_matr[1][1] = sum_modular((inv_m[1][0]*cipher_matrix[0][1]) , (inv_m[1][1]*cipher_matrix[1][1]))%26;
    return key_matr;
}
function cryptanalysis_hill2x2(plain_text,cipher_text){
    cipher_mat = matrix_numbers(cipher_text);
    plain_mat = matrix_numbers(plain_text);
    console.log(cipher_mat,"c matriz");
    console.log(plain_mat,"p matriz");
    inv_matrix = inverse(plain_mat);
    matrix_key = key(inv_matrix,cipher_mat);
    console.log("Key = ",matrix_key);
    return matrix_key;
}

p = "friday"
c = "pqcfku"

cryptanalysis_hill2x2(p,c)