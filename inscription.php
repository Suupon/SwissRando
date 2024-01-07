<?php 
session_start ();
 //$bdd = new PDO ('mysql:host=localhost; dbname= espace_utilisateurs; charset = utf8;', 'root', '');
if (isset($_POST['valider'])){
    if(!empty($_POST['pseudo']) AND !empty($_POST['mdp']) AND !empty($_POST['nom']) AND !empty($_POST['prenom']) AND !empty($_POST['age'])
    AND !empty($_POST['email'])){
        $civilite = htmlspecialchars($_POST['civilite']);
        $pseudo = htmlspecialchars($_POST['pseudo']);
        $mdp = sha1($_POST['mdp']);
        $nom = htmlspecialchars($_POST['nom']);
        $prenom = htmlspecialchars($_POST['prenom']);
        $age= htmlspecialchars($_POST['age']);
        $email = htmlspecialchars($_POST['email']);

        $insertUser = $bdd->prepare('INSERT INTO users(pseudo,mdp,nom,prenom,age,civilite,email) VALUES (?,?,?,?,?,?,?)');
        $insertUser-> execute(array($pseudo, $mdp));

        $recupUser = $bdd->prepare('SELECT *FROM users WHERE pseudo = ? AND mdp = ?');
        if($recupUser-> rowCount > 0) {
            $_SESSION['pseudo']= $pseudo;
            $_SESSION['mdp']= $mdp;
            $_SESSION['nom']= $nom;
            $_SESSION['prenom']= $prenom;
            $_SESSION['civilite']= $civilite;
            $_SESSION['email']= $email;
            $_SESSION['age']= $age;
            $_SESSION['id']= $recupUser-> fetch()['id'];    

        }
        echo $_SESSION['id'];

    }else{
        echo "Veuillez complétez tous les champs ";
    }
}
?>
<!DOCTYPE html> 
<html>
    <head>
    <title>Inscription</title>
    <meta charset="utf-8">
    </head>
    <body>
        <h1>INSCRIVEZ-VOUS</h1>
 
        <form method= POST name="inscription" action= "" align= "center">
 
            <h2>Veuillez saisir vos données :</h2>

            <input type="radio" name="civilite" value="M">M.
            <input type="radio" name="civilite" value="Mme">Mme
            <input type="radio" name="civilite" value="Mlle">Mlle <br/>
            Nom : <input type="text" name="nom" placeholder= "indiquer votre Nom"> <br/>
            Prenom :<input type="text" name="prenom" placeholder= "indiquer votre Prénom"> <br/>
            Age : <input type="text" name="age" placeholder= "indiquer votre Age"> <br/>
            Mail : <input type="email" name="email" placeholder= "indiquer votre E-mail" > <br/>
            Pseudo :<input type="text" name="pseudo" placeholder= "indiquer votre Nom d'utilisateur" autocomplete= "off"> <br/>
            Password : <input type="password" name="mdp" placeholder= "indiquer votre Mot de Passe" autocomplete= "off"> <br/>
 
            <input type="submit" name="valider" value="OK"/>
 
        </form>
        
    </body>
</html>