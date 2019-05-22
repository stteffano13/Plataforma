'use strict'

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var InsumoBSchema = Schema({

    DescQ1P1insumo1: String,
    DescQ1P1insumo2: String,
    DescQ1P1insumo3: String,
    DescQ1P1insumo4: String,
    DescQ1P1insumo5: String,
    DescQ1P1insumo6: String,
    DescQ1P2insumo1: String,
    DescQ1P2insumo2: String,
    DescQ1P2insumo3: String,
    DescQ1P2insumo4: String,
    DescQ1P2insumo5: String,
    DescQ1P2insumo6: String,
    DescQ1P3insumo1: String,
    DescQ1P3insumo2: String,
    DescQ1P3insumo3: String,
    DescQ1P3insumo4: String,
    DescQ1P3insumo5: String,
    DescQ1P3insumo6: String,

    DescQ2P1insumo1: String,
    DescQ2P1insumo2: String,
    DescQ2P1insumo3: String,
    DescQ2P1insumo4: String,
    DescQ2P1insumo5: String,
    DescQ2P1insumo6: String,
    DescQ2P2insumo1: String,
    DescQ2P2insumo2: String,
    DescQ2P2insumo3: String,
    DescQ2P2insumo4: String,
    DescQ2P2insumo5: String,
    DescQ2P2insumo6: String,
    DescQ2P3insumo1: String,
    DescQ2P3insumo2: String,
    DescQ2P3insumo3: String,
    DescQ2P3insumo4: String,
    DescQ2P3insumo5: String,
    DescQ2P3insumo6: String,

    periodo: String,
    materia: { type: Schema.ObjectId, ref: "Materia" },
});

module.exports = mongoose.model("InsumoB", InsumoBSchema);