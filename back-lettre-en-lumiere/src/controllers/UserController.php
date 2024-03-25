<?php
echo '-- user --';

require_once '../src/App.php';
require_once '../src/models/Database.php';
class UserController
{
    public function showAllUsers()
    {
        // Créez une instance de Database en utilisant le chemin du fichier de la base de données
        $database = new Database('../db.sqlite');

        // Passez l'instance de Database à la classe App
        $app = new App($database);

        // Utilisez l'instance de App pour afficher tous les utilisateurs
        $users = $app->getAllUsers();
        require_once __DIR__ . '/../views/users/all_users.php';
    }

    public function addUser($name, $surname, $password)
    {
        // Créez une instance de Database en utilisant le chemin du fichier de la base de données
        $database = new Database('../db.sqlite');

        // Passez l'instance de Database à la classe App
        $app = new App($database);

        // Utilisez l'instance de App pour ajouter un nouvel utilisateur
        $userId = $app->addUser($name, $surname, $password);
        header('Location: index.php?action=showAllUsers');
        exit();
    }
}
?>