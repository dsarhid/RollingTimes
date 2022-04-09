import mongoose, { Schema } from "mongoose";
import bcryptjs from "bcryptjs";

const suscripcionSchema = new Schema({
  nombre: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
  },
  apellido: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20,
  },
  role: {
    type: String,
    default: 'regular',
    enum: [
      'regular',
      'admin'
    ]
  },
  localidad: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 40,
  },
  direccion: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 40,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 10,
    maxlength: 40,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 20,
  },
  telefono: {
    type: Number,
    required: true,
    unique: true,
    minlength: 7,
    maxlength: 14,
  },
  postal: {
    type: Number,
    required: true,
    minlength: 4,
    maxlength: 4,
  },
});

suscripcionSchema.pre('save', function (next) {
  bcryptjs
    .genSalt(10)
    .then(salts => {
      bcryptjs
        .hash(this.password,salts)
        .then(hash => {
          this.password = hash;
          next();
        })
        .catch((error) => next(error));
    })
    .catch((error) => next(error));
});

const Suscripcion = mongoose.model("suscripcion", suscripcionSchema);

export default Suscripcion;
