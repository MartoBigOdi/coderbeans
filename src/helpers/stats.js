const { Comment, Image } = require('../models');


const imageCounter = async () => {
    //countDocuments(): Se encarga de devolvernos el total de las imagenes. Busca y cuenta dentro de la base de datos.
//Este método es una función async.
   return await Image.countDocuments();
}

const commentCounter = async () => {
    //countDocuments(): Se encarga de devolvernos el total de las imagenes. Busca y cuenta dentro de la base de datos.
//Este método es una función async.
   return await Comment.countDocuments();
}

const imageTotalViewCounter = async () => {
    //Para sumar todas las views de las images vamos a utilzar un método de moongoDB. 
    const results = await Image.aggregate([{$group: {
            _id:'1',
            viewsTotal: {$sum: '$views'}
    }}]);

}

const likesTotalCounter = () => {

}


module.export = () => {


}