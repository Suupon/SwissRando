<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="profil_style.css">
    <link rel="stylesheet" href="accueil_css.css">
    
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
<!---------------------------- Bouton Déconnexion  ------------------------------->            
            <?php
            session_start();
            if (isset($_SESSION['email'])) {
                echo '<div id="deconnexion">';
                echo '<button class="btn-primary" id="deco"href="#" onclick="demanderDeconnexion()">Se Déconnecter</button>';
                echo '</div>';
            }
            ?>
        </div>

    </div>
<!---------------------------- Récuperer les infos de la BDD table 'data'  ------------------------------->
    <div id="information"> 
    <?php
        if (isset($_SESSION['email'])) {
            echo '<h2> BONJOUR ' .  $_SESSION['prenom'] . ' ! </h2><br><br>';
            echo '<p>Nom : ' . $_SESSION['nom'] . '</p><br>';
            echo '<p>Prénom : ' . $_SESSION['prenom'] . '</p><br>';
            echo '<p>Email : ' . $_SESSION['email'] . '</p><br>';
        } else {
            echo '<p> Connectez-vous pour afficher le profil.</p>';
        }
    ?>
    </div>

</body>
<!---------------------------- FOOTER  ------------------------------->
<footer>
            <div class="contenu">
                <div id="logo">
                    <img src="images/logo.png">
                </div>
        
                <div class = haute>
                    <div class = informations>
                        <h2>Informations</h2>
                        <ul>
                            <li><a href="formulaire.html">Contact</a></li>
                            <li><a href="#">Mentions Légales</a></li>
                            <li><a href="#">Politique de Confidentialité</a></li>
                        </ul>
                    </div>
        
                    <div class = adresse>
                        <h2>Adresse</h2>
                        <p>9, avenue de Charles de Gaulle <br>BP302 <br>23006</p>
                    </div>
                </div>
        
                <div class = basse>
                    <div class = autres>
                        <h2>Autres</h2>
                        <ul>
                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"/></svg>direction.generale@swissrando.fr</a></li>
                        <li><a href="#"><svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><style>svg{fill:#ffffff}</style><path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"/></svg>01.55.41.13.01</a></li>
                    </ul>
                    </div>
        
                    <div class="icones">
                        <a href="#"><i class="fab fa-facebook-f"></i></a>
                        <a href="#"><i class="fab fa-youtube"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-pinterest"></i></a>
                    </div>
                </div>
            </div>
           
            <div class="droit">
                <p>©2023 Tous Droits Réservés</p>
            </div>
        </footer>
    <!---------------------------- FIN FOOTER  ------------------------------->
</html>
