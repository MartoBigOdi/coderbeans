const {Comment, Image} = require('../models');

module.exports = {

    async nuevosComentarios() {
        const comments = await Comment.find()
        .limit(5)
        .sort({ timestamp: -1 });
        //Esto devuelve un arreglo de comentarios y lo vamos a  iterar.

        //Acá buscamos por id la imagen que corresponda. Utlizamos una especie de 'for'.
        for(const comment of comments) {
            const image = await Image.findOne({_id: comment.image_id});
            comment.image = image;
        }

        return comments;
    }

};