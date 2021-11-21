const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const image1 = new Image();           
image1.src = 'loro.jpg';              // Path de la imagen, o URL   ____INPUT____
const key = [7,2,21,9]                  // Key                      ____INPUT____ 

const width_image = (image1.width)    // Tamaño de la imagen Ancho
const height_image = (image1.height)  // Tamaño de la imagen Alto

canvas.width = width_image ;
canvas.height = height_image;
console.log("Tamaño", width_image, "x", height_image) // imprime el tamaño de la imagen


function Hill_cipher(key,width,height,scannedData){ // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]
    console.log(width, height)
    for (let i = 0; i <= (width*4*height) ; i+=(width*2) ){
        for(let j=i; j<=i+(width*2) ; j+=4){
            scannedData[j] = ((scannedData[j]*key[0])+((scannedData[j + width])*key[1]))%255;
            scannedData[j+1] = ((scannedData[j]*key[0])+((scannedData[j + width])*key[1]))%255;
            scannedData[j+2] = ((scannedData[j]*key[0])+((scannedData[j + width])*key[1]))%255;

            scannedData[j+4] = ((scannedData[j+4]*key[0])+((scannedData[j+4+width])*key[1]))%255;
            scannedData[j+5] = ((scannedData[j+4]*key[0])+((scannedData[j+4+width])*key[1]))%255;
            scannedData[j+6] = ((scannedData[j+4]*key[0])+((scannedData[j+4+width])*key[1]))%255;

            scannedData[j+width] = ((scannedData[j]*key[2])+(scannedData[j+width]*key[3]))%255;
            scannedData[j+width+1] = ((scannedData[j]*key[2])+(scannedData[j+width]*key[3]))%255;
            scannedData[j+width+2] = ((scannedData[j]*key[2])+(scannedData[j+width]*key[3]))%255;

            scannedData[j+width] = ((scannedData[j+4]*key[2])+((scannedData[j+4+width])*key[3]))%255;
            scannedData[j+width+1] = ((scannedData[j+4]*key[2])+((scannedData[j+4+width])*key[3]))%255;
            scannedData[j+width+2] = ((scannedData[j+4]*key[2])+((scannedData[j+4+width])*key[3]))%255;
        }
    }
    return scannedData
}
function grayscale(scannedData){      // Función que convierte una imagen a color a escala de grises
    for (let i = 0; i < scannedData.length; i += 4){
        const total = scannedData[i] + scannedData[i+1] + scannedData[i+2];
        const averangeColorValue = total/3;
        scannedData[i] = averangeColorValue    ;  // RED
        scannedData[i+1]  = averangeColorValue ;  // GREEN
        scannedData[i+2] = averangeColorValue  ;  // BLUE
    }
return scannedData
}

function inverse(key_m){           // Función que calcula la inversa de una matriz 2x2
    const det= Math.abs((key_m[0]*key_m[3])-(key_m[1]*key_m[2]));
    key_m[0] = (1/det)*(key_m[3]);
    key_m[1] = (1/det)*(-key_m[1]);
    key_m[2] = (1/det)*(-key_m[2]);
    key_m[3] = (1/det)*(key_m[0]);
    console.log(key_m)
    return key_m
}

function Hill_decipher(key_m,width,height,scannedData){  // Función que decifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]^-1
    const inv_key = inverse(key)
    console.log(key_m)
    for (let i = 0; i <= (width*4*height) ; i+=(width*2) ){
        for(let j=i; j<=i+(width*2) ; j+=4){
            scannedData[j] = ((scannedData[j]*inv_key[0])+((scannedData[j + width])*inv_key[1]))%255;
            scannedData[j+1] = ((scannedData[j]*inv_key[0])+((scannedData[j + width])*inv_key[1]))%255;
            scannedData[j+2] = ((scannedData[j]*inv_key[0])+((scannedData[j + width])*inv_key[1]))%255;

            scannedData[j+4] = ((scannedData[j+4]*inv_key[0])+((scannedData[j+4+width])*inv_key[1]))%255;
            scannedData[j+5] = ((scannedData[j+4]*inv_key[0])+((scannedData[j+4+width])*inv_key[1]))%255;
            scannedData[j+6] = ((scannedData[j+4]*inv_key[0])+((scannedData[j+4+width])*inv_key[1]))%255;

            scannedData[j+width] = ((scannedData[j]*inv_key[2])+(scannedData[j+width]*inv_key[3]))%255;
            scannedData[j+width+1] = ((scannedData[j]*inv_key[2])+(scannedData[j+width]*inv_key[3]))%255;
            scannedData[j+width+2] = ((scannedData[j]*inv_key[2])+(scannedData[j+width]*inv_key[3]))%255;

            scannedData[j+width] = ((scannedData[j+4]*inv_key[2])+((scannedData[j+4+width])*inv_key[3]))%255;
            scannedData[j+width+1] = ((scannedData[j+4]*inv_key[2])+((scannedData[j+4+width])*inv_key[3]))%255;
            scannedData[j+width+2] = ((scannedData[j+4]*inv_key[2])+((scannedData[j+4+width])*inv_key[3]))%255;
        }
    }
    return scannedData
}

// function Hill_cipher2(key,width,height,scannedData){
//     for (let i = 0; i <= (width*4*height) ; i+=(8) ){
//         scannedData[i] =   ((scannedData[i]*key[0])+(scannedData[i+1]*key[1]))%255;
//         scannedData[i+4] = ((scannedData[i]*key[2])+(scannedData[i+1]*key[4]))%255;
//         scannedData[i+1] = ((scannedData[i]*key[0])+(scannedData[i+1]*key[1]))%255;
//         scannedData[i+2] = ((scannedData[i]*key[0])+(scannedData[i+1]*key[1]))%255;
//         scannedData[i+5] = ((scannedData[i]*key[2])+(scannedData[i+1]*key[4]))%255;
//         scannedData[i+6] = ((scannedData[i]*key[2])+(scannedData[i+1]*key[4]))%255;
        
//     }
//     return scannedData
// }

// function Hill_decipher2(key,width,height,scannedData){
//     const inv_key = inverse(key)
//     for (let i = 0; i <= (width*4*height-2) ; i+=(8) ){
//         scannedData[i] =   ((scannedData[i]*inv_key[0])+(scannedData[i+1]*inv_key[1]))%255;
//         scannedData[i+4] = ((scannedData[i]*inv_key[2])+(scannedData[i+1]*inv_key[4]))%255;
//         scannedData[i+1] = ((scannedData[i]*inv_key[0])+(scannedData[i+1]*inv_key[1]))%255;
//         scannedData[i+2] = ((scannedData[i]*inv_key[0])+(scannedData[i+1]*inv_key[1]))%255;
//         scannedData[i+5] = ((scannedData[i]*inv_key[2])+(scannedData[i+1]*inv_key[4]))%255;
//         scannedData[i+6] = ((scannedData[i]*inv_key[2])+(scannedData[i+1]*inv_key[4]))%255;
//     }
//     return scannedData
// }

image1.addEventListener('load', function(){ // Imprime la imagen
    ctx.drawImage(image1,0,0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height);
    console.log(scannedImage);
    const scannedData = scannedImage.data;
    //grayscale(scannedData)

    //Hill_cipher(key,width_image,height_image,scannedData)

    Hill_decipher(inv_key,width_image,height_image,Hill_cipher(key,width_image,height_image,scannedData))

    scannedImage.data = scannedData;
    ctx.putImageData(scannedImage,0,0);
})

