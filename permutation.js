var tools = require('./generalTools');

function permutationCipher(clearText, permutation){
    if (isAValidPermutation(permutation)){
        var normalTextCodes = tools.getCharCodes(tools.normalizeInput(clearText), true);
        var m = permutation.length;
        var indexPerm = 0;
        var auxList;
        for (i=0; i<normalTextCodes.length; i++){
            indexPerm = i%m;
            if (indexPerm==0){
                auxList = normalTextCodes.slice(i, i+m);
                while (auxList.length<m) {
                    auxList.push(26);
                    normalTextCodes.push(26);
                }
            }
            normalTextCodes[i] = auxList[permutation.indexOf(indexPerm+1)];
        }
        return tools.codesToString(normalTextCodes, true);
    }
    return "Invalid permutation.";
}

function permutationDecipher(cipherText, permutation, inversePerm){
    if (inversePerm) {
        return permutationCipher(cipherText, permutation);
    } else {
        var permutationInv = new Array();
        for(i=0; i<permutation.length; i++){
            permutationInv[permutation[i]-1]=i+1;
        }
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

//console.log(permutationCipher("Gloria a nuestra patria libre, unión eterna de pueblos hermanos", [4, 7, 5, 1, 2, 3, 6]));
console.log(permutationDecipher("riagoalstrneauriaptlaeuniribteroennpueaebdherlsmos..ao.n", [4, 7, 5, 1, 2, 3, 6]))

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