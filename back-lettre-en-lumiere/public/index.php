<?php
// public/index.php

require_once '../src/controllers/UserController.php';
require_once '../src/models/Database.php';
require_once '../src/App.php'; // Ajoutez cette ligne si nécessaire

// Chemin vers la base de données SQLite
$db_file = '../db.sqlite';

// Créez une instance de la classe Database
$db = new Database($db_file);

// Créez une instance de l'application en utilisant la base de données
$app = new App($db);

// Créez une instance du contrôleur utilisateur en passant l'application
$userController = new UserController($app);

// Vérifiez si une action est spécifiée dans l'URL
$action = $_GET['action'] ?? '';

// Utilisez le contrôleur utilisateur en fonction de l'action spécifiée
switch ($action) {
    case 'showAllUsers':
        $userController->showAllUsers();
        break;
    case 'addUser':
        // Vérifiez si le formulaire a été soumis
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Récupérez les valeurs du formulaire
            $name = $_POST["user_name"];
            $surname = $_POST["user_surname"];
            $password = $_POST["user_password"];
            
            // Appelez la méthode addUser avec les valeurs récupérées
            $userController->addUser($name, $surname, $password);
        }
        break;
    default:
        // Si aucune action n'est spécifiée, afficher tous les utilisateurs par défaut
        $userController->showAllUsers();
        break;
}
?>
