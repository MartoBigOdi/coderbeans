const express = require('express');
const colors = require('colors');
const configs = require('./server/config');


//Database
require('../src/database')
//Desde Express() conseguimos app por eso lo metemos en config().
const app = configs(express());

app.listen(app.get('port'), () => {
    console.log('Server on Port'.rainbow.italic, app.get('port'));
});