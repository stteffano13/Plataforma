'use strict'

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var SubirNotaSchema = Schema({
    estado: String,
    
});

module.exports = mongoose.model("SubirNota",SubirNotaSchema);