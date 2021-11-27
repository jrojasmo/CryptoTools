//var array_inv = new Array
//for(let i=0; i<=27; i++){
//    for(let mod=0; mod<=27; mod++){
//        if((i*mod)%27==1){
//            console.log(i,mod,'=',1);
//            array_inv.push(i)
//        }
//    }
//    console.log(array_inv)
//}

function matrix_numbers(text,idiom){

    if(idiom == 'alphabet_spa'){
        alphabet = "abcdefghijklmnñopqrstuvwxyz".split("");
    }else{
        if(idiom == 'alphabet_eng'){
            alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        }
    }
    let array_matrix = text.replaceAll(" ","").toLowerCase().split("");
    let matrix_3 = new Array;
    for (let i=0; i < array_matrix.length; i+=3 ){
        matrix_3.push([ (alphabet.indexOf(array_matrix[i])),(alphabet.indexOf(array_matrix[i+1])),(alphabet.indexOf(array_matrix[i+2]))]);
    }
    return matrix_3;
}

function verification_negative(matrix){
    for(i in matrix){
        for(j in matrix[i]){
            if(matrix[i][j]==-1){
                matrix[i][j]=0;
            }
        }
    }
    console.log(matrix)
    return matrix

}
function mod_inv_mult(element_m,l){
    for (let i=0; i<=l; i++){
        //console.log(i,element_m);
        //console.log((element_m*i)%l)
        if ((element_m*i)%l==1){
            return i;
        }
    }
}
function sum_modular(x,y,l){
    if(x+y<0){
        z = x+y+l;
        while(z<0){
            z+=l;
        }
        return z;
    } else {
        let z = x+y;
        return z;
    }
}
function one_first_row_column(Gauss_Matrix,l){
    inv = mod_inv_mult(Gauss_Matrix[0][0][0],l);
    Gauss_Matrix[0][0] = [(inv*Gauss_Matrix[0][0][0])%l,(inv*Gauss_Matrix[0][0][1])%l,(inv*Gauss_Matrix[0][0][2])%l];
    console.log(Gauss_Matrix[0][0]);

    Gauss_Matrix[1][0] = [(inv*Gauss_Matrix[1][0][0])%l,(inv*Gauss_Matrix[1][0][1])%l,(inv*Gauss_Matrix[1][0][2])%l];
    console.log('1 en primera fila',Gauss_Matrix);
    return Gauss_Matrix;
}
function zero_first_column(Gauss_Matrix,l){
    for( let i=1; i<Gauss_Matrix[0].length; i++){
        adit_inv = Gauss_Matrix[0][i][0];
        Gauss_Matrix[0][i] = [sum_modular(Gauss_Matrix[0][i][0], -(adit_inv*Gauss_Matrix[0][0][0]),l), sum_modular(Gauss_Matrix[0][i][1], -(adit_inv*Gauss_Matrix[0][0][1]),l), sum_modular(Gauss_Matrix[0][i][2], -(adit_inv*Gauss_Matrix[0][0][2]),l)];  
        Gauss_Matrix[1][i] = [sum_modular(Gauss_Matrix[1][i][0], -(adit_inv*Gauss_Matrix[1][0][0]),l), sum_modular(Gauss_Matrix[1][i][1], -(adit_inv*Gauss_Matrix[1][0][1]),l), sum_modular(Gauss_Matrix[1][i][2], -(adit_inv*Gauss_Matrix[1][0][2]),l)]; 
    }
    console.log("ceros columna 1",Gauss_Matrix);
    return Gauss_Matrix;
}
function verification_zero_2nd_column(Gauss_Matrix){
    for( let i=1; i<Gauss_Matrix[0].length; i++){
        if (Gauss_Matrix[0][i][1]==0){
            pos_acept = Gauss_Matrix[0][i];
            pos_second_row = Gauss_Matrix[0][1];
            pos_acept1 = Gauss_Matrix[1][i];
            pos_second_row1 = Gauss_Matrix[1][1];
            Gauss_Matrix[0][1] = pos_acept;
            Gauss_Matrix[0][i] = pos_second_row;
            Gauss_Matrix[1][1] = pos_acept1;
            Gauss_Matrix[1][i] = pos_second_row1;
        }
    }
    console.log("verif",Gauss_Matrix)
    return Gauss_Matrix
}
function one_second_row_column(Gauss_Matrix,l){
    inv = mod_inv_mult(Gauss_Matrix[0][1][1],l);
    console.log(inv)
    Gauss_Matrix[0][1] = [0,(inv*Gauss_Matrix[0][1][1])%l,(inv*Gauss_Matrix[0][1][2])%l];
    Gauss_Matrix[1][1] = [(inv*Gauss_Matrix[1][1][0])%l,(inv*Gauss_Matrix[1][1][1])%l,(inv*Gauss_Matrix[1][1][2])%l];
    console.log(Gauss_Matrix);
    return Gauss_Matrix;
}
function zero_second_column(Gauss_Matrix,l){
    adit_inv = Gauss_Matrix[0][0][1];
        Gauss_Matrix[0][0] = [1,sum_modular(Gauss_Matrix[0][0][1], -(adit_inv*Gauss_Matrix[0][1][1]),l), sum_modular(Gauss_Matrix[0][0][2], -(adit_inv*Gauss_Matrix[0][1][2]),l)];  
        Gauss_Matrix[1][0] = [sum_modular(Gauss_Matrix[1][0][0], -(adit_inv*Gauss_Matrix[1][1][0]),l),sum_modular(Gauss_Matrix[1][0][1], -(adit_inv*Gauss_Matrix[1][1][1]),l), sum_modular(Gauss_Matrix[1][0][2], -(adit_inv*Gauss_Matrix[1][1][2]),l)];
    for( let i=2; i<Gauss_Matrix[0].length; i++){
        adit_inv = Gauss_Matrix[0][i][1];
        Gauss_Matrix[0][i] = [0,sum_modular(Gauss_Matrix[0][i][1], -(adit_inv*Gauss_Matrix[0][1][1]),l), sum_modular(Gauss_Matrix[0][i][2], -(adit_inv*Gauss_Matrix[0][1][2]),l)];  
        Gauss_Matrix[1][i] = [sum_modular(Gauss_Matrix[1][i][0], -(adit_inv*Gauss_Matrix[1][1][0]),l),sum_modular(Gauss_Matrix[1][i][1], -(adit_inv*Gauss_Matrix[1][1][1]),l), sum_modular(Gauss_Matrix[1][i][2], -(adit_inv*Gauss_Matrix[1][1][2]),l)]; 
    }
    console.log("ceros columna 2",Gauss_Matrix);
    return Gauss_Matrix;
}
function one_third_row_column(Gauss_Matrix,l){
    console.log(Gauss_Matrix,l);
    inv = mod_inv_mult(Gauss_Matrix[0][2][2],l);
    Gauss_Matrix[0][2] = [0,0,(inv*Gauss_Matrix[0][2][2])%l];
    Gauss_Matrix[1][2] = [(inv*Gauss_Matrix[1][2][0])%l,(inv*Gauss_Matrix[1][2][1])%l,(inv*Gauss_Matrix[1][2][2])%l];
    console.log(Gauss_Matrix);
    return Gauss_Matrix;
}
function zero_third_column(Gauss_Matrix,l){
    adit_inv = Gauss_Matrix[0][0][2];
    Gauss_Matrix[0][0] = [1,0, sum_modular(Gauss_Matrix[0][0][2], -(adit_inv*Gauss_Matrix[0][2][2]),l)];  
    Gauss_Matrix[1][0] = [sum_modular(Gauss_Matrix[1][0][0], -(adit_inv*Gauss_Matrix[1][2][0]),l),sum_modular(Gauss_Matrix[1][0][1], -(adit_inv*Gauss_Matrix[1][2][1]),l), sum_modular(Gauss_Matrix[1][0][2], -(adit_inv*Gauss_Matrix[1][2][2]),l)];
    adit_inv = Gauss_Matrix[0][1][2];
    Gauss_Matrix[0][1] = [0,1, sum_modular(Gauss_Matrix[0][1][2], -(adit_inv*Gauss_Matrix[0][2][2]),l)];  
    Gauss_Matrix[1][1] = [sum_modular(Gauss_Matrix[1][1][0], -(adit_inv*Gauss_Matrix[1][2][0]),l),sum_modular(Gauss_Matrix[1][1][1], -(adit_inv*Gauss_Matrix[1][2][1]),l), sum_modular(Gauss_Matrix[1][1][2], -(adit_inv*Gauss_Matrix[1][2][2]),l)];
    for( let i=3; i<Gauss_Matrix[0].length; i++){
        adit_inv = Gauss_Matrix[0][i][2];
        Gauss_Matrix[0][i] = [0,0, sum_modular(Gauss_Matrix[0][i][2], -(adit_inv*Gauss_Matrix[0][2][2]),l)];  
        Gauss_Matrix[1][i] = [sum_modular(Gauss_Matrix[1][i][0], -(adit_inv*Gauss_Matrix[1][2][0]),l),sum_modular(Gauss_Matrix[1][i][1], -(adit_inv*Gauss_Matrix[1][2][1]),l), sum_modular(Gauss_Matrix[1][i][2], -(adit_inv*Gauss_Matrix[1][2][2]),l)]; 
    }
    console.log("ceros columna 3",Gauss_Matrix);
    let key_nt = new Array;
    key_nt = [Gauss_Matrix[1][0],Gauss_Matrix[1][1],Gauss_Matrix[1][2]]
    return key_nt;
}
function trans_matrix(matrix_n){
    let v01_matrix = matrix_n[0][1];
    let v02_matrix = matrix_n[0][2];
    let v10_matrix = matrix_n[1][0];
    let v12_matrix = matrix_n[1][2];
    let v20_matrix = matrix_n[2][0];
    let v21_matrix = matrix_n[2][1];
    matrix_n[0][1] = v10_matrix
    matrix_n[0][2] = v20_matrix
    matrix_n[1][0] = v01_matrix
    matrix_n[1][2] = v21_matrix
    matrix_n[2][0] = v02_matrix
    matrix_n[2][1] = v12_matrix
    return matrix_n
}
function swap_row(Gauss_Matrix,n,m,mult_inverse){
    if(mult_inverse.includes(Gauss_Matrix[0][n][m])){
        console.log('swap',Gauss_Matrix)
        return Gauss_Matrix;
    }
    else{
        for(let i=0; i<=Gauss_Matrix[0].length-1; i++){
            console.log(i,n,m);
            if(mult_inverse.includes(Gauss_Matrix[0][i][m])){
                pos_acept = Gauss_Matrix[0][i];
                pos_alt_row = Gauss_Matrix[0][n];
                pos_acept1 = Gauss_Matrix[1][i];
                pos_alt_row1 = Gauss_Matrix[1][n];

                Gauss_Matrix[0][n] = pos_acept;
                Gauss_Matrix[0][i] = pos_alt_row;
                Gauss_Matrix[1][n] = pos_acept1;
                Gauss_Matrix[1][i] = pos_alt_row1;

                return Gauss_Matrix;
            }
            if(i==Gauss_Matrix[0].length-1 && !(mult_inverse.includes(Gauss_Matrix[0][i][m])) ){
                console.log('No se puede resolver mediante Gauss ya que',m,"no posee inverso multimplicativo modular en Z_26" );
                break
            }
        }
    }
}


function cryptanalysis_hill(p_text, c_text, idiom){

    if(idiom == 'spanish'){
        alphabet = 'alphabet_spa';
        length_idiom = 27;
        mult_inverse = [1,2,4,5,7,8,10,11,13,14,16,17,19,20,22,23,25,26]
    }else{
        if(idiom == 'english'){
            alphabet = 'alphabet_eng';
            length_idiom = 26;
            mult_inverse = [1,2,5,7,9,11,15,17,19,21,23,25]
        }
    }

    matrix_plt = matrix_numbers(p_text,alphabet);
    matrix_cpt = matrix_numbers(c_text,alphabet);
    console.log("matriz plt", matrix_plt);
    console.log("matriz cpt", matrix_cpt);

    matrix_plt = verification_negative(matrix_plt);
    matrix_cpt = verification_negative(matrix_cpt);
    let Gauss_Matrixf = new Array;
    Gauss_Matrixf = [matrix_plt,matrix_cpt];
    
    Gauss_Matrixf = swap_row(Gauss_Matrixf,0,0,mult_inverse);
    Gauss_Matrixf = one_first_row_column(Gauss_Matrixf,length_idiom);
    

    Gauss_Matrixf = zero_first_column(Gauss_Matrixf,length_idiom);

    Gauss_Matrixf = swap_row(Gauss_Matrixf,1,1,mult_inverse);
    Gauss_Matrixf = one_second_row_column(Gauss_Matrixf,length_idiom);
    
    Gauss_Matrixf = zero_second_column(Gauss_Matrixf,length_idiom);

    Gauss_Matrixf = swap_row(Gauss_Matrixf,2,2,mult_inverse);
    Gauss_Matrixf = one_third_row_column(Gauss_Matrixf,length_idiom);
    
    key_matrix = zero_third_column(Gauss_Matrixf,length_idiom);
    key = trans_matrix(key_matrix)
    console.log("KEY:", key)
}

//LA MINIMA LONGITUD DE LA CLAVE O EL TEXTO PLANO DEBE SER DE 9




const plain_text = "EJEMPLODECIFRADOHILLX";  // --INPUT--
const cipher_text = "ZFMLUHJHGLOCJDJZMPIEZ";     // --INPUT--
const idiom = 'spanish';

cryptanalysis_hill(plain_text,cipher_text,idiom)