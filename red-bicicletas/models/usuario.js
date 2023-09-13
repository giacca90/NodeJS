var mongoose = require('mongoose');
var Reserva = require('./reserva'); 
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: String,
})

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