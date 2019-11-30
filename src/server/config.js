const path = require('path');//Este módulo nos permite unir directorios.
const exphbs = require('express-handlebars');//Este módulo es el motor de plantillas.
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const erroHandler = require('errorhandler');

const routes = require('../routes/index');

module.exports = app => {

    //Settings 
    app.set('port', process.env.PORT || 4050);
    app.set('views', path.join(__dirname, '../views')); //Acá le digo donde esta la carpeta views.'../ con esto subimos al nivel donde esta views.
    app.engine('.hbs', exphbs({//Atraves de un objeto le pasamos la config al motor de plantilla 'exphbs'.
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),//como anteriormente arriba unas lineas ya le dimos la direccion ahora no es necesario que le pasemos de nuevo sino que nos da la.
        layoutsDir: path.join(app.get('views'), 'layouts'),//Acá hacemos lo mismo que con la carpeta 'partials'.
        extname: '.hbs', //Acá le indicamos con que extensión vamos a escribir esos archivos.
        helpers: require('./helpers')//requerimo el archivo helpers.
    }));
    app.set('view engine', '.hbs');//Acá le estoy diciendo que motor voy a utilizar para mis vistas.


    //Midlewares
    app.use(morgan('dev'));
    app.use(multer({dest: path.join(__dirname, '../public/upload/temp')}).single('image'));//Atraves de multer cuando me envien una imagen la vamos a guardar dentro de esta dirección que le pasamos, pero tan solo vamos a recibir una sola imagen atraves del nombre 'image'. 
    app.use(express.urlencoded({extended: false}));//Este módulo de express no permite recibir los datos que viene desde el form. Las imagenes.
    app.use(express.json());//Con Json vamos a manejar los like, y para que no se refresque la pantalla todo el tiempo lo que hacemos son peticiones AJAX. 

    //Routes
    routes(app);


    //Static Files
    app.use('/public', express.static(path.join(__dirname, '../public')));

    //ErrorHandlers
     if ('development' === app.get('env')) {  //Acá estamos trabajando con las variables de entorno.
         app.use(erroHandler);
     };



    return app;
}