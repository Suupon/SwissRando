<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'];
    $mdp = $_POST['mdp'];

    $con = new mysqli('localhost', 'root', 'root', 'form');

    // Sélection de l'utilisateur par son email
    $stmt = $con->prepare("SELECT Email, MDP FROM data WHERE Email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $stmt->bind_result($db_email, $db_mdp);
    $stmt->fetch();

    // Vérification du mot de passe
    if ($db_email && $mdp == $db_mdp) {
        // Mot de passe correct
        $_SESSION['email'] = $db_email;
        header('Location: accueil.html'); // Redirection vers la page d'accueil
        exit();
    } else {
        // Email ou mot de passe incorrect
        echo "Email ou mot de passe incorrect.";
    }

    $stmt->close();
    $con->close();
}
?>
