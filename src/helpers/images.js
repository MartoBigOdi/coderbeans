//Acá importamos el modelo de las imagenes.
//Con destruction traemos el modelo.
const { Image } = require('../models/image');

//Acá lo exportamos. 
module.exports = {

    //Este método nos va a devolver las imagenes más populares. 
    //Lo declaramos con ES6.
    async popular() {
       const images = await Image.find()
            //Nos devuelve un límite de 10
            .limit(10)
            //Acá las ordenamos de manera inversa, o sea de las más populares a las menos por eso el -1. 
            .sort({likes: -1}) 
       return images;
    }
}