var mongoose = require('mongoose');
var Reserva = require('./reserva'); 
var Schema = mongoose.Schema;

const bcrypt = require('bcrypt');
const saltRounds = 10;

const validateEmail = function(email) {
    const re = "/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/";
    return re.test(email);
}

var usuarioSchema = new Schema({
    nombre: {
        type: String,
        trim: true,
        required: [true, "El nombre de usuario es obligatorio!!!"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "El E-mail es obligatorio!!!"],
        lowercase: true,
        validate: [validateEmail, "Por favor, ingrese un e-mail valido!!!"],
        match: [/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/]
    },
    password: {
        type: String,
        required: [true, "La contraseña es obligatoria!!!"],
    },
    passwordResetToken: String,
    passwordResetTokenExpires: Date,
    verificado: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, saltRounds);
    };
    next();
});

usuarioSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

usuarioSchema.methods.reservar = async function(biciId, desde, hasta) {
    var reserva = new Reserva({
        usuario: this._id, 
        bicicleta: biciId,
        desde: desde,
        hasta: hasta
    })
    console.log("LOG DE RESERVA \n"+reserva);
    reserva.save().then(() => console.log("Reserva guardada")).catch(err => console.log(err));
}

module.exports = mongoose.model('Usuario', usuarioSchema);