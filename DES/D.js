
function bin2hex2(b) {
    return b.match(/.{4}/g).reduce(function(acc, i) {
        return acc + parseInt(i, 2).toString(16);
    }, '')
}
function hex2bin(h) {
    return h.split('').reduce(function(acc, i) {
        return acc + ('000' + parseInt(i, 16).toString(2)).substr(-4, 4);
    }, '')
}
function convertNumber(n, fromBase, toBase) {
    if (fromBase === void 0) {
      fromBase = 10;
    }
    if (toBase === void 0) {
      toBase = 10;
    }
    return parseInt(n.toString(), fromBase).toString(toBase);
}
  function digits_bin(number){
    var num = number;
    var digits = num.toString().split('');
    var realDigits = digits.map(Number)
    return realDigits;
}
function permute(l1,l2,l3){ // l1 (index list), l2 (valor list), l3(new list)
    for(var i=0; i<= l1.length -1 ; i++){
        l3.push(l2[(l1[i]-1)]);
    }
    return l3;
}
function ConvertToDecimal(num) {
    let sum = 0;
    for (let i = 0; i < num.length; i++) {
       sum += +num[i] * 2 ** (num.length - 1 - i);}
    return sum;
}
function Shift_c(list, number_shift){
    
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
//console.log(Shift_c([1,2,3,4,5],2))
function array_f(list) {
    final_array = [];
    let list_2 = hex2bin(list);
    //console.log(list_2);
    add_z = 64 - list_2.length;
    for (let i = 0; i < add_z; i++) {
        final_array.push("0");        
    }
    // console.log(final_array);
    for (let i = 0; i < list_2.length; i++) {
        final_array.push(list_2[i]);
    }
    // console.log(final_array);  
    return(final_array);  
}
function xor_bin(v1,v2) {
    let xor_list = []
    for (let i = 0; i < v1.length ; i++) {
        val_mod = ((parseInt(v1[i],10)+parseInt(v2[i],10))%2);
        // console.log(v1[i],v2[i],val_mod);
        xor_list.push(val_mod.toString());}
    return xor_list; 
}
P56 = [57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18,  // P56 sin pos 8 16 24 32 40 48 56 64
    10, 2, 59, 51, 43, 35, 27, 19, 11, 3, 60, 52, 44, 36,
    63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46, 38, 30, 22,
    14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4 ]
shift_table = [1, 1, 2, 2,
    2, 2, 2, 2,
    1, 2, 2, 2,
    2, 2, 2, 1 ]
P48 = [14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10,
        23, 19, 12, 4, 26, 8, 16, 7, 27, 20, 13, 2,
    	41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48,
	    44, 49, 39, 56, 34, 53, 46, 42, 50, 36, 29, 32 ]


// 64 Table of Position of 64 bits at initial level: Initial Permutation Table
IPDES = [58, 50, 42, 34, 26, 18, 10, 2,
				60, 52, 44, 36, 28, 20, 12, 4,
				62, 54, 46, 38, 30, 22, 14, 6,
				64, 56, 48, 40, 32, 24, 16, 8,
				57, 49, 41, 33, 25, 17, 9, 1,
				59, 51, 43, 35, 27, 19, 11, 3,
				61, 53, 45, 37, 29, 21, 13, 5,
				63, 55, 47, 39, 31, 23, 15, 7]

// 64 Final Permutation Table
IPIDES = [ 40, 8, 48, 16, 56, 24, 64, 32,
			39, 7, 47, 15, 55, 23, 63, 31,
			38, 6, 46, 14, 54, 22, 62, 30,
			37, 5, 45, 13, 53, 21, 61, 29,
			36, 4, 44, 12, 52, 20, 60, 28,
			35, 3, 43, 11, 51, 19, 59, 27,
			34, 2, 42, 10, 50, 18, 58, 26,
			33, 1, 41, 9, 49, 17, 57, 25 ]

// 48 Expansion D-box Table
E_PDES = [32, 1 , 2 , 3 , 4 , 5 , 4 , 5,
		6 , 7 , 8 , 9 , 8 , 9 , 10, 11,
		12, 13, 12, 13, 14, 15, 16, 17,
		16, 17, 18, 19, 20, 21, 20, 21,
		22, 23, 24, 25, 24, 25, 26, 27,
		28, 29, 28, 29, 30, 31, 32, 1 ]

// Straight Permutation Table
P32 = [ 16, 7, 20, 21,
		29, 12, 28, 17,
		1, 15, 23, 26,
		5, 18, 31, 10,
		2, 8, 24, 14,
		32, 27, 3, 9,
		19, 13, 30, 6,
		22, 11, 4, 25 ]

// S-box Table
S8BOX = [[[14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7],
		[ 0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8],
		[ 4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0],
		[15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13 ]],
			
		[[15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
			[3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
			[0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
		[13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9 ]],

		[ [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
		[13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
		[13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
			[1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12 ]],
	
		[ [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
		[13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
		[10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
			[3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14] ],
		
		[ [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
		[14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
			[4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
		[11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3 ]],
	
		[ [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
		[10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
			[9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
			[4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13] ],
		
		[ [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
		[13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
			[1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
			[6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12] ],
		
		[ [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
			[1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
			[7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
			[2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11] ] ]

function key_generator(key,P48,P56,shift_table){
    let listP56 = [];
    let keys_c = [];
    let keys_d = [];
    let key_list = hex2bin(key);
    // console.log("keyH", key_list);
    listP56 = permute(P56,key_list,listP56);
    // console.log("listP56:",listP56.join(''));
    left_k = listP56.slice(0,28);
    right_k = listP56.slice(28,57);
    // console.log("L and R",left_k,right_k);
    for (let i = 0; i <= 15 ; i++) {
        let K = []
        left_k = Shift_c(left_k,shift_table[i]);
        right_k = Shift_c(right_k,shift_table[i]);
        // console.log("l y r",left_k.join(''),right_k.join(''));
        preP48 = left_k.concat(right_k);
        // console.log("preP48",preP48);
        // P48_F = (permute(P48,preP48,K))
        // console.log(P48_F);
        keys_c.push(permute(P48,preP48,K));
        K = [];
        keys_d.unshift(permute(P48,preP48,K));
        // console.log("Cipher Keys",keys_c);
        // console.log("Cipher Keys",keys_d);    
    }
    Keys_t = [keys_c,keys_d];
    // console.log(Keys_t);
    return Keys_t
}
function CipherDES_ECB(PlainText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    //plaintext array x64bits
    PlainText2 = array_f(PlainText);
    //console.log(PlainText2)
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, PlainText2, PT_IP64);
    // console.log("IP64",PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        //console.log("L and R ",left_pt.join(''),right_pt.join(''));
        EP_48 = permute(E_PDES, right_pt, EP_48);
        //console.log("EP48",EP_48.join(''));
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        //console.log("Xor",Xor48.join(''));
        //console.log("key",Keys_t[nr].join(''));
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            // console.log(row,val_row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            // console.log(col,val_col);
            take_val = S8BOX[i][val_row][val_col];
            // console.log("val box ",take_val);
            bin_val = convertNumber(take_val, 10, 2);
            // console.log("val, length ", bin_val, bin_val.length);
            //console.log("r c v",val_row,val_col,take_val);
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
        //console.log("SBOX",SBOX_array.join(''));
        EP_32 = permute(P32,SBOX_array,EP_32);
        // console.log("EP32",EP_32.join(''));
        final_xor = xor_bin(left_pt,EP_32);
        // console.log("Final Xor",final_xor.join(''));
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
        // console.log("left, right",left_pt,right_pt)
    }
    pre_cipher_text = left_pt.concat(right_pt);
    // console.log("pre",pre_cipher_text);
    cipher_text=permute(IPIDES,pre_cipher_text,cipher_text);
    // console.log("Cipher text", cipher_text);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    console.log("Cipher text Hexa ", cipher_text_hexa);
    return cipher_text_hexa;
}
function DecipherDES_ECB(CipherText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    decipher_text = CipherDES_ECB(CipherText, P32, Keys_t[1], IPDES, IPIDES, E_PDES, S8BOX);
    return decipher_text;
}

//---------------------------------------------- CBC -----------------------------------------------------------------

function CipherDES_CBC(IV, PlainText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    //DES CIPHER
    // RETURN CIPHER TEXT
    // console.log("IV1",IV);
    IV_bin = array_f(IV);
    //console.log("IV_bin",IV_bin);
    // console.log("PT1",PlainText);
    PlainText2 = array_f(PlainText);
    //console.log("PT2",PlainText2);
    PlainText2 = xor_bin(IV_bin,PlainText2);
    //console.log("IV-Plaintext",PlainText2);
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, PlainText2, PT_IP64);
    // console.log("IP64",PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        //console.log("L and R ",left_pt.join(''),right_pt.join(''));
        EP_48 = permute(E_PDES, right_pt, EP_48);
        //console.log("EP48",EP_48.join(''));
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        //console.log("Xor",Xor48.join(''));
        //console.log("key",Keys_t[nr].join(''));
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            // console.log(row,val_row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            // console.log(col,val_col);
            take_val = S8BOX[i][val_row][val_col];
            // console.log("val box ",take_val);
            bin_val = convertNumber(take_val, 10, 2);
            // console.log("val, length ", bin_val, bin_val.length);
            //console.log("r c v",val_row,val_col,take_val);
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
        //console.log("SBOX",SBOX_array.join(''));
        EP_32 = permute(P32,SBOX_array,EP_32);
        // console.log("EP32",EP_32.join(''));
        final_xor = xor_bin(left_pt,EP_32);
        // console.log("Final Xor",final_xor.join(''));
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
        // console.log("left, right",left_pt,right_pt)
    }
    pre_cipher_text = left_pt.concat(right_pt);
    // console.log("pre",pre_cipher_text);
    cipher_text=permute(IPIDES,pre_cipher_text,cipher_text);
    // console.log("Cipher text", cipher_text);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    console.log("Text Hexa ", cipher_text_hexa);
    return cipher_text_hexa;
}
function DecipherDES_CBC(IV,CipherText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    // DES DECIPHER
    // RETURN CIPHER TEXT
    // console.log("IV1",IV);
    IV_bin = array_f(IV);
    //console.log("IV_bin",IV_bin);
    // console.log("PT1",PlainText);
    PlainText2 = array_f(CipherText);
    //console.log("PT2",PlainText2);
    //console.log("IV-Plaintext",PlainText2);
    Keys_t = Keys_t[1];
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, PlainText2, PT_IP64);
    // console.log("IP64",PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        //console.log("L and R ",left_pt.join(''),right_pt.join(''));
        EP_48 = permute(E_PDES, right_pt, EP_48);
        //console.log("EP48",EP_48.join(''));
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        //console.log("Xor",Xor48.join(''));
        //console.log("key",Keys_t[nr].join(''));
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            // console.log(row,val_row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            // console.log(col,val_col);
            take_val = S8BOX[i][val_row][val_col];
            // console.log("val box ",take_val);
            bin_val = convertNumber(take_val, 10, 2);
            // console.log("val, length ", bin_val, bin_val.length);
            //console.log("r c v",val_row,val_col,take_val);
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
        //console.log("SBOX",SBOX_array.join(''));
        EP_32 = permute(P32,SBOX_array,EP_32);
        // console.log("EP32",EP_32.join(''));
        final_xor = xor_bin(left_pt,EP_32);
        // console.log("Final Xor",final_xor.join(''));
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
        // console.log("left, right",left_pt,right_pt)
    }
    pre_cipher_text = left_pt.concat(right_pt);
    // console.log("pre",pre_cipher_text);
    cipher_text=permute(IPIDES,pre_cipher_text,cipher_text);
    // console.log("Cipher text", cipher_text);
    cipher_text = xor_bin(IV_bin,cipher_text);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    console.log("Text Hexa ", cipher_text_hexa);
    return cipher_text_hexa;
}

//----------------------------------------------- CFB ----------------------------------------


function CipherDES_CFB(IV, PlainText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    //DES CIPHER
    // RETURN CIPHER TEXT
    // console.log("IV1",IV);
    IV_bin = array_f(IV);
    //console.log("IV_bin",IV_bin);
    // console.log("PT1",PlainText);
    PlainText2 = array_f(PlainText);
    //console.log("PT2",PlainText2);
    //PlainText2 = xor_bin(IV_bin,PlainText2);
    //console.log("IV-Plaintext",PlainText2);
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, IV_bin, PT_IP64);
    // console.log("IP64",PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        //console.log("L and R ",left_pt.join(''),right_pt.join(''));
        EP_48 = permute(E_PDES, right_pt, EP_48);
        //console.log("EP48",EP_48.join(''));
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        //console.log("Xor",Xor48.join(''));
        //console.log("key",Keys_t[nr].join(''));
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            // console.log(row,val_row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            // console.log(col,val_col);
            take_val = S8BOX[i][val_row][val_col];
            // console.log("val box ",take_val);
            bin_val = convertNumber(take_val, 10, 2);
            // console.log("val, length ", bin_val, bin_val.length);
            //console.log("r c v",val_row,val_col,take_val);
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
        //console.log("SBOX",SBOX_array.join(''));
        EP_32 = permute(P32,SBOX_array,EP_32);
        // console.log("EP32",EP_32.join(''));
        final_xor = xor_bin(left_pt,EP_32);
        // console.log("Final Xor",final_xor.join(''));
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
        // console.log("left, right",left_pt,right_pt)
    }
    pre_cipher_text = left_pt.concat(right_pt);
    // console.log("pre",pre_cipher_text);
    cipher_text = permute(IPIDES,pre_cipher_text,cipher_text);
    
    cipher_text = xor_bin(cipher_text,PlainText2);
    // console.log("Cipher text", cipher_text);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    console.log("Text Hexa ", cipher_text_hexa);
    return cipher_text_hexa;
}

//------------------------------------------------------- OFB ---------------------------------------------------

function CipherDES_OFB(IV, PlainText, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX) {
    //DES CIPHER
    // RETURN CIPHER TEXT
    // console.log("IV1",IV);
    IV_bin = array_f(IV);
    //console.log("IV_bin",IV_bin);
    // console.log("PT1",PlainText);
    PlainText2 = array_f(PlainText);
    //console.log("PT2",PlainText2);
    //console.log("IV-Plaintext",PlainText2);
    let cipher_text = [];
    let PT_IP64 = [];
    let m_left_pt=[];
    let m_right_pt=[];
    left_pt = [];
    right_pt = [];
    PT_IP64 = permute(IPDES, IV_bin, PT_IP64);
    // console.log("IP64",PT_IP64);
    left_pt = PT_IP64.slice(0,32);
    right_pt = PT_IP64.slice(32,65);
    for (let nr = 0; nr < 16; nr++){
        let EP_48 = [];
        let EP_32 = [];
        //console.log("L and R ",left_pt.join(''),right_pt.join(''));
        EP_48 = permute(E_PDES, right_pt, EP_48);
        //console.log("EP48",EP_48.join(''));
        Xor48 =  xor_bin(EP_48,Keys_t[nr]);
        //console.log("Xor",Xor48.join(''));
        //console.log("key",Keys_t[nr].join(''));
        let SBOX_array = []
        for (let i = 0; i < 8; i++) {
            let row = [];
            row = [Xor48[i*6],Xor48[(i*6)+5]]
            row = row.join('');
            val_row = ConvertToDecimal(row);
            // console.log(row,val_row);
            let col = [];
            col = [Xor48[(i*6)+1],Xor48[(i*6)+2],Xor48[(i*6)+3],Xor48[(i*6)+4]];
            col = col.join('');
            val_col = ConvertToDecimal(col);
            // console.log(col,val_col);
            take_val = S8BOX[i][val_row][val_col];
            // console.log("val box ",take_val);
            bin_val = convertNumber(take_val, 10, 2);
            // console.log("val, length ", bin_val, bin_val.length);
            //console.log("r c v",val_row,val_col,take_val);
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
        //console.log("SBOX",SBOX_array.join(''));
        EP_32 = permute(P32,SBOX_array,EP_32);
        // console.log("EP32",EP_32.join(''));
        final_xor = xor_bin(left_pt,EP_32);
        // console.log("Final Xor",final_xor.join(''));
        left_pt = final_xor;
        if (nr!=15) {
            m_right_pt = right_pt;
            m_left_pt = left_pt;
            left_pt = m_right_pt;
            right_pt = m_left_pt;
        }
        // console.log("left, right",left_pt,right_pt)
    }
    pre_cipher_text = left_pt.concat(right_pt);
    // console.log("pre",pre_cipher_text);
    cipher_text=permute(IPIDES,pre_cipher_text,cipher_text);
    // console.log("Cipher text", cipher_text);
    final_xor_ofb = xor_bin(PlainText2,cipher_text);
    cipher_text_hexa = bin2hex2(cipher_text.join(''));
    f_xor_hexa = bin2hex2(final_xor_ofb.join(''));
    // console.log("Text Hexa ", cipher_text_hexa);
    new_output = [f_xor_hexa,cipher_text_hexa]; //cipher text & new IV  
    return new_output;
}



let key = "aabb09182736ccdd";
let PlainText = "e18882ffe08882ff";
let Cipher_text = "3c6d28cb622bfee7";
let IV ="9bac677ebd445127"
Keys_t = (key_generator(key,P48,P56,shift_table));

//---ECB
// console.log("Plaintext ECB: ",PlainText);
// CipherDES_ECB(PlainText, P32, Keys_t[0], IPDES, IPIDES, E_PDES, S8BOX);
// console.log(" ")
// console.log("Ciphertext: ",Cipher_text);
// DecipherDES_ECB(Cipher_text, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX);
// console.log(" ")

//---CBC
// console.log("Plaintext CBC: ",PlainText);
// CipherDES_CBC(IV, PlainText, P32, Keys_t[0], IPDES, IPIDES, E_PDES, S8BOX);
// console.log(" ")
// console.log("Ciphertext: ",Cipher_text);
// DecipherDES_CBC(IV, Cipher_text, P32, Keys_t, IPDES, IPIDES, E_PDES, S8BOX);
// console.log(" ")

//---CFB



//--OFB
console.log("Plaintext OFB: ",PlainText);
console.log(CipherDES_OFB(IV, PlainText, P32, Keys_t[0], IPDES, IPIDES, E_PDES, S8BOX));
console.log(" ")
console.log("Ciphertext OFB: ",Cipher_text);
console.log(CipherDES_OFB(IV, Cipher_text, P32, Keys_t[0], IPDES, IPIDES, E_PDES, S8BOX));
console.log(" ")