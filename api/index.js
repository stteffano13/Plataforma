'use strict'

var bcrypt = require('bcrypt-nodejs');
var moment = require('moment');




// coenxion base
var mongoose = require('mongoose');
var app = require('./appi');
var port = process.env.PORT || 3977;


mongoose.connect('mongodb://138.197.102.175:27017/plataforma?authSource=plataforma',{user:'nutch@',pass:'p@ssw0rd'}, (err, res) => {
    if (err) {
        throw err;
    } else {
        console.log("base de datos esta corriendo correctamente");
        app.listen(port, function () {
            console.log("servidor del api rest de mucsica ecuchando por el puerto", port);
        });
    }
});











