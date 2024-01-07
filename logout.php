<?php
session_start();
session_unset();
session_destroy();
header("Location: login.php"); // Remplacez index.php par la page de connexion
exit();
?>
