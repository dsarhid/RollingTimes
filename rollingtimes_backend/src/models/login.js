import mongoose, {Schema} from 'mongoose'

const usuarioSchema = new Schema({
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
        maxlength: 20
    }
});

const Usuario = mongoose.model('usuario', usuarioSchema);

export default Usuario;