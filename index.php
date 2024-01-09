<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="form.css">
    <title>inscription</title>
    <script>
    function validateForm() {
        var civiliteSelected = false;

        // Vérifiez chaque bouton de civilité
        var civiliteButtons = document.getElementsByName('civilite');
        for (var i = 0; i < civiliteButtons.length; i++) {
            if (civiliteButtons[i].checked) {
                civiliteSelected = true;
                break;
            }
        }

        // Affiche un message d'erreur si la civilité n'est pas sélectionnée
        if (!civiliteSelected) {
            alert("Veuillez choisir une civilité.");
            return false; // Empêche la soumission du formulaire
        }

        // Vérifiez les autres champs
        var name = document.getElementsByName('name')[0].value;
        var prenom = document.getElementsByName('prenom')[0].value;
        var email = document.getElementsByName('email')[0].value;
        var mdp = document.getElementsByName('mdp')[0].value;

        // Vérifiez si tous les champs sont remplis
        if (name === '' || prenom === '' || email === '' || mdp === '') {
            alert("Veuillez remplir tous les champs.");
            return false; // Empêche la soumission du formulaire
        }

        // Vérifiez le format de l'adresse e-mail
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Adresse e-mail invalide.");
            return false; // Empêche la soumission du formulaire
        }

        // Permet la soumission du formulaire si toutes les vérifications sont réussies
        return true;
    }
</script>



</head>

<body> 

    <div class="titre"> 
        <h1>
            SWIS'sRANDO
        </h1>
    </div>

    <div class = "container"> 
        <form action="connect.php" method="post" onsubmit="return validateForm()">   


            <div class="civ">
                <label></label>
                <input type="radio" name= "civilite"><label>Mr</label>
                <input type="radio" name= "civilite"><label>Mme</label>
            </div>
           
            <div class="nom">
                <label></label>
                <input type="text" name= "name" placeholder = "Entrer votre nom">
            </div>

            <div class="prenom">
                <label></label>
                <input type="text" name= "prenom" placeholder = "Entrer votre prénom">
            </div>

            <div class="mail">
                <label></label>
                <input type="text" name= "email" placeholder = "Entrer votre email">
            </div>

            <div class="mdp">
                <label> </label>
                <input type="password" name= "mdp" placeholder = "Entrer votre Mot de passe">
            </div>

            <div class="btn">
                <button type= "submit"> Envoyer </button>
            </div>
    
        </form>
        <p> Vous n'avez déja un compte ? <a href="login.php">Se connecter</a></p>
    </div>

</body>
</html>

