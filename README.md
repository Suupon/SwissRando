# 🌍 Carte Interactive - Gestion des Itinéraires et Lacs

## 📌 Description  
Ce projet est une **application web interactive** permettant d'explorer une carte dynamique avec Mapbox, de sauvegarder des itinéraires et de consulter une galerie de lacs. Il utilise **PHP et MySQL** pour la gestion des utilisateurs et des itinéraires, et **JavaScript** pour la manipulation de la carte et des classements.

---

## 🚀 Fonctionnalités  

✅ **Carte interactive** avec **Mapbox** 📌  
✅ **Sauvegarde et gestion d’itinéraires** 🚊  
✅ **Classement des lacs** en fonction des notes, superficie et nombre de visites 📊  
✅ **Galerie photo** triable par lieu 📷  
✅ **Système de connexion et déconnexion** 🔑  
✅ **Notation et commentaires** sur les lacs ⭐  

---

## 🛠️ Technologies utilisées  

- **Frontend** : HTML, CSS, JavaScript (jQuery, Mapbox GL JS)  
- **Backend** : PHP, MySQL  
- **Base de données** : phpMyAdmin  
- **API utilisée** : Mapbox  

---

## 👅 Installation  

### 1️⃣ **Cloner le dépôt**  
```bash
git clone https://github.com/ton-utilisateur/nom-du-repo.git
cd nom-du-repo
```

### 2️⃣ **Configuration de la base de données**  
- Importer le fichier `database.sql` dans **phpMyAdmin**  
- Vérifier les identifiants dans `connect.php`  
```php
$host = "localhost";
$user = "root";
$password = "";
$database = "nom_de_ta_base";
$conn = mysqli_connect($host, $user, $password, $database);
```

### 3️⃣ **Lancer le serveur PHP**  
Si tu utilises **XAMPP**, place les fichiers dans `htdocs/` et démarre **Apache & MySQL**.  
Sinon, utilise un serveur local avec :  
```bash
php -S localhost:8000
```

---

## 📌 Utilisation  

🌍 **Carte Interactive** :  
- Cliquer sur la **Carte** pour explorer les lacs.  
- Enregistrer un itinéraire avec **"Enregistrer Mon itinéraire"**.  

📊 **Classement des lacs** :  
- Trier par **Nom, Note, Superficie ou Nombre de visites**.  

📷 **Galerie photo** :  
- Trier par lieu pour voir les lacs correspondants.  

🔑 **Connexion** :  
- Se connecter via `login.php` et gérer son profil.  

---

## ✅ Exemples de fonctionnalités  

🚊 **Ajout d’un itinéraire** en PHP :  
```php
if(isset($_POST['itineraire'])) {
    $nom = $_POST['nom'];
    $coordonnees = $_POST['coordonnees'];
    $query = "INSERT INTO itineraires (nom, coordonnees) VALUES ('$nom', '$coordonnees')";
    mysqli_query($conn, $query);
}
```

📊 **Tri des lacs en JavaScript** :  
```js
features.sort((a, b) => {
    return a.properties.superficie - b.properties.superficie;
});
```

🔑 **Connexion utilisateur** en PHP :  
```php
session_start();
if(isset($_POST['login'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];
    $query = "SELECT * FROM users WHERE username='$username' AND password='$password'";
    $result = mysqli_query($conn, $query);
    if(mysqli_num_rows($result) > 0) {
        $_SESSION['user'] = $username;
    }
}
```

---

## 👨‍💻 Auteur  

- **[Ton Nom]** - [GitHub](https://github.com/ton-utilisateur)  

---


