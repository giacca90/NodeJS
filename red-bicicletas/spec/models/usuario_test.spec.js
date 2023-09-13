var mongoose = require("mongoose");
var Bicicleta = require("../../models/bicicleta");
var Usuario = require("../../models/usuario");
var Reserva = require("../../models/reserva");

describe("Testing Unitarios", function () {
  beforeAll(function (done) {
    var mongoDB = "mongodb://localhost/testdb";
    mongoose.connect(mongoDB, { useNewUrlParser: true });

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", function () {
      console.log("We are connected to test database!");
      done();
    });
  });

  afterEach(function (done) {
    Reserva.deleteMany({})
      .then((err, success) => {
        if (err) console.log(err);
        Usuario.deleteMany({})
          .then((err, success) => {
            if (err) console.log(err);
            Bicicleta.deleteMany({})
              .then((err, success) => {
                if (err) console.log(err);
                done();
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  describe("Cuando un usuario reserva una bici", () => {
    it("debe existir la reserva", (done) => {
      const usuario = new Usuario({ nombre: "Matteo" });
      usuario.save().then(() => {
        const bicicleta = new Bicicleta({
          code: 1,
          color: "verde",
          modelo: "urbana",
        });
        bicicleta.save().then(async () => {
          var hoy = new Date();
          var manana = new Date();
          manana.setDate(hoy.getDate() + 1);
          usuario.reservar(bicicleta.id, hoy, manana).then();
          var res = Reserva.find({})
            .populate("bicicleta")
            .populate("usuario")
            .exec();
          console.log("RES: " + res);
          res.then((reservas) => {
            console.log("LOG DE RESERVAS \n" + reservas);
            expect(reservas.length).toBe(1);
            expect(reservas[0].diasDeReserva()).toBe(2);
            expect(reservas[0].bicicleta.code).toBe(1);
            expect(reservas[0].usuario.nombre).toBe(usuario.nombre);
            done();
          });
        });
      });
    });
  });
});
