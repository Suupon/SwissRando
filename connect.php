<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $civilite = $_POST['civilite'];
    $mdp = $_POST['mdp'];

    $con = new mysqli('localhost', 'root', 'root', 'form');

    if ($con->connect_error) {
        die("Connexion échouée : " . $con->connect_error);
    }

    // Préparation de la requête pour éviter les injections SQL
    $stmt = $con->prepare("INSERT INTO data (name, email, civilite, mdp) VALUES (?, ?, ?, ?)");
    $hashed_mdp = password_hash($mdp, PASSWORD_DEFAULT); // Hashage du mot de passe
    $stmt->bind_param("ssss", $name, $email, $civilite, $hashed_mdp);

    if ($stmt->execute()) {
        echo "Donnée insérée";
    } else {
        die("Erreur lors de l'insertion : " . $stmt->error);
    }

    $stmt->close();
    $con->close();
}
?>
