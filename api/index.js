'use strict'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');




// coenxion base
var mongoose = require('mongoose');
var app = require('./appi');
var port = process.env.PORT || 3977;



mongoose.connect('mongodb://myUserAdmin:abc123@165.22.204.167:43388/plataforma', (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("base de datos esta corriendo correctamente");
        app.listen(port, function () {
            console.log("servidor del api rest de mucsica ecuchando por el puerto", port);
        });
    }
});











