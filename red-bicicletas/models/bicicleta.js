var Bicicleta = function(id, color, modelo, ubicacion) {
    this.id = id;
    this.color = color;
    this.modelo = modelo;
    this.ubicacion = ubicacion;
}

Bicicleta.prototype.toString = function ()  {
    return 'id: '+this.id+ ' color: '+this.color;
}

Bicicleta.allBicis = [];
Bicicleta.add = function(aBici) {
    Bicicleta.allBicis.push(aBici);
}

Bicicleta.findById = function(aBiciId) {
    console.log("@aBiciId "+ typeof aBiciId+" "+aBiciId);

    var aBici;
    for(let i=0; i<Bicicleta.allBicis.length; i++)  {
        if (Bicicleta.allBicis[i].id == aBiciId)  {
            console.log("@allBici.id "+ typeof Bicicleta.allBicis[i].id+" "+Bicicleta.allBicis[i].id);
            aBici = Bicicleta.allBicis[i];
            break;
        }
    }
    if(typeof aBici != undefined) {
        return aBici;
    }
    else {
        throw new Error(`No exíste una bici con ID ${aBiciId}`)
    }

   /*  var aBici = Bicicleta.allBicis.find(x => {
        console.log("@x "+ typeof x+" "+x);
        console.log("@x.id "+ typeof x.id+" "+x.id);
        x.id == aBiciId; 
    });
    console.log("@@ "+ typeof aBici+" "+aBici);
    if(aBici) { 
        return aBici;}
    else   
        throw new Error(`No exíste una bici con ID ${aBiciId}`)  */
} 

Bicicleta.removeById = function(aBiciId)  {
    Bicicleta.findById(aBiciId);
    for(var i=0; i < Bicicleta.allBicis.length; i++) {
        if(Bicicleta.allBicis[i].id == aBiciId) {
            Bicicleta.allBicis.splice(i, 1);
            break;
        }
    }
}

var a = new Bicicleta(1, "rojo", "urbano", [41.404796 , 2.1623253]);
var b = new Bicicleta(2, "azul", "urbano", [41.407796 , 2.1603253]);

Bicicleta.add(a);
Bicicleta.add(b);

module.exports = Bicicleta;