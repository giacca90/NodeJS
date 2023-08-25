var map = L.map('main_map').setView([41.401, 2.16], 13);
//41.4017962,2.1643253,12

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

//L.marker([41.404796 , 2.1623253]).addTo(map);

fetch('api/bicicletas', {
    headers: {
      accept: 'application/json'
    }
  })
  .then(res => res.json())
  .then(result => {
    console.log(result);
    result.bicicletas.forEach(function (bici) {
        L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
    });
  })
  .catch(err => alert('Algo salió mal '+err));
  

/* $.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result) {
        alert(result);
        result.bicicletas.forEach(function (bici) {
            L.marker(bici.ubicacion, {title: bici.id}).addTo(map);
        })
    },
    error : function(xhr, status) {
        alert('Disculpe, existió un problema'+status);
    },
})
 */