const path = require('path');
const { randomNumber } = require('../helpers/libs'); //requerimos el módulo que exportamos desde libs. En este caso es un objeto pero nosotros con {} traemos lo que necsitamos ahora 
const md5 = require('md5');

const fs = require('fs-extra');//De este módulo vamos a utilizar 'rename' que nos permite mover los archivos de un lugar a otro.


const { Image, Comment } = require('../models/index');//Estamos importanto un modelo. Para Guardar las imagenes en la base de datos.


const ctrl = {};




//Acá nos ocupamos de mostrar nuestro index. Este controlador se encarga de mostrarnos la vista.
ctrl.index = async (req, res) => {
    const viewModel = { image: {}, comments: {}};

    const image = await Image.findOne({filename: {$regex: req.params.image_id}}); //En esta linea estamos buscando en mongo db un archivo que hayamos guardado pero no con el nombre completo sino con una parte de el, en este caso es el image_id sin le extensión.
    //Acá le indicamos desde el controlador a la vista que cada vez que refrescamos este slash, o ruta le sume una vista a 'image.views'(image.views recordemos que es una propiedad del modelo de nuestra base de datos que esta en 0). De esta manera podemos sumar un view cada vez que se ve la imagen seleccionada por esta ruta.
    if (image){//Acá validamos si existe la imagen o no. o sea si hay ruta a donde ir de caso contrario vuelve al index. 
        image.views = image.views +1;
        viewModel.image = image;//De esta manera llenamos los objetos vacios que creamos en la const 'viewmodel'.
        await image.save();
        const comments =  await Comment.find({image_id: image._id});//Esta petición nos trae los comments relacionados con esta imagen que le pedimos por Id.
        viewModel.comments = comments;
        res.render('image', viewModel);
    } else {
        res.redirect('/');
    };
};
   




//Acá creamos las imagenes que subimos dentro de la app.
ctrl.create = (req, res) => {
            const saveImage = async () => {
            const imgURL = randomNumber();//Al ejecutar esto nos devuelve un String con números y letras.
            //Validación para que no se repita el nombre que le dimos con randomNumber().
            const images =  await Image.find({ filename: imgURL });
            if (images.length > 0) {
                saveImage();
            } else {
            console.log(imgURL);
            const imageTempPath = req.file.path;//Esta la dirección de donde esta la imagen. 
            const ext = path.extname(req.file.originalname).toLowerCase();//En esta linea buscamos el .png o .jpg la extensión que sea. Para esto utilizamos el módulo Path de express. Del objeto que nos devuelve solo buscamos la extensión.
            const targetPath = path.resolve(`src/public/upload/${imgURL}${ext}`);//Esta es la ruta donde quiero poner la imagen. usamos los bastix para hacer la dinámica.
            //Validación del archivo que soporta.
            if (ext === '.jpg' || ext === '.jpeg' || ext === '.png' || ext === '.gif'){//Acá indicamos con este condicional los tipos de ext que soporta nuestra aplicación.
               await fs.rename(imageTempPath,targetPath);
               //Acá instanciamos el objeto newIMG
               const newIMG = new Image({
                   title: req.body.title,
                   filename: imgURL + ext,
                   description: req.body.description,
               });
               //Acá guardamos en la base de datos el objeto creado (Nuestra imagen a postear);
               const ImageSave = await newIMG.save();
               console.log(ImageSave);
               res.redirect('/');
            } else {
               await fs.unlink(imageTempPath);
               res.status(500).json({error: 'Solo Imagenes se pueden subir. Recuerda tu porotito Coder suma para la comunidad.'});
            }
        }
    };
   saveImage();
};






//Nuestro likes y su manera de llegar a las vistas.
ctrl.like = async (req, res) => {
   const image =  await Image.findOne({filename: {$regex: req.params.image_id}}); //Como en otros controladores le hacemos una petición de busqueda y esto le lleva tiempo así que por eso le ponemos el await y se convierte en un función async.
   //Acá validamos.
   if (image){
       image.likes = image.likes +1;
       await image.save();
       res.json({likes: image.likes});//En esta linea estamos devolviendo al cliente la cantidad de likes que tiene la imagen. y como al tocar el BTN se aumente el N de ellos.
   } else {
       res.status(500).json({error: 'internal Error'});
   }
};





//Manejamos los comments.
ctrl.comment = async (req, res) => {
    const image = await Image.findOne({filename: {$regex: req.params.image_id}});
    if (image){//Acá Validamos nuestro comentarios si existe una imagen haga esto de caso contrario lo redireccionamos al index.
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;//Acá de la petición que hacemos a la base de datos (y guardamos en 'image') queremos solamente grabar este comment con el ID por eso es '._id'. o sea utilizamos la const que creamos para esta función y le sumamos el id de la imagen que nos da la base datos, con el 'req.params.image_id'.
        await newComment.save();
        console.log(newComment);
        res.redirect('/images/' + image.uniqueId);
    } else {
        res.redirect('/');
    }
};






//Acá manejamos el DELETE de las imagenes desde el lado del cliente.
ctrl.remove = async (req, res) => {
    //Consoleamos para ver si recibimos bien la petición ajax.
    console.log(req.params.image_id);
    //Busca todas las img donde filename sea una expresión regular del parametro.
    const image = await Image.findOne({ filename: {$regex: req.params.image_id}});

    //Validamos la accíón de borrar como venimos haciendo con un condicional.
    if(image) {
        //vamos a utilizar el módulo filesystem y su método unlink() que remueve un dato a partir de una dirección que yo le de. 
        await fs.unlink(path.resolve('./src/public/upload/' + image.filename));
        await Comment.deleteOne({image_id: image._id});
        await image.remove();
        res.json(true);
    } else {
        res.status(500).json({error: 'internal Error'});
    }

};




module.exports = ctrl;