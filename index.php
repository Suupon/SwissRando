<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="formu.css">
    <title>inscription</title>
</head>

<body> 

    <div class="titre"> 
        <h1>
            SWIS'sRANDO
        </h1>
    </div>

    <div class = "container"> 
        <form action="connect.php" method="post">   


            <div class="civ">
                <label>Civilité</label>
                <input type="radio" name= "civilite"><label>Mr</label>
                <input type="radio" name= "civilite"><label>Mme</label>
            </div>
           
            <div class="nom">
                <label>Nom</label>
                <input type="text" name= "name" placeholder = "Entrer votre nom">
            </div>

            <div class="prenom">
                <label>Prénom</label>
                <input type="text" name= "prenom" placeholder = "Entrer votre prénom">
            </div>

            <div class="mail">
                <label>Email</label>
                <input type="text" name= "email" placeholder = "Entrer votre email">
            </div>

            <div class="mdp">
                <label>Mot de Passe </label>
                <input type="password" name= "mdp" placeholder = "Entrer votre Mot de passe">
            </div>

            <div class="btn">
                <button type= "submit"> Envoyer </button>
            </div>
    
        </form>
    </div>
</body>
</html>