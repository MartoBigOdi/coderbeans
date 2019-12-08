//Desde este archivo vamos a interactuar con los demas que nos permitiran recolectar la info necesaria para la sidebar.
//Creamos los 3 modelos con los que vamos a trabajar.
const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

//Exportamos el modelo de datos
//Acá utilizamos ES6, primero Async y await. Luego utilizamos el parametro sin () porque es un solo parametro. y todo esto lo hacemos con una arrow function.
module.exports = async viewModel => {
    //En vez de ponerle await a cada una de las funciones le hacemos un promise.all()
    const results = await Promise.all([ 
        Stats(),//Este es un objeto.
        Images.popular(), //Este es un arrays.
        Comments.nuevosComentarios()//Este es un array.
    ]);
    
    viewModel.sidebar = {
        stats: results[0],
        popular: results[1],
        comments: results[2]
    };

    return viewModel;
};

//Acá exportamos solo una función.