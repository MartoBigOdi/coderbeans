const mongoose = require('mongoose');
const { Schema } = mongoose; //Del módulo solo vamos a utilizar acá el Método 'Schema' que nos permite hacer el modelo con cual vamos a guardar los datos en la base de datos.
const path = require('path');

//Acá estamos utilizando el método de mongoose que nos permite asignar propiedades que trae el módulo mongoose.
const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    filename: { type: String },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

//Acá nosotros gracias a moongose solamente hacemos poblamos una varible sin llevarle a la base de datos. y se utliliza solo cuando se llama a esa variable. Creamos una propiedad virtual.
//Vamos a crear un Id para de manera Virtual ya que cuando busquemos la imagen, a esta la vamos buscar sin la ext por ej .png o la que sea.
ImageSchema.virtual('uniqueId')
.get(function(){
    return this.filename.replace(path.extname(this.filename), '')
});
//Ahora convertimos este Schema en un modelo para poder exportarlo.
module.exports = mongoose.model('Image', ImageSchema);//Acá le decimos a mongoose que cree un modelo de esta imagen. Primer parametro del método es 'Image' que toma de referencia a ImageSchema.

