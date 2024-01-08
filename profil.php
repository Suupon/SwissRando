<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="profil.css">
    <script>
        function demanderDeconnexion() {
            var confirmation = confirm("Voulez-vous vraiment vous déconnecter ?");
            if (confirmation) {
                window.location.href = "logout.php";
            }
        }
    </script>
</head>
<body> 

    <div class="banner">
        <img src="images/bannière.png" alt="Bannière">
    
        <div id="profil"> 
            <a href="accueil.html"><u> Retour Page d'Accueil >> </u></a>
            
            <?php
            session_start();
            if (isset($_SESSION['email'])) {
                echo '<div id="deconnexion">';
                echo '<a href="#" onclick="demanderDeconnexion()">Se Déconnecter</a>';
                echo '</div>';
            }
            ?>
        </div>

    </div>

    <div id="information"> 
    <?php
        if (isset($_SESSION['email'])) {
            echo '<h2> BONJOUR ' .  $_SESSION['prenom'] . ' ! </h2><br><br>';
            echo '<p>Nom : ' . $_SESSION['nom'] . '</p><br>';
            echo '<p>Prénom : ' . $_SESSION['prenom'] . '</p><br>';
            echo '<p>Email : ' . $_SESSION['email'] . '</p><br>';
            // Vous pouvez ajouter d'autres informations du profil si nécessaire
        } else {
            echo '<p> Connectez-vous pour afficher le profil.</p>';
        }
    ?>
    </div>

</body>
</html>
