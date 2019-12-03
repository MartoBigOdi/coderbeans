//En este archivo trabajamos más que nada directo con los datos de la base de datos y usamos sus métodos counterDocuments(), aggregate([{$gropu: { _id:'1' este es un ejemplo viewsTotal: {$sum: $views aca le indicamos la propiedad del objeto que instanciamos con el módulo que importamos con require del archivos models}}}])

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
     //Acá vamos a retornar la suma de las imagenes. 
    return results[0].viewsTotal;

}

const likesTotalCounter = () => {
    //Para sumar todas los likes de las images vamos a utilzar un método de moongoDB. 
    const results = Image.aggregate([{$gropu: {
        _id:'1',
        likesTotal: {$sum: '$likes'}
    }}]);
    //Acá vamos a retornar la suma de las imagenes. 
    return results[0].likesTotal;
}


module.export = async () => {
//Con Promise.all() logramos que todas las funciones async que tenemos se eejecuten al mismo tiempo.
   const results = await Promise.all([
       //Esto me va a retornar un arrelgo de valores. [50,120,100,500]
        imageCounter(),
        commentCounter(),
        imageTotalViewCounter(),
        likesTotalCounter()
    ]);
    //Acá vamos a 'return' un objeto para poder trabajar lo dsp con otra función. 
    return{
        //Las posiciones son de acuerdo a la organización que tengan arriba los valores del array devuelto previamente.
        image: results[0],
        comments:results[1],
        views: results[2],
        likes: results[3]
    };

};