var map = L.map('main_map').setView([41.401, 2.16], 13);
//41.4017962,2.1643253,12

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

L.marker([41.401796 , 2.1643253]).addTo(map);
L.marker([41.402796 , 2.1643263]).addTo(map);
L.marker([41.401786 , 2.1633253]).addTo(map);