var Usuario = require('../../models/usuario');

exports.usuarios_list = function(req, res) {
    Usuario.find({}, function(err, usuarios) {
        res.satuts(200).json({
            usuarios:usuarios
        });
    });
};

exports.usuario_create = function(req,res) {
    var usuario = new Usuario({nombre: req.body.nombre});
    usuario.save(function(err) {
        res.status(200).json(usuario)
    });
};

exports.usuario_reservar = function(req, res) {
    Usuario.findById(req.body.id), function(err, usuario) {
        console.log(usuario);
        usuario.reservar(req.body.bici_id, req.body.desde, req.body.hasta, function(err) {
            console.log("Reserva!!!");
            res.status(200).send();
        });
    };
};