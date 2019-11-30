//Este Archivo nos aydua con Códigos que vamos a reutilizar en toda la app. Por ejemplo una función que nos permite crear un string con letras y numeros de manera aleatoria. 

const helpers = {};//Objeto vacio.

//Creamos un método apra ese objeto vacio. Para crear un String aleatorio, entre números y letras de 6 caracteres.
helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnopqrstuvwyz0123456789';
    let randomNumber = 0; 
    for (let i = 0 ; i < 6 ; i++) {
        randomNumber += possible.charAt(Math.floor(Math.random()* possible.length))
    }
    return randomNumber;
};

module.exports = helpers;