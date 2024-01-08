<?php
session_start();
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $mdp = $_POST['mdp'];

    $con = new mysqli('localhost', 'root', 'root', 'form');

    // Vérification de la connexion à la base de données
    if ($con->connect_error) {
        die("Échec de la connexion à la base de données: " . $con->connect_error);
    }

    // Sélection de l'utilisateur par son email
    $stmt = $con->prepare("SELECT Email, MDP, Nom, Prenom, Civilite FROM data WHERE Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($db_email, $db_mdp, $db_nom, $db_prenom, $db_civilite);
    $stmt->fetch();

    // Vérification du mot de passe
    if ($db_email && $mdp == $db_mdp) {
        // Mot de passe correct
        $_SESSION['email'] = $db_email;
        $_SESSION['nom'] = $db_nom;
        $_SESSION['prenom'] = $db_prenom;
        $_SESSION['civilite'] = $db_civilite;

        // Redirection vers la page d'accueil
        header('Location: accueil.html');
        exit();
    } else {
        // Email ou mot de passe incorrect
        echo "Email ou mot de passe incorrect.";
    }

    $stmt->close();
    $con->close();
}
?>
