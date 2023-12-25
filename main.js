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



    mapboxgl.accessToken ='pk.eyJ1IjoiaGVuZHJ5a2VseSIsImEiOiJjbHFqaHgwMzUwNHE5MmxwOTFqeG9paTZqIn0.jFmKdstMnKX-Jdrj04s8XQ'; 
   

      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [8.2275, 46.8182],
          zoom: 8
      });

      var coordinates = []; // Liste des coordonnées des points cliqués

      fetch('lacs.json') // Remplacer par le chemin réel du fichier GeoJSON
    .then(response => response.json())
    .then(data => {
        map.on('load', function() {
            // Charger une image pour le marqueur personnalisé
            map.loadImage('Map-Marker-Download-Free-PNG.png', function(error, image) {
                if (error) throw error;
                map.addImage('custom-marker', image);

                // Ajouter les données GeoJSON comme une source
                map.addSource('markers', {
                    type: 'geojson',
                    data: data
                });

                // Ajouter une couche utilisant l'image personnalisée pour les marqueurs
                map.addLayer({
                    id: 'markers',
                    type: 'symbol',
                    source: 'markers',
                    layout: {
                        'icon-image': 'custom-marker',
                        'icon-size': 0.5
                        // Vous pouvez ajouter d'autres options de mise en page ici
                    }
                });
            });

            // Ajouter un gestionnaire de clic si nécessaire
            map.on('click', 'markers', function(e) {
                // Actions à effectuer lorsqu'un marqueur est cliqué
                // par exemple, afficher un popup
            });

            // Modifier le curseur lorsqu'il passe sur un marqueur
            map.on('mouseenter', 'markers', function() {
                map.getCanvas().style.cursor = 'pointer';
            });
            map.on('mouseleave', 'markers', function() {
                map.getCanvas().style.cursor = '';
            });
        });
    })
    .catch(error => {
        console.error('Erreur lors du chargement du GeoJSON:', error);
    });

      function onMarkerClick(marker) {
          var clickedCoordinate = marker.geometry.coordinates;

          // Ajouter la nouvelle coordonnée à la liste des coordonnées des points
          coordinates.push(clickedCoordinate);

          // Mettre à jour le tracé
          updateRoute();
      }

      function updateRoute() {
          // Si la couche de tracé existe, la supprimer
          if (map.getLayer('route')) {
              map.removeLayer('route');
          }

          // Si la source de tracé existe, la supprimer
          if (map.getSource('route')) {
              map.removeSource('route');
          }

          // Si nous avons au moins deux points, créer un tracé
          if (coordinates.length >= 2) {
              var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + coordinates.join(';') +
                        '?geometries=geojson&access_token=' + mapboxgl.accessToken;

              // Effectuer la requête Directions
              fetch(url)
                  .then(response => response.json())
                  .then(data => {
                      // Ajouter la source du tracé
                      map.addSource('route', {
                          type: 'geojson',
                          data: {
                              type: 'Feature',
                              properties: {},
                              geometry: data.routes[0].geometry
                          }
                      });

                      // Ajouter la couche de tracé
                      map.addLayer({
                          id: 'route',
                          type: 'line',
                          source: 'route',
                          layout: {
                              'line-join': 'round',
                              'line-cap': 'round'
                          },
                          paint: {
                              'line-color': '#007cbf',
                              'line-width': 2
                          }
                      });
                  })
                  .catch(error => {
                      console.error('Erreur lors de la requête Directions:', error);
                  });
          }
      }




// Version avec leaflet pour avoir un bon marqeur mais le chemain ne s'affiche pas 

/*
L.mapbox.accessToken = 'pk.eyJ1IjoiaGVuZHJ5a2VseSIsImEiOiJjbHFqaHgwMzUwNHE5MmxwOTFqeG9paTZqIn0.jFmKdstMnKX-Jdrj04s8XQ'; 
 

var map = L.mapbox.map('map')
    .setView([46.8182, 8.2275], 8)
    .addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

var coordinates = []; // Liste des coordonnées des points cliqués

// Charger les données GeoJSON et ajouter des marqueurs
fetch('lacs.geojson') // Remplacer par le chemin réel du fichier GeoJSON
    .then(response => response.json())
    .then(data => {
        var markerGroup = L.layerGroup().addTo(map);

        L.geoJSON(data, {
            pointToLayer: function(feature, latlng) {
                return L.marker(latlng, {
                    icon: L.mapbox.marker.icon(),
                });
            },
            onEachFeature: function(feature, layer) {
                layer.on('click', function() {
                    onMarkerClick(layer);
                });
                markerGroup.addLayer(layer);
            }
        });

    })
    .catch(error => {
        console.error('Erreur lors du chargement du GeoJSON:', error);
    });

function onMarkerClick(marker) {
    var clickedCoordinate = marker.getLatLng();

    // Ajouter la nouvelle coordonnée à la liste des coordonnées des points
    coordinates.push([clickedCoordinate.lng, clickedCoordinate.lat]);

    // Mettre à jour le tracé
    updateRoute();
}

function updateRoute() {
    // Si la couche de tracé existe, la supprimer
    if (map.hasLayer('route')) {
        map.removeLayer('route');
    }

    // Si nous avons au moins deux points, créer un tracé
    if (coordinates.length >= 2) {
        var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + coordinates.join(';') +
                  '?geometries=geojson&access_token=' + L.mapbox.accessToken;

        // Effectuer la requête Directions
        fetch(url)
            .then(response => response.json())
            .then(data => {
                var route = L.geoJSON(data.routes[0].geometry, {
                    style: {
                        color: '#007cbf',
                        weight: 2
                    }
                }).addTo(map);

                // Ajouter la couche de tracé
                route.addTo(map).bindPopup('Distance: ' + (data.routes[0].distance / 1000).toFixed(2) + ' km');
            })
            .catch(error => {
                console.error('Erreur lors de la requête Directions:', error);
            });
    }
}

*/