function permutationCipher(clearText, permutation){
    if (isAValidPermutation(permutation)){
        var normalTextCodes = getCharCodes(normalizeInput(clearText));
        var m = permutation.length;
        var indexPerm = 0;
        var auxList;
        for (i=0; i<normalTextCodes.length; i++){
            indexPerm = i%m;
            if (indexPerm==0)
                auxList = normalTextCodes.slice(i, i+m < normalTextCodes.length ? i+m : normalTextCodes.length);
            normalTextCodes[i] = auxList[permutation.indexOf(indexPerm+1)];
        }
        return codesToString(normalTextCodes);
    }
    return "";
}

function permutationDecipher(cipherText, permutation, inversePerm){
    if (inversePerm) {
        return permutationCipher(cipherText, permutation);
    } else {
        var permutationInv = new Array();
        for(i=0; i<permutation.length; i++){
            permutationInv[permutation[i]-1]=i+1;
        }
        console.log(permutationInv);
        return permutationCipher(cipherText, permutationInv);
    }
}

function isAValidPermutation(permutation){
    var dupMap = {};
    for(i=0; i<permutation.length; i++){
        if (permutation[i]<1 || permutation[i]>permutation.length)
            return false;
        // Duplicates (?)
        if(dupMap[permutation[i]])
            return false
        dupMap[permutation[i]] = true;
    }
    return true;
}

//console.log(permutationCipher(  "shesellsseashellsbytheseashore", [3, 6, 1, 5, 2, 4]))
//console.log(permutationDecipher("eeslshsalseslshblehsyeethraeos", [3, 6, 1, 5, 2, 4], false))

function ranPermutation(size){
    var arr = new Array(size);
    for (i=0; i<arr.length; i++)
        arr[i] = i+1;
    var j;
    var temp;
    for (var i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    return arr;
}

//console.log(ranPermutation(5));