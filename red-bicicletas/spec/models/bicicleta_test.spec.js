const Bicicleta = require('../../models/bicicleta');

beforeEach(() => {
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
})