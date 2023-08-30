var Bicicleta = require('../../models/bicicleta');
var request = require('request');
var server = require('../../bin/www')

describe('Bicicleta API', () => {
    describe('GET BICICLETAS', () => {
        it('Status 200', () => {
            expect(Bicicleta.allBicis.length).toBe(0);
            var a = new Bicicleta(1, "negra", "montaña", [41.407796 , 2.1603253]);
            Bicicleta.add(a);
            request.get('http://localhost:3000/api/bicicletas', function(error, response, body){
                expect(response.statusCode).toBe(200);
            });
        });
    });

    describe('POST BICICLETAS /create', () => {
        it('STATUS 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var aBici = '{"id": 10, "color": "rojo", "modelo": "urbano", "lat": 41.39, "lng": 2.17}';
            request.post({
                headers : headers,
                url: 'http://localhost:3000/api/bicicletas/create',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.findById(10).color).toBe('rojo');
                done();
            });
        });
    });

    describe('POST BICICLETA /update', () => {
        it('STATUS 200', (done) => {
            var headers = {'content-type' : 'application/json'};
            var aBici = '{"id": 10, "color": "blanco", "modelo": "urbano", "lat": 41.39, "lng": 2.17}';
            request.post({
                headers : headers,
                url: 'http://localhost:3000/api/bicicletas/update',
                body: aBici
            }, function(error, response, body) {
                expect(response.statusCode).toBe(200);
                expect(Bicicleta.allBicis.length).toBe(1);
                expect(Bicicleta.findById(10).color).toBe('blanco');
                done();
            });
        });
    });

    describe(' BICICLETA /delete', () => {
        it('STATUS 400', (done) => {
            var headers = {'content-type' : 'application/json'};
            var nDel = '{id: 10}';
            request.post({
                headers : headers,
                url: 'http://localhost:3000/api/bicicletas/delete',
                body: nDel
            }, function(error, response, body) {
                expect(response.statusCode).toBe(400);
                expect(Bicicleta.allBicis.length).toBe(0);
                done();
            }) 
        })
    })
});