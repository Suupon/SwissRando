L.mapbox.accessToken ='pk.eyJ1IjoieW90YW13ZSIsImEiOiJjbHA0MHA3bG0xYnc4Mmlxa3BzbnV1MG9kIn0.gDTM19hR_KXwh5PQkAzsjA';

var map = L.mapbox.map('map')
.setView([46.8182, 8.2275], 8)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

$.ajax({
  type:'GET',
  url: 'donnees.json',
  dataType: 'json',
  success: function(data) {
    // Parcourir les données JSON et ajouter des marqueurs à la carte
    data.forEach(function(location) {
      var marker = L.marker([ location.lon, location.lat]).addTo(map);
      // Vous pouvez personnaliser le popup du marqueur avec d'autres informations du JSON
      marker.bindPopup('<b>' + location.name + '</b><br>' + location.description);
    });
  }
});