var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bicicletaSchema = new Schema({
    code: Number,
    color: String,
    modelo: String,
    ubicacion: {
        type: [Number], index: { type: '2dsphere', sparse: true}
    }
});

bicicletaSchema.statics.createInstance = function(code, color, modelo, ubicacion) {
    return new this({
        code: code,
        color: color,
        modelo: modelo,
        ubicacion: ubicacion
    });
};

bicicletaSchema.methods.toString = function() {
    return 'code: '+ this.code + ' | color: '+ this.color;
}

bicicletaSchema.statics.allBicis = function() {
    return this.find({});
} 


bicicletaSchema.statics.add = async function(aBici) {
   await this.create(aBici);
   return aBici;
   
} 

bicicletaSchema.statics.findByCode = async function(aCode) {
    return await this.findOne({code: aCode});
}

bicicletaSchema.statics.removeByCode = async function(aCode) {
    return await this.deleteOne({code: aCode});
}

module.exports = mongoose.model('Bicicletas', bicicletaSchema)