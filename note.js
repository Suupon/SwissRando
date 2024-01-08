

document.addEventListener('DOMContentLoaded', function() {
    var tableHtml = localStorage.getItem('itineraryTable');
    if (tableHtml) {
        document.getElementById('tabs-2').innerHTML = tableHtml;
    }
});



var submitButton = document.querySelector("#submit-btn");
    
            submitButton.addEventListener('click', function() {

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
                var ratings = [];
                var rows = document.querySelectorAll('#tabs-2 table tr');
                rows.forEach((row, index) => {
                    if (index > 0) {
                        var lakeName = row.cells[1].innerText;
                        var rating = parseInt(row.cells[2].querySelector('input').value);
                        ratings.push({ lakeName: lakeName, note: rating });
                    }
                });
            
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
            