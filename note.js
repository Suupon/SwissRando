

document.addEventListener('DOMContentLoaded', function() {
    var tableHtml = localStorage.getItem('itineraryTable');

    if (tableHtml) {
        var container = document.getElementById('tabs-2');
        container.innerHTML = ''; 
        container.innerHTML = tableHtml; 

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
    
    var submitButton = document.getElementById('submit-btn'); 

    submitButton.addEventListener('click', function submitratings() {
        // Vérification que toutes les cases sont remplies
        var ratingInputs = document.querySelectorAll('#tabs-2 table input[type="number"]');
        var allFilled = true;
    
        ratingInputs.forEach(function(input) {
            if (!input.value) {
                allFilled = false;
            }
        });
    
        if (!allFilled) {
            alert("Veuillez remplir toutes les notes avant de soumettre.");
            return; 
        }
    
        var ratings = [];
        var tableId = localStorage.getItem('lastTableId');
        var rows = document.querySelectorAll('#' + tableId + ' tr');
    
        rows.forEach((row, index) => {
            if (index > 0) { 
                var lakeName = row.cells[1].innerText.trim();
                var inputElement = row.cells[2].querySelector('input');
                if (inputElement) {
                    var rating = parseInt(inputElement.value, 10);
                    ratings.push({ lakeName: lakeName, note: rating });
                    row.cells[2].innerHTML = `<span>${rating}</span>`; 
                }
            }
        });
    
        // Sauvegarde des notes dans localStorage
        localStorage.setItem(tableId + '_notes', JSON.stringify(ratings));
        localStorage.setItem(tableId + '_submitted', 'true');
    
        // Envoi des notes au serveur
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
    });
    
    
 
    function checkAndDisplaySubmittedNotes() {
        var tables = document.querySelectorAll('#tabs-2 table');
    
        tables.forEach(table => {
            var tableId = table.id;
            var isSubmitted = localStorage.getItem(tableId + '_submitted') === 'true';
            var savedNotesString = localStorage.getItem(tableId + '_notes');
    
            if (isSubmitted && savedNotesString) {
                var savedNotes = JSON.parse(savedNotesString);
                var rows = table.querySelectorAll('tr');
    
                rows.forEach((row, index) => {
                    if (index > 0) {
                        var lakeName = row.cells[1].innerText.trim();
                        var savedNote = savedNotes.find(note => note.lakeName === lakeName);
    
                        if (savedNote) {
                            row.cells[2].innerHTML = `<span>${savedNote.note}</span>`; // Afficher la note en tant que texte
                        }
                    }
                });
            }
        });
    }
    
  
    
            
            
            
            