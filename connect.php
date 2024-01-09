<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $prenom = $_POST['prenom'];
    $email = $_POST['email'];
    $civilite = $_POST['civilite'];
    $mdp = $_POST['mdp'];
    /*
    // Vérification des champs obligatoires
    if (empty($name) || empty($prenom) || empty($email) || empty($civilite) || empty($mdp)) {
        die("Veuillez remplir tous les champs.");
    }

    // Vérification du format de l'e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Adresse e-mail invalide.");
    }*/

    $con = new mysqli('localhost', 'root', 'root', 'form');

    // Préparation de la requête pour éviter les injections SQL
    $stmt = $con->prepare("INSERT INTO data (Nom, Prenom, Email, Civilite, MDP) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $name, $prenom, $email, $civilite, $mdp);

    if ($stmt->execute()) {
        // Redirection vers la page de connexion après l'inscription réussie
        header('Location: login.php');
        exit();
    } else {
        die("Erreur lors de l'insertion : " . $stmt->error);
    }

    $stmt->close();
    $con->close();
}
?>

