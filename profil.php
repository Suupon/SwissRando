<?php
        session_start();
        if (isset($_SESSION['email'])) {
            echo '<h2>Profil de ' . $_SESSION['email'] . '</h2>';
            echo '<p>Nom : ' . $_SESSION['nom'] . '</p>';
            echo '<p>Prénom : ' . $_SESSION['prenom'] . '</p>';
            echo '<p>Civilité : ' . $_SESSION['civilite'] . '</p>';
            // Vous pouvez ajouter d'autres informations du profil si nécessaire
        } else {
            echo '<p>Connectez-vous pour afficher le profil.</p>';
        }
        ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="profil.css">
   
</head>
</html>