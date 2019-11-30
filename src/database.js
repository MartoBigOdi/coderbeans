const mongoose =  require('mongoose');
const keymongo = require('./keys');

mongoose.connect(keymongo.database_uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(db => console.log('DB is conected'.bgRed))//Acá le decimos si todo anda vien muestra por consola esto.
    .catch(err => console.log(err));// En caso de que tengamos un err lo muestres por consola. 

    

    