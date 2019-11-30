const moment =  require('moment');//libreria para trabajar con el tiempo.
const helpers = {};

helpers.timeago = timestamp => {
    return moment(timestamp).startOf('minute').fromNow();//Esto me devuelve un objeto con el tiempo de hace cuanto ocurrio la acción en minutos.
};

module.exports = helpers;