var mongoose = require('mongoose');
var Bicicleta = require('../../models/bicicleta');
const bicicleta = require('../../models/bicicleta');

describe('Testing Bicicletas', function () {
    beforeAll(function(done) {

        var mongoDB = 'mongodb://localhost/testdb';
        mongoose.connect(mongoDB, { useNewUrlParser: true});

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', function() {
            console.log('We are connected to test database!');
            done();
        });
    });
    
    beforeEach( function(done) {
        setTimeout(function() {
         Bicicleta.deleteMany({}).then(() => {
            console.log("@@@Borrado todo@@@");
            done();
        }).catch(err => console.log("Error!! "+err)); 
                    
          }, 500);
       
    });

    
    describe('Bicicleta.allBicis', () => {
        it('Comienza vacia', (done) => {
            Bicicleta.allBicis().then((bicis) => {
                expect(bicis.length).toBe(0);
                done();
            })             
        });
    });
    
    describe('Bicicleta.createInstance', () => {
        it('Crea una instancia de Bicicleta', () => {
            var bici = Bicicleta.createInstance(1, "verde", "montaña", [1.1, 2.2]);

            expect(bici.code).toBe(1);
            expect(bici.color).toBe("verde");
            expect(bici.modelo).toBe("montaña");
            expect(bici.ubicacion[0]).toEqual(1.1);
            expect(bici.ubicacion[1]).toEqual(2.2);

        })
    })
    
    describe("Bicicleta.add", () => {
        it('Agregar solo una bici', (done) => {
            var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
            Bicicleta.add(aBici).then(() => {
                Bicicleta.allBicis().then((bicis) => {
                    expect(bicis.length).toEqual(1);
                    expect(bicis[0].code).toEqual(aBici.code);
                    done();
                }).catch(err => console.log("Error!! "+err));
            }).catch(err => console.log("Error!! "+err));
                
            
        });
    });

    describe("Bicicleta.findByCode", () => {
        it('Debe devolver la bici con code 1', (done) => {
/*                 Bicicleta.allBicis().then((bicis) => {
                    expect(bicis.length).toEqual(0);
                }).catch(err => console.log("Error!!! "+err)); */
                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
                Bicicleta.add(aBici);
                var aBici2 = new Bicicleta({code: 2, color: "azul", modelo: "coleccion"});
                Bicicleta.add(aBici2);
    
                Bicicleta.findByCode(1).then((res) => {
                    expect(res.code).toBe(aBici.code);
                    expect(res.color).toBe(aBici.color);
                    expect(res.modelo).toBe(aBici.modelo);
    

                })
                done();
        });
    });

    describe("Bicicleta.removeByCode", () => {
        it('Debe eliminar la bici con code 2', (done) => {
                Bicicleta.allBicis().then((bicis) => {
                    expect(bicis.length).toEqual(0);
                });
                
                var aBici = new Bicicleta({code: 1, color: "verde", modelo: "urbana"});
                Bicicleta.add(aBici);
                var aBici2 = new Bicicleta({code: 2, color: "azul", modelo: "coleccion"});
                Bicicleta.add(aBici2);
                var aBici3 = new Bicicleta({code: 3, color: "fucxia", modelo: "urbana"});
                Bicicleta.add(aBici3);
    
                Bicicleta.allBicis().then((bicis) => {
                    expect(bicis.length).toEqual(3);
                });
    
                Bicicleta.removeByCode(2).then((res) => {
                    expect(res.code).toBe(aBici2.code);
                    expect(res.color).toBe(aBici2.color);
                    expect(res.modelo).toBe(aBici2.modelo);
                }).catch((err) => console.log("error!! " + err));
    
                Bicicleta.allBicis().then((bicis) => {
                    expect(bicis.length).toEqual(2);
                });
                done();
            
        })
    })

});



/* beforeEach(() => {
    Bicicleta.allBicis = [];
})

describe('Bicicleta.allbicis', () => {
    it('comienza vacia', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
    });
});

describe('Bicicleta.add', () => {
    it('agregamos una bicicleta', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var a = new Bicicleta(1, "rojo", "urbano", [41.404796 , 2.1623253]);
        Bicicleta.add(a);
        expect(Bicicleta.allBicis.length).toBe(1);
        expect(Bicicleta.allBicis[0]).toBe(a);
    });
});

describe('Bicicleta.findById', () => {
    it('debe devolver la bici con Id 1', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, "verde", "urbana");
        var aBici2 = new Bicicleta(2, "rojo", "carrera");
        Bicicleta.add(aBici);
        Bicicleta.add(aBici2);
        var targetBici = Bicicleta.findById(1);
        expect(targetBici.id).toBe(1);
        expect(targetBici.color).toBe(aBici.color);
        expect(targetBici.modelo).toBe(aBici.modelo);

    });
});

describe('Bicicleta.removeById', () => {
    it('La longitud del array debe ser 0', () => {
        expect(Bicicleta.allBicis.length).toBe(0);
        var aBici = new Bicicleta(1, "verde", "urbana");
        Bicicleta.add(aBici);
        expect(Bicicleta.allBicis.length).toBe(1);
        Bicicleta.removeById(1);
        expect(Bicicleta.allBicis.length).toBe(0);
    })
}) */