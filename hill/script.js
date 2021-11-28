var canvas = document.getElementById('canvas1');
var ctx = canvas.getContext('2d');

const image1 = new Image();           
image1.src = 'casac2.png';              // Path de la imagen, o URL   ____INPUT____
image1.crossOrigin = 'anonymous';

const key = [7,2,3,13]                // Key                        ____INPUT____ 
const width_image = (image1.width)    // Tamaño de la imagen Ancho
const height_image = (image1.height)  // Tamaño de la imagen Alto
canvas.width = width_image ;
canvas.height = height_image;



function Hill_cipher(key,width,height,scannedData){ // Función que cifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]
    for (var i = 0; i <= ((4*width*height)) ; i+=(8*width) ){
        for(var j=i; j<i+(width*4); j+=8){
            const J_0 = scannedData[j];
            const J_1 = scannedData[j+1];
            const J_2 = scannedData[j+2];

            const J_4 = scannedData[j+4];
            const J_5 = scannedData[j+5];
            const J_6 = scannedData[j+6];

            const J_A = scannedData[j+(width*4)];
            const J_A1 = scannedData[j+(width*4)+1];
            const J_A2 = scannedData[j+(width*4)+2];

            const J_A_4 = scannedData[j+(width*4)+4];
            const J_A_5 = scannedData[j+(width*4)+5];
            const J_A_6 = scannedData[j+(width*4)+6];
            
            //console.log("ind",j,j+4,j+(width*4),j+(width*4)+4);
            //console.log("color",scannedData[j],scannedData[j+4],scannedData[j+(width*4)],scannedData[j+(width*4)+4]);

            scannedData[j] = ((J_0*key[0])+(J_A*key[1]))%256;
            scannedData[j+1] = ((J_1*key[0])+(J_A1*key[1]))%256;
            scannedData[j+2] = ((J_2*key[0])+(J_A2*key[1]))%256;

            scannedData[j+4] = ((J_4*key[0])+(J_A_4*key[1]))%256;
            scannedData[j+5] = ((J_5*key[0])+(J_A_5*key[1]))%256;
            scannedData[j+6] = ((J_6*key[0])+(J_A_6*key[1]))%256;

            scannedData[j+(4*width)] = ((J_0*key[2])+(J_A*key[3]))%256;
            scannedData[j+(4*width)+1] = ((J_1*key[2])+(J_A1*key[3]))%256;
            scannedData[j+(4*width)+2] = ((J_2*key[2])+(J_A2*key[3]))%256;

            scannedData[j+(4*width)+4] = ((J_4*key[2])+(J_A_4*key[3]))%256;
            scannedData[j+(4*width)+5] = ((J_5*key[2])+(J_A_5*key[3]))%256;
            scannedData[j+(4*width)+6] = ((J_6*key[2])+(J_A_6*key[3]))%256;

            //console.log("color cifr",scannedData[j],scannedData[j+4],scannedData[j+(width*4)],scannedData[j+(width*4)+4]);

        }
    }
    console.log(scannedData)
    return scannedData
};
function Hill_decipher(key,width,height,scannedData){  // Función que decifra la imagen pos. [j,j+4,j+ancho,j+4+ancho] con key [k_0, k_1, k_2, k_3]^-1
    const inv_key = inverse(key);
    //console.log(height,width)
    for (var i = 0; i <=  ((4*width*height)) ; i+=(8*width) ){
        //console.log(i)
        for(var j=i; j<i+(width*4); j+=8){

            const J_0 = scannedData[j];
            const J_1 = scannedData[j+1];
            const J_2 = scannedData[j+2];

            const J_4 = scannedData[j+4];
            const J_5 = scannedData[j+5];
            const J_6 = scannedData[j+6];

            const J_A = scannedData[j+(width*4)];
            const J_A1 = scannedData[j+(width*4)+1];
            const J_A2 = scannedData[j+(width*4)+2];

            const J_A_4 = scannedData[j+(width*4)+4];
            const J_A_5 = scannedData[j+(width*4)+5];
            const J_A_6 = scannedData[j+(width*4)+6];

            //console.log("ind",j,j+4,j+(width*4),j+(width*4)+4);
            //console.log("color",scannedData[j],scannedData[j+4],scannedData[j+(width*4)],scannedData[j+(width*4)+4]);

            scannedData[j] = ((J_0*inv_key[0])+(J_A*inv_key[1]))%256;
            scannedData[j+1] = ((J_1*inv_key[0])+(J_A1*inv_key[1]))%256;
            scannedData[j+2] = ((J_2*inv_key[0])+(J_A2*inv_key[1]))%256;

            scannedData[j+4] = ((J_4*inv_key[0])+(J_A_4*inv_key[1]))%256;
            scannedData[j+5] = ((J_5*inv_key[0])+(J_A_5*inv_key[1]))%256;
            scannedData[j+6] = ((J_6*inv_key[0])+(J_A_6*inv_key[1]))%256;

            scannedData[j+(4*width)] = ((J_0*inv_key[2])+(J_A*inv_key[3]))%256;
            scannedData[j+(4*width)+1] = ((J_1*inv_key[2])+(J_A1*inv_key[3]))%256;
            scannedData[j+(4*width)+2] = ((J_2*inv_key[2])+(J_A2*inv_key[3]))%256;

            scannedData[j+(4*width)+4] = ((J_4*inv_key[2])+(J_A_4*inv_key[3]))%256;
            scannedData[j+(4*width)+5] = ((J_5*inv_key[2])+(J_A_5*inv_key[3]))%256;
            scannedData[j+(4*width)+6] = ((J_6*inv_key[2])+(J_A_6*inv_key[3]))%256;

            //console.log("color decifr",scannedData[j],scannedData[j+4],scannedData[j+(width*4)],scannedData[j+(width*4)+4]);
        }
    }
    return scannedData
};

function grayscale(scannedData){      // Función que convierte una imagen a color a escala de grises
    for (let i = 0; i < scannedData.length; i += 4){
        const total = scannedData[i] + scannedData[i+1] + scannedData[i+2];
        const averangeColorValue = total/3;
        scannedData[i] = averangeColorValue    ;  // RED
        scannedData[i+1]  = averangeColorValue ;  // GREEN
        scannedData[i+2] = averangeColorValue  ;  // BLUE
    }
return scannedData
};

function inverse(key_m){           // Función que calcula la inversa de una matriz 2x2 mod
    const det= Math.abs((key_m[0]*key_m[3])-(key_m[1]*key_m[2]));
    //console.log(det mod)
    fn_key = new Array;
    fn_key.push((key_m[3]));
    fn_key.push((-key_m[1]));
    fn_key.push((-key_m[2]));
    fn_key.push((key_m[0]));
    //console.log("transpuesta",fn_key)
    for(var k=0; k <= 256; k++){
        //console.log("k",k)
        //console.log("det x k % 256",((det)*k)%256)
        if(((det*k)%256)==1){
            fn_key[0]=(((fn_key[0]+(256))*k))%256;
            fn_key[1]=(((fn_key[1]+(256))*k))%256;
            fn_key[2]=(((fn_key[2]+(256))*k))%256;
            fn_key[3]=(((fn_key[3]+(256))*k))%256;
            console.log("Key inversa = ", fn_key,k);
            return fn_key
        }
    }
};

image1.addEventListener('load', function(){ // Imprime la imagen
    ctx.drawImage(image1,0,0, canvas.width, canvas.height);
    const scannedImage = ctx.getImageData(0,0, canvas.width, canvas.height);
    const scannedData = scannedImage.data; // Array de datos img
    console.log(scannedData);

    Hill_decipher(key,width_image,height_image,scannedData);


    console.log(scannedImage);
    ctx.putImageData(scannedImage,0,0);
})

