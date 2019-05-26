'use strict'

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NotasBSchema = Schema({
    Q1P1insumo1: String,
    Q1P1insumo2: String,
    Q1P1insumo3: String,
    Q1P1insumo4: String,
    Q1P1insumo5: String,
    Q1P1insumo6: String,
    Q1P2insumo1: String,
    Q1P2insumo2: String,
    Q1P2insumo3: String,
    Q1P2insumo4: String,
    Q1P2insumo5: String,
    Q1P2insumo6: String,
    Q1P3insumo1: String,
    Q1P3insumo2: String,
    Q1P3insumo3: String,
    Q1P3insumo4: String,
    Q1P3insumo5: String,
    Q1P3insumo6: String,

    examen1: String,

    Q2P1insumo1: String,
    Q2P1insumo2: String,
    Q2P1insumo3: String,
    Q2P1insumo4: String,
    Q2P1insumo5: String,
    Q2P1insumo6: String,
    Q2P2insumo1: String,
    Q2P2insumo2: String,
    Q2P2insumo3: String,
    Q2P2insumo4: String,
    Q2P2insumo5: String,
    Q2P2insumo6: String,
    Q2P3insumo1: String,
    Q2P3insumo2: String,
    Q2P3insumo3: String,
    Q2P3insumo4: String,
    Q2P3insumo5: String,
    Q2P3insumo6: String,

    examen2: String,
    examenSupletorio: String,
    examenRemedial: String,
    examenGracia: String,
    periodo: String,
    pt: String,
    estudiante: { type: Schema.ObjectId, ref: "Estudiante" },
    materia: { type: Schema.ObjectId, ref: "Materia" },
});

module.exports = mongoose.model("NotaB", NotasBSchema);