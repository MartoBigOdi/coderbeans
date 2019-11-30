//Este controlador tiene el modelo con el cual vamos ingresar los datos a la base de datos.
const { Schema, model } = require('mongoose');
//ObjectId Viene adentro de Schema. 
const { ObjectId }  = Schema;



const CommentSchema = new Schema ({
    image_id: { type: ObjectId},
    email: { type: String},
    name: { type: String},
    comment: { type: String},
    timestamp: { type: Date, default: Date.now},
    gravatar: { type: String}
});

//Acá exportamos el modelo. (Primero le damos nombre al modelo y como segundo parametro llamamos al modelo que creamos.)
module.exports = model('Comment', CommentSchema);