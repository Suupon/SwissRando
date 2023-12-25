
    mapboxgl.accessToken ='pk.eyJ1IjoiaGVuZHJ5a2VseSIsImEiOiJjbHFqaHgwMzUwNHE5MmxwOTFqeG9paTZqIn0.jFmKdstMnKX-Jdrj04s8XQ'; 
   

      var map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [8.2275, 46.8182],
          zoom: 8
      });

      var coordinates = []; // Liste des coordonnées des points cliqués

      // Charger les données GeoJSON et ajouter des marqueurs
      fetch('lacs.json') // Remplacer par le chemin réel du fichier GeoJSON
          .then(response => response.json())
          .then(data => {
              map.on('click', function(e) {
                  var features = map.queryRenderedFeatures(e.point, {
                      layers: ['markers']
                  });

                  if (features.length === 1) {
                      onMarkerClick(features[0]);
                  }
              });

              map.addSource('markers', {
                  type: 'geojson',
                  data: data
              });

              map.addLayer({
                  id: 'markers',
                  type: 'circle',
                  source: 'markers',
                  paint: {
                      'circle-radius': 10,
                      'circle-color': '#007cbf'
                  }
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




