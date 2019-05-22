'use strict'

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var InsumoSchema = Schema({
    Descinsumo1: String,
    Descinsumo2: String,
    Descinsumo3: String,
    Descinsumo4: String,
    Descinsumo5: String,
    Descinsumo6: String,
    Descinsumo7: String,
    Descinsumo8: String,
    Descinsumo11: String,
    Descinsumo22: String,
    Descinsumo33: String,
    Descinsumo44: String,
    Descinsumo55: String,
    Descinsumo66: String,
    Descinsumo77: String,
    Descinsumo88: String,
    periodo: String,
    materia: { type: Schema.ObjectId, ref: "Materia" },
});

module.exports = mongoose.model("Insumo", InsumoSchema);