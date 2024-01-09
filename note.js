

document.addEventListener('DOMContentLoaded', function() {
    var tableHtml = localStorage.getItem('itineraryTable');
    displaySavedRatings();
    if (tableHtml) {
        document.getElementById('tabs-2').innerHTML = tableHtml;
    }
});





var submitButton = document.querySelector("#submit-btn");

var reinit = document.querySelector("#reinit");

    reinit.addEventListener('click', function(){
    var confirmation = confirm("Voulez-vous vraiment =supprimer vos itinéraires ?");
    if (confirmation){
    localStorage.setItem('itineraryTable', '')
    window.location.href = "itineraires.html";}

});
    
            submitButton.addEventListener('click', function() {

                  //Vérifie si toutes les case sont remplies
                  var submitButton = document.getElementById('submit-btn'); // Assurez-vous que cet ID correspond à votre bouton

                  submitButton.addEventListener('click', function() {
                      // Récupérer l'identifiant du dernier tableau soumis
                      var tableId = localStorage.getItem('lastTableId');
                  
                      // Récupérer les notes du tableau actuel
                      var ratings = [];
                      var rows = document.querySelectorAll('#tabs-2 table tr');
                  
                      rows.forEach((row, index) => {
                          if (index > 0) { // Ignorer l'en-tête du tableau
                              var lakeName = row.cells[1].innerText.trim();
                              var inputElement = row.cells[2].querySelector('input');
                              if (inputElement) {
                                  var rating = parseInt(inputElement.value, 10); // Assurez-vous que la note est un nombre
                                  ratings.push({ lakeName: lakeName, note: rating });
                              }
                          }
                      });
                  
                      // Récupérer les notes enregistrées précédemment et ajouter les nouvelles notes
                      var savedRatingsString = localStorage.getItem('savedRatings');
                      var savedRatings = savedRatingsString ? JSON.parse(savedRatingsString) : {};
                      savedRatings[tableId] = { tableId: tableId, ratings: ratings };
                  
                      // Enregistrer les notes mises à jour dans localStorage
                      localStorage.setItem('savedRatings', JSON.stringify(savedRatings));
                 
                
                  
            
                fetch('Notes.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(ratings)
                })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });


                ratingInputs.forEach(function(input) {
                    var textSpan = document.createElement('span');
                    textSpan.textContent = input.value;
                    input.parentNode.replaceChild(textSpan, input);
                });
            });

        });


            function displaySavedRatings() {
                var savedRatingsString = localStorage.getItem('savedRatings');
                console.log("Saved Ratings from localStorage:", savedRatingsString); // Afficher pour le débogage
                if (savedRatingsString) {
                    var savedRatingsObj = JSON.parse(savedRatingsString);
                    var tableId = savedRatingsObj.tableId; // L'identifiant du tableau pour lequel les notes ont été enregistrées
                    var savedRatings = savedRatingsObj.ratings;
            
                    // Trouver le tableau spécifique par son ID et mettre à jour ses notes
                    var table = document.getElementById(tableId);
                    if (table) {
                        var rows = table.querySelectorAll('tr');
                        rows.forEach((row, index) => {
                            if (index > 0) { // Ignorer l'en-tête du tableau
                                var lakeName = row.cells[1].innerText.trim();
                                var savedRating = savedRatings.find(rating => rating.lakeName === lakeName);
            
                                if (savedRating) {
                                    var textSpan = document.createElement('span');
                                    textSpan.textContent = savedRating.note;
                                    var inputCell = row.cells[2];
                                    inputCell.innerHTML = '';
                                    inputCell.appendChild(textSpan);
                                }
                            }
                        });
                    }
                }
            }
            
            document.addEventListener('DOMContentLoaded', displaySavedRatings);
            
            
            
            