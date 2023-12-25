/*
L.mapbox.accessToken = 'pk.eyJ1IjoiaGVuZHJ5a2VseSIsImEiOiJjbHFqaHgwMzUwNHE5MmxwOTFqeG9paTZqIn0.jFmKdstMnKX-Jdrj04s8XQ'; 

var map = L.mapbox.map('map')
    .setView([46.8182, 8.2275], 8)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));



// Charger les données GeoJSON et ajouter des marqueurs
fetch('lacs.geojson') // Remplacer par le chemin réel du fichier GeoJSON
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            onEachFeature: function (feature, layer) {
                // Vous pouvez personnaliser cette partie pour ajouter des popups ou d'autres informations
                if (feature.properties && feature.properties.name) {
                    layer.bindPopup(feature.properties.name);
                }
            }
        }).addTo(map);
    })
    .catch(error => {
        console.error('Erreur lors du chargement du GeoJSON:', error);
    });
    */

    
    mapboxgl.accessToken = 'pk.eyJ1IjoiaGVuZHJ5a2VseSIsImEiOiJjbHFqaHgwMzUwNHE5MmxwOTFqeG9paTZqIn0.jFmKdstMnKX-Jdrj04s8XQ';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [8.2275, 46.8182],
    zoom: 8
});

var markers = [];

map.on('click', function (e) {
    // Ajouter un marqueur
    var marker = new mapboxgl.Marker()
        .setLngLat(e.lngLat)
        .addTo(map);
    markers.push(marker);

    // Mettre à jour le trajet
    updateRoute();
});

function updateRoute() {
    if (markers.length >= 2) {
        // Récupérer les coordonnées des marqueurs
        var coordinates = markers.map(marker => marker.getLngLat().toArray());

        // Effectuer une requête au service Directions
        var directionsRequest = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + coordinates.join(';') +
            '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

        fetch(directionsRequest)
            .then(response => response.json())
            .then(data => {
                var route = data.routes[0].geometry;

                // Supprimer le chemin existant s'il y en a un
                if (map.getSource('route')) {
                    map.getSource('route').setData(route);
                } else {
                    // Ajouter le chemin
                    map.addSource('route', {
                        type: 'geojson',
                        data: route
                    });

                    map.addLayer({
                        id: 'route',
                        type: 'line',
                        source: 'route',
                        layout: {
                            'line-join': 'round',
                            'line-cap': 'round'
                        },
                        paint: {
                            'line-color': '#3887be',
                            'line-width': 5,
                            'line-opacity': 0.75
                        }
                    });
                }
            })
            .catch(error => console.error('Erreur lors de la requête Directions:', error));
    }
}

  
   

   

































/*
    $.ajax({
      url: 'test.json',
      type: 'GET',
      dataType: 'json',
      success: function (data) {
          console.log("Données chargées :", data);
  
          L.geoJson(data, {
              pointToLayer: function (feature, latlng) {
                  return L.marker(latlng, {
                      icon: L.mapbox.marker.icon({
                          'marker-size': 'medium',
                          'marker-symbol': 'marker',
                          'marker-color': '#fa0'
                      }),
                  });
              },
              onEachFeature: function (feature, layer) {
                  layer.bindPopup(feature.properties.nom);
              }
          }).addTo(map);
      },
      error: function (error) {
          console.error('Erreur lors du chargement des données JSON : ', error);
      }
  });


{
    "monuments": [
      {
        "nom": "Tour Eiffel",
        "type": "Monument",
        "latitude": 46.7900272914847, 
        "longitude": 6.648882886579519
      
      }

      ]

      }



L.mapbox.accessToken ='pk.eyJ1IjoieW90YW13ZSIsImEiOiJjbHA0MHA3bG0xYnc4Mmlxa3BzbnV1MG9kIn0.gDTM19hR_KXwh5PQkAzsjA';

var map = L.mapbox.map('map')
.setView([46.8182, 8.2275], 8)
.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));



$.ajax({
  url: 'districts-lakes.json',
  type: 'GET',
  dataType: 'json',
  success: function (data) {
      // Ajoutez un marqueur pour chaque monument
      map.on('load', function () {
          map.addSource('monuments', {
              type: 'geojson',
              data: data
          });

          map.addLayer({
              id: 'monuments',
              type: 'symbol',
              source: 'monuments',
              layout: {
                  'icon-image': 'marker', // Remplacez par le nom de votre propre icône
                  'icon-size': 2.5,
                  'text-field': ['get', 'nom'],
                  'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                  'text-offset': [0, 0.6],
                  'text-anchor': 'top'
              }
          });
      });
  },
  error: function (error) {
      console.error('Erreur lors du chargement des données JSON : ', error);
  }
});



fetch('districts-lakes.json')
    .then(response => response.json())
    .then(data => {
        // Parcourir les données et ajouter des marqueurs sur la carte
        data.monuments.forEach(function(monument) {
            // Ajouter un marqueur à la position spécifiée
            var marker = L.marker([monument.latitude, monument.longitude])
                .addTo(map)
                .bindPopup(`
                     ${monument.nom}
                    Type: ${monument.type}
                    <img src="${monument.image}" alt="${monument.nom}" style="max-width: 100%; height: auto;">
                `)
                });
        });
  
/*    
$.ajax({
  type:'GET',
  url: 'districts-lakes.json',
  dataType: 'json',
  success: function(data) {
    // Parcourir les données JSON et ajouter des marqueurs à la carte
    data.forEach(function(location) {
      var marker = L.marker([ location.lon, location.lat]).addTo(map);
      // Vous pouvez personnaliser le popup du marqueur avec d'autres informations du JSON
      marker.bindPopup('<b>' + location.name + '</b><br>' + location.description);
    });
  }
});*/