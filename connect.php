<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];
    $civilite = $_POST['civilite'];
    $mdp = $_POST['mdp'];

    $con = new mysqli('localhost', 'root', 'root', 'form');

    // Préparation de la requête pour éviter les injections SQL
    $stmt = $con->prepare("INSERT INTO data (Nom, Prenom, Email, Civilite, MDP) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $prenom, $email, $civilite, $mdp);

    if ($stmt->execute()) {
        // Redirection vers la page d'accueil
        header('Location: login.php');
        exit();
    } else {
        die("Erreur lors de l'insertion : " . $stmt->error);
    }

    $stmt->close();
    $con->close();
}
?>
