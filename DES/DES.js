
P56 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18,  // P56 without pos 8 16 24 32 40 48 56 64
    10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36,
    63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22,
    14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 ]
shift_table = [1, 1, 2, 2, 2, 2, 2, 2,
        1, 2, 2, 2, 2, 2, 2, 1 ]
P48 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10,
        23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2,
    	41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48,
	    44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 ]
// 64 Table of Position of 64 bits at initial level: Initial Permutation Table
IPDES = [58, 50, 42, 34, 26, 18, 10, 2,	60, 52, 44, 36, 28, 20, 12, 4,
		62, 54, 46, 38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8,
		57, 49, 41, 33, 25, 17, 9, 1, 59, 51, 43, 35, 27, 19, 11, 3,
		61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47, 39, 31, 23, 15, 7]
// 64 Final Permutation Table
IPIDES = [ 40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31,
			38, 6, 46, 14, 54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29,
			36, 4, 44, 12, 52, 20, 60, 28, 35, 3, 43, 11, 51, 19, 59, 27,
			34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41, 9, 49, 17, 57, 25 ]
// 48 Expansion D-box Table
E_PDES = [32, 1 , 2 , 3 , 4 , 5 , 4 , 5, 6 , 7 , 8 , 9 , 8 , 9 , 10, 11,
		12, 13, 12, 13, 14, 15, 16, 17, 16, 17, 18, 19, 20, 21, 20, 21,
		22, 23, 24, 25, 24, 25, 26, 27, 28, 29, 28, 29, 30, 31, 32, 1 ]
// Straight Permutation Table
P32 = [ 16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10,
		2, 8, 24, 14, 32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25 ]
// S-box Table
S8BOX = [[[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],[ 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
		[ 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],[15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ]], 	
		[[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],[3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
		[0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],[13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ]],
		[ [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],[13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
		[13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],[1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ]],
		[ [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],[13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
		[10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],[3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14] ],
		[ [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],[14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
		[4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],[11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ]],
		[ [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],[10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
		[9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],[4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13] ],
		[ [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],[13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
		[1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],[6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12] ],
		[ [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],[1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
		[7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],[2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11] ] ]

// ------------------------------------------ CODE ---------------------------------------------------

var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');
const image1 = new Image();           
image1.src = 'Cameramanctr.png';              // Path de la imagen, o URL   ____INPUT____
image1.crossOrigin = 'anonymous';
const width_image = (image1.width)     // Tamaño de la imagen Ancho
const height_image = (image1.height)   // Tamaño de la imagen Alto
canvas.width = width_image ;
canvas.height = height_image;

function bin2hex2(b) { 
    // Binary "b" to hexadecimal
    return b.match(/.{4}/g).reduce(function(acc, i) {
        return acc + parseInt(i, 2).toString(16);
    }, '')
}
function hex2bin(h) {
    // Hexadecimal "h" to binary
    return h.split('').reduce(function(acc, i) {
        return acc + ('000' + parseInt(i, 16).toString(2)).substr(-4, 4);
    }, '')
}
function convertNumber(n, fromBase, toBase) {
    // Change base of number n
    if (fromBase === void 0) {
      fromBase = 10;}
    if (toBase === void 0) {
      toBase = 10;}
    return parseInt(n.toString(), fromBase).toString(toBase);
}
  function digits_bin(number){
    //make a split and create one array to save bits
    var num = number;
    var digits = num.toString().split('');
    var realDigits = digits.map(Number)
    return realDigits;
}
function permute(l1,l2,l3){ // l1 (index list), l2 (valor list), l3(new list)
    // Swap l2 with l1(index list), and save the new list in l3 
    for(var i=0; i<= l1.length -1 ; i++){
        l3.push(l2[(l1[i]-1)]);
    }
    return l3;
}
function ConvertToDecimal(num) {
    // Binary to decimal number
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
       sum += +num[i] * 2 ** (num.length - 1 - i);}
    return sum;
}
function Shift_c(list, number_shift){
    // Shift the elemnts of the list (number_shift) times of the left -
    //- in a circular fashion.
    for (let i = 0; i < number_shift; i++) {
        let list_m = []
        for (let j = 0; j < list.length; j++) {
            if (j===list.length-1){
                list_m.push(list[0]);
            }else{
                list_m.push(list[j+1]);
            }
        }
        list = list_m;
    }
    return list;        
}
function array_f(list) {
    // Complete the list with zeros and transform HEXA str to BIN array
    final_array = [];
    let list_2 = hex2bin(list);
    add_z = 64 - list_2.length;
    for (let i = 0; i < add_z; i++) {
        final_array.push("0");        
    }
    for (let i = 0; i < list_2.length; i++) {
        final_array.push(list_2[i]);
    }
    return(final_array);  
}
function xor_bin(v1,v2) {
    // Xor between V1 and V2
    let xor_list = []
    for (let i = 0; i < v1.length ; i++) {
        val_mod = ((parseInt(v1[i],10)+parseInt(v2[i],10))%2);
        xor_list.push(val_mod.toString());}
    return xor_list; 
}
function key_generator(key,P48,P56,shift_table){
    // Generate the list of 16 keys with the process of generating keys in DES 
    let listP56 = [];
    let keys_c = [];
    let keys_d = [];
    let key_list = hex2bin(key);
    listP56 = permute(P56,key_list,listP56);
    left_k = listP56.slice(0,28);
    right_k = listP56.slice(28,57);
    for (let i = 0; i <= 15 ; i++) {
        let K = []
        left_k = Shift_c(left_k,shift_table[i]);
        right_k = Shift_c(right_k,shift_table[i]);
        preP48 = left_k.concat(right_k);
        keys_c.push(permute(P48,preP48,K));
        K = [];
        keys_d.unshift(permute(P48,preP48,K));   
    }
    Keys_t = [keys_c,keys_d];
    // console.log(Keys_t);
    return Keys_t
}
function CTR_plus(IV_CTR){
    // 36 bits for IV & 28 bits for COUNTER
    IV_CTR = array_f(IV_CTR);
    left_IV = IV_CTR.slice(0,36);
    right_IV = IV_CTR.slice(36,65);
    Decimal_ctr = ConvertToDecimal(right_IV.join(''));
    Decimal_ctr++ ;
    bin_ctr_array = convertNumber(Decimal_ctr,10,2).split("");
    while (bin_ctr_array.length != 28) {
        bin_ctr_array.unshift('0')
    }
    comp_ctr_IV = left_IV.concat(bin_ctr_array);
    new_IV = bin2hex2(comp_ctr_IV.join(''));
    return(new_IV);    
}
//---------------------------------------------- ECB -----------------------------------------------------------------

function CipherDES_ECB(PlainText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    //DES CIPHER
    // RETURN CIPHER TEXT
    PlainText2 = array_f(PlainText);
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, PlainText2, PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        EP_48 = permute(E_PDES, right_pt, EP_48);
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            take_val = S8BOX[i][val_row][val_col];
            bin_val = convertNumber(take_val, 10, 2);
            if (bin_val.length===4){
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2],bin_val[3])   ;         
            }else if (bin_val.length===3){
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2]);
            }else if (bin_val.length===2){
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1]);
            }else{
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0]);
            }       
        }
        EP_32 = permute(P32,SBOX_array,EP_32);
        final_xor = xor_bin(left_pt,EP_32);
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
    }
    pre_cipher_text = left_pt.concat(right_pt);
    cipher_text=permute(IPIDES,pre_cipher_text,cipher_text);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    return cipher_text_hexa;
}
function DecipherDES_ECB(CipherText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    // DES DECIPHER
    // RETURN PLANE TEXT
    decipher_text = CipherDES_ECB(CipherText, P32, Keys_t[1], IPDES, IPIDES, E_PDES, S8BOX);
    return decipher_text;
}
function CipherDES_image_ECB(scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    // CIPHER THE IMAGE WITH INFO OF RGBT IN "scannedData"
    // RETURN NEW ARRAY OF CIPHER RGBT
    sup_sd = 0;
    cont = 0;
    let pl_txt_verification = [];
    let array_8 = [];
    let Pl_txt = [];
    let index_array = [];
    cont2 = 0;
    for (let i = 0; i <=scannedData.length-10; i+=1) {
        if (!((i+1)%4===0)){
            index_array.push(i);       
            cont2++;
            Set_1_8 = convertNumber(scannedData[i],10,2);
            pl_txt_verification.push(Set_1_8);     
            if (cont2===8) {
                for (let i = 0; i < 8; i++) {
                    array_8 = pl_txt_verification[i].split("");
                    while (array_8.length < 8){
                        array_8.unshift("0");                    
                    }
                    for (let j = 0; j < 8; j++) {
                        Pl_txt.push(array_8[j]);
                    }
                }
                Pl_txt_hexa = bin2hex2(Pl_txt.join(''));
                cipher_pixels = CipherDES_ECB(Pl_txt_hexa, P32, Keys_t[0], IPDES, IPIDES, E_PDES, S8BOX);
                ci_pi2 = array_f(cipher_pixels);
                for (let j = 0; j < 8; j++) {
                    color_c = ci_pi2.slice(j*8,(j*8)+8);
                    color_c = color_c.join('');
                    color_c_d = convertNumber(color_c,2,10);
                    scannedData[index_array[j]]=color_c_d;
                }
                index_array = [];
                pl_txt_verification = [];
                array_8 = [];
                Pl_txt = [];
                cont2 = 0;
            }
        }
    }
    console.log(scannedData)
    return scannedData
}
function DecipherDES_image_ECB(scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX){
    // DECIPHER THE IMAGE WITH INFO OF RGBT IN "scannedData"
    // RETURN NEW ARRAY OF CIPHER RGBT
    sup_sd = 0;
    cont = 0;
    let pl_txt_verification = [];
    let array_8 = [];
    let Pl_txt = [];
    let index_array = [];
    cont2 = 0;
    for (let i = 0; i <=scannedData.length-10; i+=1) {
        if (!((i+1)%4===0)){
            index_array.push(i);       
            cont2++;
            Set_1_8 = convertNumber(scannedData[i],10,2);
            pl_txt_verification.push(Set_1_8);     
            if (cont2===8) {
                for (let i = 0; i < 8; i++) {
                    array_8 = pl_txt_verification[i].split("");
                    while (array_8.length < 8){
                        array_8.unshift("0");                    
                    }
                    for (let j = 0; j < 8; j++) {
                        Pl_txt.push(array_8[j]);
                    }
                }
                Pl_txt_hexa = bin2hex2(Pl_txt.join(''));
                cipher_pixels = DecipherDES_ECB(Pl_txt_hexa, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX);
                ci_pi2 = array_f(cipher_pixels);
                for (let j = 0; j < 8; j++) {
                    color_c = ci_pi2.slice(j*8,(j*8)+8);
                    color_c = color_c.join('');
                    color_c_d = convertNumber(color_c,2,10);
                    scannedData[index_array[j]]=color_c_d;
                }
                index_array = [];
                pl_txt_verification = [];
                array_8 = [];
                Pl_txt = [];
                cont2 = 0;
            }
        }
    }
    console.log(scannedData)
    return scannedData
}

//---------------------------------------------- CBC -----------------------------------------------------------------

function CipherDES_CBC(IV, PlainText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    //DES CIPHER
    // RETURN CIPHER TEXT
    IV_bin = array_f(IV);
    PlainText2 = array_f(PlainText);
    PlainText2 = xor_bin(IV_bin,PlainText2);
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, PlainText2, PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        EP_48 = permute(E_PDES, right_pt, EP_48);
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            take_val = S8BOX[i][val_row][val_col];
            bin_val = convertNumber(take_val, 10, 2);
            if (bin_val.length===4){
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2],bin_val[3])   ;         
            }else if (bin_val.length===3){
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2]);
            }else if (bin_val.length===2){
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1]);
            }else{
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0]);
            }       
        }
        EP_32 = permute(P32,SBOX_array,EP_32);
        final_xor = xor_bin(left_pt,EP_32);
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
    }
    pre_cipher_text = left_pt.concat(right_pt);
    cipher_text=permute(IPIDES,pre_cipher_text,cipher_text);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    return cipher_text_hexa;
}
function DecipherDES_CBC(IV,CipherText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    // DES DECIPHER
    // RETURN CIPHER TEXT
    IV_bin = array_f(IV);
    PlainText2 = array_f(CipherText);
    Keys_t = Keys_t[1];
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, PlainText2, PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        EP_48 = permute(E_PDES, right_pt, EP_48);
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            take_val = S8BOX[i][val_row][val_col];
            bin_val = convertNumber(take_val, 10, 2);
            if (bin_val.length===4){
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2],bin_val[3])   ;         
            }else if (bin_val.length===3){
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2]);
            }else if (bin_val.length===2){
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1]);
            }else{
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0]);
            }       
        }
        EP_32 = permute(P32,SBOX_array,EP_32);
        final_xor = xor_bin(left_pt,EP_32);
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
    }
    pre_cipher_text = left_pt.concat(right_pt);
    cipher_text=permute(IPIDES,pre_cipher_text,cipher_text);
    cipher_text = xor_bin(IV_bin,cipher_text);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    return cipher_text_hexa;
}

function CipherDES_image_CBC(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    // CIPHER THE IMAGE WITH INFO OF RGBT IN "scannedData"
    // RETURN NEW ARRAY OF CIPHER RGBT
    N_IV = (IV);
    sup_sd = 0;
    cont = 0;
    let pl_txt_verification = [];
    let array_8 = [];
    let Pl_txt = [];
    let index_array = [];
    cont2 = 0;
    for (let i = 0; i <=scannedData.length-10; i+=1) {
        if (!((i+1)%4===0)){
            index_array.push(i);       
            cont2++;
            Set_1_8 = convertNumber(scannedData[i],10,2);
            pl_txt_verification.push(Set_1_8);     
            if (cont2===8) {
                for (let i = 0; i < 8; i++) {
                    array_8 = pl_txt_verification[i].split("");
                    while (array_8.length < 8){
                        array_8.unshift("0");                    
                    }
                    for (let j = 0; j < 8; j++) {
                        Pl_txt.push(array_8[j]);
                    }
                }
                Pl_txt_hexa = bin2hex2(Pl_txt.join(''));
                cipher_pixels = CipherDES_CBC(N_IV, Pl_txt_hexa, P32, Keys_t[0], IPDES, IPIDES, E_PDES, S8BOX);
                N_IV = cipher_pixels;
                ci_pi2 = array_f(cipher_pixels);
                for (let j = 0; j < 8; j++) {
                    color_c = ci_pi2.slice(j*8,(j*8)+8);
                    color_c = color_c.join('');
                    color_c_d = convertNumber(color_c,2,10);
                    scannedData[index_array[j]]=color_c_d;
                }
                index_array = [];
                pl_txt_verification = [];
                array_8 = [];
                Pl_txt = [];
                cont2 = 0;
            }
        }
    }
    console.log(scannedData);
    return scannedData;
};
function DecipherDES_image_CBC(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX){
    // DECIPHER THE IMAGE WITH INFO OF RGBT IN "scannedData"
    // RETURN NEW ARRAY OF DECIPHER RGBT
    N_IV = (IV);
    sup_sd = 0;
    cont = 0;
    let pl_txt_verification = [];
    let array_8 = [];
    let Pl_txt = [];
    let index_array = [];
    cont2 = 0;
    for (let i = 0; i <= scannedData.length-10 ; i+=1) {
        if (!((i+1)%4===0)){
            index_array.push(i);       
            cont2++;
            Set_1_8 = convertNumber(scannedData[i],10,2);
            pl_txt_verification.push(Set_1_8);     
            if (cont2===8) {
                for (let i = 0; i < 8; i++) {
                    array_8 = pl_txt_verification[i].split("");
                    while (array_8.length < 8){
                        array_8.unshift("0");                    
                    }
                    for (let j = 0; j < 8; j++) {
                        Pl_txt.push(array_8[j]);
                    }
                }
                Pl_txt_hexa = bin2hex2(Pl_txt.join(''));
                cipher_pixels = DecipherDES_CBC(N_IV, Pl_txt_hexa, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX);
                N_IV = Pl_txt_hexa;
                ci_pi2 = array_f(cipher_pixels);
                for (let j = 0; j < 8; j++) {
                    color_c = ci_pi2.slice(j*8,(j*8)+8);
                    color_c = color_c.join('');
                    color_c_d = convertNumber(color_c,2,10);
                    scannedData[index_array[j]]=color_c_d;
                }
                index_array = [];
                pl_txt_verification = [];
                array_8 = [];
                Pl_txt = [];
                cont2 = 0;
            }
        }
    }
    console.log(scannedData)
    return scannedData
}
//---------------------------------------------- CFB -----------------------------------------------------------------

function CipherDES_CFB(IV, PlainText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    IV_bin = array_f(IV);
    PlainText2 = array_f(PlainText);
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, IV_bin, PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        EP_48 = permute(E_PDES, right_pt, EP_48);
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            take_val = S8BOX[i][val_row][val_col];
            bin_val = convertNumber(take_val, 10, 2);
            if (bin_val.length===4){
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2],bin_val[3])   ;         
            }else if (bin_val.length===3){
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2]);
            }else if (bin_val.length===2){
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1]);
            }else{
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0]);            }       
        }
        EP_32 = permute(P32,SBOX_array,EP_32);
        final_xor = xor_bin(left_pt,EP_32);
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
    }
    pre_cipher_text = left_pt.concat(right_pt);
    cipher_text = permute(IPIDES,pre_cipher_text,cipher_text);
    cipher_text = xor_bin(cipher_text,PlainText2);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    return cipher_text_hexa;
}

function CipherDES_image_CFB(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    // CIPHER THE IMAGE WITH INFO OF RGBT IN "scannedData"
    // RETURN NEW ARRAY OF CIPHER RGBT
    N_IV = (IV);
    sup_sd = 0;
    cont = 0;
    let pl_txt_verification = [];
    let array_8 = [];
    let Pl_txt = [];
    let index_array = [];
    cont2 = 0;
    for (let i = 0; i <=scannedData.length-10; i+=1) {
        if (!((i+1)%4===0)){
            index_array.push(i);       
            cont2++;
            Set_1_8 = convertNumber(scannedData[i],10,2);
            pl_txt_verification.push(Set_1_8);     
            if (cont2===8) {
                for (let i = 0; i < 8; i++) {
                    array_8 = pl_txt_verification[i].split("");
                    while (array_8.length < 8){
                        array_8.unshift("0");                    
                    }
                    for (let j = 0; j < 8; j++) {
                        Pl_txt.push(array_8[j]);
                    }
                }
                Pl_txt_hexa = bin2hex2(Pl_txt.join(''));
                cipher_pixels = CipherDES_CFB(N_IV, Pl_txt_hexa, P32, Keys_t[0], IPDES, IPIDES, E_PDES, S8BOX);
                N_IV = cipher_pixels;
                ci_pi2 = array_f(cipher_pixels);
                for (let j = 0; j < 8; j++) {
                    color_c = ci_pi2.slice(j*8,(j*8)+8);
                    color_c = color_c.join('');
                    color_c_d = convertNumber(color_c,2,10);
                    scannedData[index_array[j]]=color_c_d;
                }
                index_array = [];
                pl_txt_verification = [];
                array_8 = [];
                Pl_txt = [];
                cont2 = 0;
            }
        }
    }
    console.log(scannedData)
    return scannedData
};

function DecipherDES_image_CFB(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX){
    // DECIPHER THE IMAGE WITH INFO OF RGBT IN "scannedData"
    // RETURN NEW ARRAY OF DECIPHER RGBT
    N_IV = (IV);
    sup_sd = 0;
    cont = 0;
    let pl_txt_verification = [];
    let array_8 = [];
    let Pl_txt = [];
    let index_array = [];
    cont2 = 0;
    for (let i = 0; i <= scannedData.length-10 ; i+=1) {
        if (!((i+1)%4===0)){
            index_array.push(i);       
            cont2++;
            Set_1_8 = convertNumber(scannedData[i],10,2);
            pl_txt_verification.push(Set_1_8);     
            if (cont2===8) {
                for (let i = 0; i < 8; i++) {
                    array_8 = pl_txt_verification[i].split("");
                    while (array_8.length < 8){
                        array_8.unshift("0");                    
                    }
                    for (let j = 0; j < 8; j++) {
                        Pl_txt.push(array_8[j]);
                    }
                }
                Pl_txt_hexa = bin2hex2(Pl_txt.join(''));
                cipher_pixels = CipherDES_CFB(N_IV, Pl_txt_hexa, P32, Keys_t[0], IPDES, IPIDES, E_PDES, S8BOX);
                N_IV = Pl_txt_hexa;
                ci_pi2 = array_f(cipher_pixels);
                for (let j = 0; j < 8; j++) {
                    color_c = ci_pi2.slice(j*8,(j*8)+8);
                    color_c = color_c.join('');
                    color_c_d = convertNumber(color_c,2,10);
                    scannedData[index_array[j]]=color_c_d;
                }
                index_array = [];
                pl_txt_verification = [];
                array_8 = [];
                Pl_txt = [];
                cont2 = 0;
            }
        }
    }
    console.log(scannedData)
    return scannedData
}

//---------------------------------------------- OFB -----------------------------------------------------------------

function CipherDES_OFB(IV, PlainText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    //DES CIPHER
    // RETURN CIPHER TEXT
    // console.log("IV1",IV);
    IV_bin = array_f(IV);
    PlainText2 = array_f(PlainText);
    Keys_t = Keys_t[0];
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, IV_bin, PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        EP_48 = permute(E_PDES, right_pt, EP_48);
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            take_val = S8BOX[i][val_row][val_col];
            bin_val = convertNumber(take_val, 10, 2);
            if (bin_val.length===4){
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2],bin_val[3])   ;         
            }else if (bin_val.length===3){
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1],bin_val[2]);
            }else if (bin_val.length===2){
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0],bin_val[1]);
            }else{
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push("0");
                SBOX_array.push(bin_val[0]);
            }       
        }
        EP_32 = permute(P32,SBOX_array,EP_32);
        final_xor = xor_bin(left_pt,EP_32);
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
    }
    pre_cipher_text = left_pt.concat(right_pt);
    cipher_text=permute(IPIDES,pre_cipher_text,cipher_text);
    final_xor_ofb = xor_bin(PlainText2,cipher_text);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    f_xor_hexa = bin2hex2(final_xor_ofb.join(''));
    new_output = [f_xor_hexa,cipher_text_hexa]; //cipher text & new IV  
    return new_output;
}
function CipherDES_image_OFB(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    // CIPHER THE IMAGE WITH INFO OF RGBT IN "scannedData"
    // RETURN NEW ARRAY OF CIPHER RGBT
    N_IV = (IV);
    sup_sd = 0;
    cont = 0;
    let pl_txt_verification = [];
    let array_8 = [];
    let Pl_txt = [];
    let index_array = [];
    cont2 = 0;
    for (let i = 0; i <=scannedData.length-10; i+=1) {
        if (!((i+1)%4===0)){
            index_array.push(i);       
            cont2++;
            Set_1_8 = convertNumber(scannedData[i],10,2);
            pl_txt_verification.push(Set_1_8);     
            if (cont2===8) {
                for (let i = 0; i < 8; i++) {
                    array_8 = pl_txt_verification[i].split("");
                    while (array_8.length < 8){
                        array_8.unshift("0");                    
                    }
                    for (let j = 0; j < 8; j++) {
                        Pl_txt.push(array_8[j]);
                    }
                }
                Pl_txt_hexa = bin2hex2(Pl_txt.join(''));
                cipher_pixels = CipherDES_OFB(N_IV, Pl_txt_hexa, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX);
                N_IV = cipher_pixels[1];
                ci_pi2 = array_f(cipher_pixels[0]);
                for (let j = 0; j < 8; j++) {
                    color_c = ci_pi2.slice(j*8,(j*8)+8);
                    color_c = color_c.join('');
                    color_c_d = convertNumber(color_c,2,10);
                    scannedData[index_array[j]]=color_c_d;
                }
                index_array = [];
                pl_txt_verification = [];
                array_8 = [];
                Pl_txt = [];
                cont2 = 0;
            }
        }
    }
    console.log(scannedData);
    return scannedData;
};
function DecipherDES_image_OFB(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    scannedData = CipherDES_image_OFB(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX);
    return scannedData;
}
//------------------------------------------ CTR -----------------------------------------------------------

function CipherDES_image_CTR(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    // CIPHER THE IMAGE WITH INFO OF RGBT IN "scannedData"
    // RETURN NEW ARRAY OF CIPHER RGBT
    sup_sd = 0;
    cont = 0;
    let pl_txt_verification = [];
    let array_8 = [];
    let Pl_txt = [];
    let index_array = [];
    cont2 = 0;
    for (let i = 0; i <=scannedData.length-10; i+=1) {
        if (!((i+1)%4===0)){
            index_array.push(i);       
            cont2++;
            Set_1_8 = convertNumber(scannedData[i],10,2);
            pl_txt_verification.push(Set_1_8);     
            if (cont2===8) {
                for (let i = 0; i < 8; i++) {
                    array_8 = pl_txt_verification[i].split("");
                    while (array_8.length < 8){
                        array_8.unshift("0");                    
                    }
                    for (let j = 0; j < 8; j++) {
                        Pl_txt.push(array_8[j]);
                    }
                }
                Pl_txt_hexa = bin2hex2(Pl_txt.join(''));
                cipher_pixels = CipherDES_ECB(IV, P32, Keys_t[0], IPDES, IPIDES, E_PDES, S8BOX);
                IV = CTR_plus(IV);
                ci_pi2 = array_f(cipher_pixels);
                ci_pi2 = xor_bin(ci_pi2,Pl_txt);
                for (let j = 0; j < 8; j++) {
                    color_c = ci_pi2.slice(j*8,(j*8)+8);
                    color_c = color_c.join('');
                    color_c_d = convertNumber(color_c,2,10);
                    scannedData[index_array[j]]=color_c_d;
                }
                index_array = [];
                pl_txt_verification = [];
                array_8 = [];
                Pl_txt = [];
                cont2 = 0;
            }
        }
    }
    console.log(scannedData);
    return scannedData;
};
function DecipherDES_image_CTR(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX){
    scannedData = CipherDES_image_CTR(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX)
    return scannedData;
}

// ---------------------------------------- FUNCIÓN PRINCIPAL ---------------------------------------------------------------------------------------
// ----------------  INPUT : Key     (PARA TODOS LOS CIFRADORES Y DECIFRADORES) 
// ----------------  INPUT : IV      (PARA CIFRADORES Y DECIPFRADORES CBC, CFB Y OFB)
// ----------------  INPUT : IV_CTR  (PARA CIFRADOR Y DECIPFRADOR CTR)
// ----------------  INPUT : IMAGEN  (PARA TODOS (LINEA 52 DEL CÓDIGO))
// KEY, IV e IV_CTR (64 BITS EN HEXADECIMAL) STR
// SON 5 MODOS DE CIFRADO QUE LE CORRESPONDE 5 MODOS DE DECIFRADO

// CIFRADO ECB Y DECIFRADO ECB
// CIFRADO CBC Y DECIFRADO CBC
// CIFRADO CFB Y DECIFRADO CFB
// CIFRADO OFB Y DECIFRADO OFB
// CIFRADO CTR Y DECIFRADO CTR

let IV_CTR = "51a7b6c1e0000000";
let IV ="9bac677ebd445127";
let key = "b2fa314b102c134d";


image1.addEventListener('load', function(){ // Imprime la imagen
    ctx.drawImage(image1,0,0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height);
    const scannedData = scannedImage.data; // Array de datos img
    console.log(scannedData);

    Keys_t = (key_generator(key,P48,P56,shift_table));

    // AQUÍ VA LA FUNCIÓN QUE SE DESEA USAR, POR EJEMPLO CIFRAR IMAGEN CON MODO ECB:

    CipherDES_image_ECB(scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX); //MODO ECB
    //DecipherDES_image_ECB(scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX);

    //CipherDES_image_CBC(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX); //MODO CBC
    //DecipherDES_image_CBC(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX)
    
    //CipherDES_image_CFB(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) //MODO CFB
    //DecipherDES_image_CFB(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX)

    //CipherDES_image_OFB(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) //MODO OFB
    //DecipherDES_image_OFB(IV, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX)

    //CipherDES_image_CTR(IV_CTR, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX); //MODO CTR
    //DecipherDES_image_CTR(IV_CTR, scannedData, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX);
    
    console.log(scannedImage);
    ctx.putImageData(scannedImage,0,0);
})
