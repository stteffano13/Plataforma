'use strict'


var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var MateriaSchema= Schema({
    codigo:String,
    nombre: String,
    periodo: String,
    estado:String,
    docente: { type: Schema.ObjectId, ref: "Docente" },
    curso: { type: Schema.ObjectId, ref: "Curso" },
});

module.exports = mongoose.model("Materia", MateriaSchema);