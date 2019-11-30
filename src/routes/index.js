
const espress = require('express');
const router = espress.Router();

//Controllers
const home = require('../controllers/home');
const image = require('../controllers/image');




module.exports = app => {
    //Esta ruta es un pedido del usuario mediante un ID. Luego lo procesamos con el controlador index(carpeta controllers/home.js ahí se encuentra el controlador).
    router.get('/', home.index);
   
    router.get('/images/:image_id', image.index);//Esta ruta es un pedido del usuario mediante un ID. Luego lo procesamos con el controlador index(carpeta controllers/image.js ahí se encuentra el controlador).
    router.post('/images', image.create);//Esta ruta procesa las imagenes que recibimos desde el form.
    router.post('/images/:image_id/like', image.like);
    router.post('/images/:image_id/comment', image.comment);
     //Como estamos utilizando el enrutador Router. Hacemos los siguiente.
    router.delete('/images/:image_id', image.remove);
    app.use(router);


};