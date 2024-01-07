<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="form.css">
    <title>inscription</title>
</head>

<body> 
    <div class = "container"> 
     <form action="connect.php" method="post">   
    </div>

    <div>
    <label>Civilité</label>
    <input type="radio" name= "civilite">Mr
    <input type="radio" name= "civilite">Mme
    </div>
    <br> </br>
    <div>
    <label>Nom</label>
    <input type="text" name= "name" placeholder = "Entrer votre nom">
    </div>

    <div>
    <label>Prénom</label>
    <input type="text" name= "prenom" placeholder = "Entrer votre prénom">
    </div>

    <div>
    <label>Email</label>
    <input type="text" name= "email" placeholder = "Entrer votre email">
    </div>

    <div>
    <label>Mot de Passe </label>
    <input type="password" name= "mdp" placeholder = "Entrer votre Mot de passe">
    </div>

    <div class="btn">
        <button type= "submit"> Envoyer </button>
    </div>
</body>
</html>