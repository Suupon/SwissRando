<?php
if($_SERVER['REQUEST_METHOD']=='POST'){
    $name = $_POST['name'];
    $email = $_POST['email'];
    $civilite = $_POST['civilite'];
    $mdp = $_POST['mdp'];



$con=new mysqli('localhost', 'root', '','form');

if(con){
    //echo "Connexion réeussi";
    $sql="insert into 'data'(name, email, civilite, mdp) values ('$name','$email','$civilite','$mdp')";
    $result=mysqli_query($con,$sql);
    if($reslut){
        echo"Donnée inséré";   
    }else{
        die(mysqli_error($con));
    }

} else{
    die(mysqli_error($con));
}
}

?>