
mapboxgl.accessToken ='pk.eyJ1IjoiaGVuZHJ5a2VseSIsImEiOiJjbHFqaHgwMzUwNHE5MmxwOTFqeG9paTZqIn0.jFmKdstMnKX-Jdrj04s8XQ'; 



var lakeData; // Variable globale pour les données GeoJSON
window.onload=  map = new mapboxgl.Map({
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
        lakeData = data; // Stockez les données chargées ici
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
                </div>

                <style> 

                .popup-content {
                    border-radius: 15px; /* Arrondir les coins */
                    background-color: rgba(255, 255, 255, 0.9); /* Fond légèrement transparent */
                    backdrop-filter: blur(10px); /* Effet de flou derrière le popup */
                    padding: 10px; /* Espace intérieur */
                  }
                  
                  .popup-content h3 {
                    text-align: center; /* Centre le texte */
                    margin: 0; /* Enlève les marges par défaut pour un alignement précis */
                    padding: 10px; /* Ajoute un peu de padding autour du texte pour l'esthétique */
                    font-size: 1.5em; /* Ajuste la taille de la police si nécessaire */
                    color: #333; /* Couleur du texte, à ajuster selon votre design */
                  }

                  .popup-content p{
                    text-align: justify;
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
                   display:none;
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
                popup.remove(); // This will remove the popup when the mouse leaves the marker
            });
        });
        
        
})
    .catch(error => {
        console.error('Erreur lors du chargement du GeoJSON:', error);
    });

    var segments = []; // Tableau pour stocker les segments de route
var nextSegmentId = 0; // Identifiant pour le prochain segment
var startCoords = null;
var coordinates = []; // Tableau pour stocker toutes les coordonnées

function onMarkerClick(marker) {
    var clickedCoordinate = marker.geometry.coordinates;
    if (!startCoords) {
        startCoords = clickedCoordinate;
    }
    if (coordinates.length > 0) {
        // Créer un nouveau segment
        var segment = {
            id: nextSegmentId++,
            start: coordinates[coordinates.length - 1],
            end: clickedCoordinate
        };
        segments.push(segment);
        updateRoute(segment);
    }
    coordinates.push(clickedCoordinate); // Ajouter au tableau général
}

function updateRoute(segment) {
    // Générer l'URL pour la requête Directions
    var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' +
              segment.start.join(',') + ';' + segment.end.join(',') +
              '?geometries=geojson&access_token=' + mapboxgl.accessToken;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            map.addSource('route-' + segment.id, {
                type: 'geojson',
                data: data.routes[0].geometry
            });

            map.addLayer({
                id: 'route-' + segment.id,
                type: 'line',
                source: 'route-' + segment.id,
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
    map.on('click', function(e) {
        var features = map.queryRenderedFeatures(e.point, { layers: segments.map(s => 'route-' + s.id) });
        if (features.length > 0) {
            var segmentId = parseInt(features[0].layer.id.replace('route-', ''));
            removeSegment(segmentId);
        }
    });

    
    
    function removeSegment(segmentId) {
        var segment = segments.find(s => s.id === segmentId);
        if (!segment) return;
    
        if (map.getLayer('route-' + segmentId)) {
            map.removeLayer('route-' + segmentId);
        }
        if (map.getSource('route-' + segmentId)) {
            map.removeSource('route-' + segmentId);
        }
    
        // Supprimer les points de début et de fin du segment de la liste des points cliqués
        coordinates = coordinates.filter(coord => 
            JSON.stringify(coord) !== JSON.stringify(segment.start) && 
            JSON.stringify(coord) !== JSON.stringify(segment.end));
    
        segments = segments.filter(s => s.id !== segmentId);
    }


    //Enregistrer l'itinéraire

    function findNearestLake(lakes, point) {
        let nearestLake = null;
        let minDistance = Number.MAX_VALUE;
    
        lakes.features.forEach(lake => {
            const lakeCoords = lake.geometry.coordinates;
            const distance = getDistance(point, lakeCoords);
    
            if (distance < minDistance) {
                nearestLake = lake;
                minDistance = distance;
            }
        });
    
        return nearestLake;
    }
    
    function getDistance(point1, point2) {
        // Calcul simple de la distance euclidienne
        const dx = point1[0] - point2[0];
        const dy = point1[1] - point2[1];
        return Math.sqrt(dx * dx + dy * dy);
    }
    


     // Genérer les tableaux d'itinéraires

     function generateRouteTables(step,index) {
        // Générer le tableau HTML pour l'itinéraire
    var tableHtml = '<table><tr><th>Etapes</th><th>Nom du Lac</th><th>Note</th></tr>';
    itinerary.forEach((step, index) => {
        tableHtml += `<tr><td>${index + 1}</td><td>${step.lakeName}</td><td><input type='text'/></td></tr>`;
    });
    tableHtml += '</table>';

    // Ajouter le tableau à l'onglet 'Classement'
    document.getElementById('tabs-2').innerHTML += tableHtml;
   
  }

  function saveRoute() {
    var itinerary = [];


    
    if (startCoords) {
        var nearestStartLake = findNearestLake(lakeData, startCoords);
        if (nearestStartLake) {
            itinerary.push({ Etape: itinerary.length + 1, lakeName: nearestStartLake.properties.name });
        }
    }

    segments.forEach(segment => {
        var endCoords = segment.end;
        var nearestLake = findNearestLake(lakeData, endCoords);
        if (nearestLake) {
            itinerary.push({ Etape: itinerary.length + 1, lakeName: nearestLake.properties.name });
        }
    });


    
    if (itinerary.length > 0) {

        
        // Générer et ajouter le tableau HTML
        var tableHtml = '<table><tr><th>Etapes</th><th>Nom du Lac</th><th>Note</th></tr>';
        itinerary.forEach((step, index) => {
            tableHtml += `<tr><td>${index+1}</td><td>${step.lakeName}</td><td><input type='number' min='1' max='5' /></td></tr>`;
        });
        tableHtml += '</table>';
        localStorage.setItem('itineraryTable', tableHtml);

    } else {
        alert("Aucun lac correspondant trouvé pour l'itinéraire.");
    }

    // Nettoyer les segments existants
    segments.forEach(segment => {
        if (map.getLayer('route-' + segment.id)) {
            map.removeLayer('route-' + segment.id);
        }
        if (map.getSource('route-' + segment.id)) {
            map.removeSource('route-' + segment.id);
        }
    });

    // Réinitialiser les données
    segments = [];
    coordinates = [];
    nextSegmentId = 0;
    startCoords = null;
}

  
 
    // Soumission des notes
    
  


    document.getElementById('save-route-btn').addEventListener('click', saveRoute);
        

    

        
            function demanderDeconnexion() {
                var confirmation = confirm("Voulez-vous vraiment vous déconnecter ?");
                if (confirmation) {
                    window.location.href = "logout.php";
                }
            }
      
    
