
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
      
        map.on('mouseenter', 'markers', function(e) {
            map.getCanvas().style.cursor = 'pointer';
            if (!e.features.length) {
                return;
            }
            
            var coordinates = e.features[0].geometry.coordinates.slice();
            var lacName = e.features[0].properties.name;
            var description = e.features[0].properties.description;
            var imageUrl = e.features[0].properties.imageUrl;
            
            var popupContent = `
                <div class="popup-content">
                    <h3>${lacName}</h3>
                    <img src="${imageUrl}" alt="${lacName}" style="max-width:100%;"/>
                    <p>${description}</p>
                    <label for="rating">Notez votre experience:</label>
                    <input type="number" id="rating" name="rating" min="1" max="5">
                    <button onclick="submitRating()">Soumettre</button>
                </div>

                <style> 

                .popup-content {
                    border-radius: 10px; /* Arrondir les coins */
                    background-color: rgba(255, 255, 255, 0.9); /* Fond légèrement transparent */
                    backdrop-filter: blur(10px); /* Effet de flou derrière le popup */
                   
                    padding: 15px; /* Espace intérieur */
                  }
                  
                  .popup-content h3 {
                    text-align: center; /* Centre le texte */
                    margin: 0; /* Enlève les marges par défaut pour un alignement précis */
                    padding: 10px; /* Ajoute un peu de padding autour du texte pour l'esthétique */
                    font-size: 1.5em; /* Ajuste la taille de la police si nécessaire */
                    color: #333; /* Couleur du texte, à ajuster selon votre design */
                  }
                  /* Style pour l'image à l'intérieur du popup pour éviter le débordement */
                  .popup-content img {
                    max-width: 100%;
                    height: auto;
                    border-radius: 5px; /* Coins arrondis pour l'image */
                    margin-bottom: 10px; /* Espace en dessous de l'image */
                  }
                  
                  /* Style pour l'entrée de notation */
                  .popup-content input[type="number"] {
                    width: 100%; /* Prend toute la largeur disponible */
                    padding: 5px; /* Espace intérieur */
                    margin-top: 10px; /* Espace au-dessus de l'entrée */
                    border: 1px solid #ccc; /* Bordure subtile */
                    border-radius: 5px; /* Coins arrondis pour l'entrée */
                  }
                  
                  /* Style pour le bouton de soumission de la note */
                  .popup-content input[type="submit"] {
                    background-color: #007bff; /* Couleur de fond */
                    color: white; /* Couleur du texte */
                    border: none; /* Pas de bordure */
                    padding: 10px 20px; /* Espace intérieur */
                    text-transform: uppercase; /* Texte en majuscules */
                    margin-top: 10px; /* Espace au-dessus du bouton */
                    cursor: pointer; /* Curseur en forme de main */
                    border-radius: 5px; /* Coins arrondis pour le bouton */
                    transition: background-color 0.3s ease; /* Transition pour le survol */
                  }
                  
                  /* Effet de survol pour le bouton */
                  .popup-content input[type="submit"]:hover {
                    background-color: #0056b3; /* Couleur de fond plus foncée lors du survol */
                  }

                  .mapboxgl-popup-close-button {
                    font-size: 64px; /* Taille plus grande pour la croix */
                    color: #007bff; /* Couleur de la croix */
                    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.7); /* Ombre pour améliorer la visibilité */
                    opacity: 0.8; /* Légèrement transparente pour s'intégrer avec le design */
                    margin-right : 5%;
                    margin-top: 5%;
                  }
                  
                  .mapboxgl-popup-close-button:hover {
                    color: #0056b3; /* Couleur au survol */
                    opacity: 1; /* Opacité totale au survol */
                    cursor: pointer; /* Curseur en forme de main pour indiquer un élément cliquable */
                  }
                  
                 </style> 
            `;
            
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }
            
            var popup = new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(popupContent)
                .addTo(map);
            
            map.on('mouseleave', 'markers', function() {
                map.getCanvas().style.cursor = '';
                //popup.remove(); // This will remove the popup when the mouse leaves the marker
            });
        });
        
        function submitRating() {
            var rating = document.getElementById('rating').value;
            // Code here to handle the rating submission
            console.log("Rating submitted: " + rating);
        }
        
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


