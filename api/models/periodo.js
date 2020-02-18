'use strict'


var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PeriodoSchema= Schema({
   
    periodo: String
});

module.exports = mongoose.model("Periodo", PeriodoSchema);