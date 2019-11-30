//Un controlador no es más que un objeto con funciones para exportar.
const ctrl = {};


//traemos el modelo desde la carpeta models, index.js
const { Image } = require('../models');


//Acá ordenamos mediante el controlador la vista index según vamos subiendo las imagenes o la info que subamos.
ctrl.index = async (req, res) => {
    const images = await Image.find().sort({timestamp: -1});
    res.render('index', {images});
};


module.exports = ctrl; 