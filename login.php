<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="form.css">
    <title>Connexion</title>
</head>
<body>
    <div class="titre"> 
        <h1>
            SWIS'sRANDO
        </h1>
    </div>
    <div class="container">
        <form action="login_process.php" method="post">
            <div>
                <label>Email</label>
                <input type="text" name="email" placeholder="Entrer votre email">
            </div>

            <div>
                <label>Mot de Passe</label>
                <input type="password" name="mdp" placeholder="Entrer votre Mot de passe">
            </div>

            <div class="btn">
                <button type="submit">Se Connecter</button>
            </div>
        </form>

        
    </div>
</body>
</html>
