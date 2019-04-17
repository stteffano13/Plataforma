'use strict'


var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MatriculaSchema= Schema({
    codigo: String,
    periodo: String,
    fecha:String,
    estado:String,
    estudiante: { type: Schema.ObjectId, ref: "Estudiante" },
    curso: { type: Schema.ObjectId, ref: "Curso" },
});

module.exports = mongoose.model("Matricula", MatriculaSchema);