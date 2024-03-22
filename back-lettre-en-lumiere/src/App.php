<?php
echo ' -- app -- ';

require_once 'models/Database.php';
require_once 'models/M_Users.php';

include './../test.php';
class App {
    private $pdo;
    private $database;

    public function __construct(Database $database) {
        $this->database = $database;
        $this->initDatabase();
    }

    private function initDatabase() {
        try {
            // Utilisez la méthode getFileName() pour obtenir le chemin de fichier de la base de données
            $db_file = $this->database->getFileName();
            $this->pdo = new PDO('sqlite:' . $db_file);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            print_r('connecté avec succes');
        } catch (PDOException $e) {
            die('Erreur de connexion à la base de données : ' . $e->getMessage());
        }
    }
    

    // Méthodes pour les utilisateurs

    public function getAllUsers() {
        $query = "SELECT * FROM l_USER";
        $statement = $this->pdo->query($query);
        $users = [];
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            $user = new User($row['user_id'], $row['user_name'], $row['user_surname'], $row['user_password']);
            $users[] = $user;
        }
        return $users;
    }

    public function addUser($name, $surname, $password) {
        // $query = "INSERT INTO l_USER (name, surname, password) VALUES (:name, :surname, :password)";
       $query = "INSERT INTO l_USER (user_name, user_surname, user_password) VALUES (:user_name, :user_surname, :user_password)";
        $statement = $this->pdo->prepare($query);
        $statement->execute(array('user_name' => $name, 'user_surname' => $surname, 'user_password' => $password));
        return $this->pdo->lastInsertId();
    }

    public function updateUserPassword($id, $newPassword) {
        $query = "UPDATE l_USER SET password = :password WHERE user_id = :user_id";
        $statement = $this->pdo->prepare($query);
        $statement->execute(array('password' => $newPassword, 'user_id' => $id));
        return $statement->rowCount(); // Nombre de lignes modifiées
    }

    public function deleteUser($id) {
        $query = "DELETE FROM l_USER WHERE user_id = :user_id";
        $statement = $this->pdo->prepare($query);
        $statement->execute(array('user_id' => $id));
        return $statement->rowCount(); // Nombre de lignes supprimées
    }

    //  ---------------------------------------- EXERCICES ------------------------------
     // Méthode pour récupérer tous les exercices
    public function getAllExercises() {
        $query = "SELECT * FROM l_EXERCICES";
        $statement = $this->pdo->query($query);
        return $statement->fetchAll(PDO::FETCH_ASSOC);
    }
    
    // Méthode pour ajouter un nouvel exercice
    public function addExercise($sequenceId, $type, $consigne, $choices, $ordre) {
        $query = "INSERT INTO l_EXERCICES (sequence_id, exo_type, exo_consigne, exo_choices, exo_ordre) VALUES (:sequenceId, :type, :consigne, :choices, :ordre)";
        $statement = $this->pdo->prepare($query);
        $statement->execute(array('sequenceId' => $sequenceId, 'type' => $type, 'consigne' => $consigne, 'choices' => $choices, 'ordre' => $ordre));
        return $this->pdo->lastInsertId();
    }
    
    // Méthode pour mettre à jour un exercice
    public function updateExercise($id, $sequenceId, $type, $consigne, $choices, $ordre) {
        $query = "UPDATE l_EXERCICES SET sequence_id = :sequenceId, exo_type = :type, exo_consigne = :consigne, exo_choices = :choices, exo_ordre = :ordre WHERE exercice_id = :id";
        $statement = $this->pdo->prepare($query);
        $statement->execute(array('id' => $id, 'sequenceId' => $sequenceId, 'type' => $type, 'consigne' => $consigne, 'choices' => $choices, 'ordre' => $ordre));
        return $statement->rowCount();
    }
    
    // Méthode pour supprimer un exercice
    public function deleteExercise($id) {
        $query = "DELETE FROM l_EXERCICES WHERE exercice_id = :id";
        $statement = $this->pdo->prepare($query);
        $statement->execute(array('id' => $id));
        return $statement->rowCount();
    }
    
    
    // --------------------------- fin exercice -------------------------//
}



// Utilisation de la classe Database
$db = new Database('mydatabase.db');
//  ici se déroulent les actions methodes de classes de app


// // // CREATE
// $newUserId = $db->addUser('John Doe', 'john@example.com');

// // // READ
// // $users = $db->getAllUsers();

// // // UPDATE
// $affectedRows = $db->updateUserEmail('John Doe', 'newemail@example.com');

// // // DELETE
// $deletedRows = $db->deleteUser('John Doe');

?>