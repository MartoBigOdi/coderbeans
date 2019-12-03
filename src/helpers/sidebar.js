//Desde este archivo vamos a interactuar con los demas que nos permitiran recolectar la info necesaria para la sidebar.
//Creamos los 3 modelos con los que vamos a trabajar.
const Stats = require('./stats');
const Images = require('./images');
const Comments = require('./comments');

//Exportamos el modelo de datos
module.exports = (viewModel) => {

    Images.popular();
    Images
}