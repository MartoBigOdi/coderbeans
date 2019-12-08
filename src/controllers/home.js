const color = require('colors');
//Acá imoprtamos la función del modulo del archivo sidebar.js
const sidebar = require('../helpers/sidebar');

//traemos el modelo desde la carpeta models, index.js
const { Image } = require('../models');

//Un controlador no es más que un objeto con funciones para exportar.
const ctrl = {};

//Acá ordenamos mediante el controlador la vista index según vamos subiendo las imagenes o la info que subamos.
ctrl.index = async (req, res) => {
    try {
    const images = await Image
    .find()
    .sort({timestamp: -1});
    let viewModel = { images: [] };
    viewModel.images = images;
    //Pasamos viewModel por sidebar() para crear los stats de las imagenes.
    viewModel = await sidebar(viewModel);
    res.render('index', viewModel);
    console.log(viewModel);
    console.log(sidebar);
    }
    catch (err) {
        console.log(err);
    };
};



module.exports = ctrl; 


