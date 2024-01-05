
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
      
       // Modifier le curseur lorsqu'il passe sur un marqueur
       map.on('mouseenter', 'markers', function(e) {
        map.getCanvas().style.cursor = 'pointer';
        // Assurez-vous que les propriétés sont présentes
        if (!e.features.length) {
            return;
        }

        var coordinates = e.features[0].geometry.coordinates.slice();
        var lacName = e.features[0].properties.name; // Assurez-vous que vos données GeoJSON ont une propriété 'description'
        var description = e.features[0].properties.description; // Propriété 'description'
        var imageUrl = e.features[0].properties.imageUrl; // Propriété 'imageUrl' pour l'image du lac
       

        var popupContent = `
            <div class="popup-content">
                <h3>${lacName}</h3>
                <img src= ${imageUrl} alt="${lacName}" style="max-width:100%;"/>
                <p>${description}</p>
                <label for="rating">Notez votre experience:</label>
                <input type="number" id="rating" name="rating" min="1" max="5">
            </div>
        `;

        // Assurer que les popups s'affichent au-dessus des marqueurs
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        
           
        new mapboxgl.Popup()
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map); 

        map.on('mouseleave', 'markers', function() {
            map.getCanvas().style.cursor = '';
            popup.remove();
        });



    })
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
                        'line-color': '#B63E24',
                        'line-width': 5
                    }
                });
            })
            .catch(error => {
                console.error('Erreur lors de la requête Directions:', error);
            });
    }
}


var popup = new mapboxgl.Popup({
  closeButton: false,
  closeOnClick: false
});



