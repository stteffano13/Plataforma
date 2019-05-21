'use strict'

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var InsumoSchema = Schema({
    insumo1: String,
    insumo2: String,
    insumo3: String,
    insumo4: String,
    insumo5: String,
    insumo6: String,
    insumo7: String,
    insumo8: String,
    insumo11: String,
    insumo22: String,
    insumo33: String,
    insumo44: String,
    insumo55: String,
    insumo66: String,
    insumo77: String,
    insumo88: String,
    periodo: String,
    materia: { type: Schema.ObjectId, ref: "Materia" },
});

module.exports = mongoose.model("Insumo", InsumoSchema);