'use strict'

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NotasSchema= Schema({
   insumo1:String,
   insumo2:String,
   insumo3:String,
   insumo4:String,
   insumo5:String,
   insumo6:String,
   insumo7:String,
   insumo8:String,
   examen1:String,
   insumo11:String,
   insumo22:String,
   insumo33:String,
   insumo44:String,
   insumo55:String,
   insumo66:String,
   insumo77:String,
   insumo88:String,
   Examen2:String,
   examenSupletorio:String,
   examenRemedial:String,
   examenGracia:String,

    estudiante: { type: Schema.ObjectId, ref: "Estudiante" },
    materia: { type: Schema.ObjectId, ref: "Materia" },
});

module.exports = mongoose.model("Nota", NotasSchema);