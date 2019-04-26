'use strict'


var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var PeriodoSchema= Schema({
    perioddo: String
});

module.exports = mongoose.model("Periodo", PeriodoSchema);