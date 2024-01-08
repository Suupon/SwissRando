var submitButton = document.querySelector("#submit-btn");
console.log(submitButton)
            submitButton.addEventListener('click', function submitratings() {

                //Vérifie si toutes les case sont remplies
                var ratingInputs = document.querySelectorAll('#tabs-2 table input[type="number"]');
                var allFilled = true;

                ratingInputs.forEach(function(input) {
                    if (!input.value) {
                        allFilled = false;
                    }
                });

                if (!allFilled) {
                    alert("Veuillez remplir toutes les notes avant de soumettre.");
                    return; // Arrête l'exécution de la fonction
                }
                console.log("jsuis ici")
                var ratings = [];
                var rows = document.querySelectorAll('#tabs-2 table tr');
                rows.forEach((row, index) => {
                    if (index > 0) { // Ignorer l'en-tête du tableau
                        var lakeName = row.cells[1].innerText;
                        var rating = row.cells[2].querySelector('input').value;
                        ratings.push({ lakeName: lakeName, note: rating });
                    }
                });
                var jsonRatings = JSON.stringify(ratings);
                console.log(jsonRatings).
               
                fetch('Notes.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: jsonRatings // les données collectées
                })
                .then(response => response.json())
                .then(data => {
                    // Traiter la réponse du serveur ici
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