

document.addEventListener('DOMContentLoaded', function() {
    var tableHtml = localStorage.getItem('itineraryTable');

    if (tableHtml) {
        var container = document.getElementById('tabs-2');
        container.innerHTML = ''; // Nettoyer le contenu existant
        container.innerHTML = tableHtml; // Ajouter les itinéraires

        // Ajouter un en-tête ou un titre pour chaque itinéraire
        var tables = container.querySelectorAll('table');
        tables.forEach((table, index) => {
            var header = document.createElement('h3');
            header.textContent = 'Itinéraire ' + (index + 1);
            container.insertBefore(header, table);
        });
    }

    checkAndDisplaySubmittedNotes();

});





var reinit = document.querySelector("#reinit");

    reinit.addEventListener('click', function(){
    var confirmation = confirm("Voulez-vous vraiment =supprimer vos itinéraires ?");
    if (confirmation){
    localStorage.setItem('itineraryTable', '')
    localStorage.setItem('savedRatingsString', '')
    
    window.location.href = "itineraires.html";}

});
    
    var submitButton = document.getElementById('submit-btn'); // Assurez-vous que cet ID correspond à votre bouton

    submitButton.addEventListener('click', function submitratings() {
        // Vérifier si toutes les cases sont remplies
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
      // Collecter et sauvegarder les notes
      document.querySelectorAll('#' + tableId + ' tr').forEach((row, index) => {
        if (index > 0) {
            var lakeName = row.cells[1].innerText;
            var rating = parseInt(row.cells[2].querySelector('input').value, 10);
            ratings.push({ lakeName: lakeName, note: rating });

            // Remplacer l'input par un span
            row.cells[2].innerHTML = `<span>${rating}</span>`;
        }
    });

    // Sauvegarder les notes dans localStorage
    localStorage.setItem(tableId + '_notes', JSON.stringify(ratings));
    localStorage.setItem(tableId + '_submitted', 'true');
        var jsonRatings = JSON.stringify(ratings);
        console.log(jsonRatings);

        var tableId = localStorage.getItem('lastTableId');
        localStorage.setItem(tableId + '_submitted', 'true');

    
        fetch('Notes.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: jsonRatings
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
        // Remplacer les inputs par des textes
        ratingInputs.forEach(function(input) {
            var textSpan = document.createElement('span');
            textSpan.textContent = input.value;
            input.parentNode.replaceChild(textSpan, input);
        });
    });
    
    
 
    function checkAndDisplaySubmittedNotes() {
        var tables = document.querySelectorAll('#tabs-2 table');
    
        tables.forEach(table => {
            var tableId = table.id;
            var isSubmitted = localStorage.getItem(tableId + '_submitted') === 'true';
            var savedNotesString = localStorage.getItem(tableId + '_notes');
    
            if (isSubmitted && savedNotesString) {
                var savedNotes = JSON.parse(savedNotesString);
    
                table.querySelectorAll('tr').forEach((row, index) => {
                    if (index > 0) {
                        var lakeName = row.cells[1].innerText;
                        var savedNote = savedNotes.find(note => note.lakeName === lakeName);
    
                        if (savedNote) {
                            row.cells[2].innerHTML = `<span>${savedNote.note}</span>`;
                        }
                    }
                });
            }
        });
    }
    
            
          
            
            
            
            