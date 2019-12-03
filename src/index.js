const express = require('express');
const colors = require('colors');
const configs = require('./server/config');
const figlet = require('figlet');


//Database
require('../src/database')
//Desde Express() conseguimos app por eso lo metemos en config().
const app = configs(express());

app.listen(app.get('port'), () => {
    console.log('Server on Port'.rainbow.italic, app.get('port'));
    figlet.text('CoderBeans', {
    font: 'doom',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
});

