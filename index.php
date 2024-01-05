<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>inscription</title>
</head>

<body> 
    <div class = "container"> 
     <form action="connect.php" method="post">   
    </div>

    <div>
    <label>Name</label>
    <input type="text" name= "name" placeholder = "Entrer votre nom">
    </div>

    <div>
    <label>Email</label>
    <input type="text" name= "email" placeholder = "Entrer votre email">
    </div>

    <div>
    <label>Civilite</label>
    <input type="radio" name= "civilite">Mr
    <input type="radio" name= "civilite">Mme
    </div>

    div>
    <label>Mdp</label>
    <input type="password" name= "mdp" placeholder = "Entrer votre Mot de passe">
    </div>
</body>
</html>