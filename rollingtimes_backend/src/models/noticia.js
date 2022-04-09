import mongoose, { Schema } from "mongoose";

const noticiaSchema = new Schema({
  titulo: {
    type: String,
    required: true,
    unique: true,
    maxlength: 140,
    default: "",
  },
  subtitulo: { type: String },
  categoria: { type: String },
  texto: { type: String },
  autor: { type: String },
  fecha: { type: String },
  imagen: { type: String },
  destacar: {type: Boolean}
});

const Noticia = mongoose.model("noticia", noticiaSchema);

export default Noticia;
