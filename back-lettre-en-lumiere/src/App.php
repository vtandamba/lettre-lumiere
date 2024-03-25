<?php
echo ' -- app -- ';

require_once 'models/Database.php';
require_once 'models/M_User.php';
require_once 'models/M_Sequence.php';
require_once 'models/M_Stage.php';
require_once 'models/M_Exercise.php';

// include './../test.php';
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
            $user = new M_User($row['user_id'], $row['user_name'], $row['user_surname'], $row['user_password']);
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
        $exercices = [];
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            // Suppose que vous avez une classe M_Exercice avec un constructeur prenant les attributs de l'exercice
            $exercices []= new M_Exercise($row['exercice_id'], $row['sequence_id'], $row['exo_type'], $row['exo_consigne'], $row['exo_choices'], $row['exo_ordre']);
            
        }
        return $exercices;
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
    // --------------------------- sequence -------------------------//
    public function getAllSequences() {
        $query = "SELECT * FROM l_SEQUENCES";
        $statement = $this->pdo->query($query);
        $sequences = [];
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            // Ajouter chaque instance de M_Sequence au tableau $sequences
            $sequences[] = new M_Sequence($row['sequence_id'], $row['seq_title'], $row['stage_id'], $row['seq_description'], $row['seq_content']);
        }
        return $sequences;
    }

 // Dans votre classe App (App.php)

// Ajoutez la méthode addSequence pour ajouter une nouvelle séquence dans la base de données
public function addSequence($title, $stageId, $description, $content) {
    // Préparez votre requête SQL pour insérer une nouvelle séquence
    $query = "INSERT INTO l_SEQUENCES (seq_title, stage_id, seq_description, seq_content) VALUES (:title, :stageId, :description, :content)";
    $statement = $this->pdo->prepare($query);
    
    // Exécutez la requête avec les valeurs fournies
    $statement->execute(array(
        'title' => $title,
        'stageId' => $stageId,
        'description' => $description,
        'content' => $content
    ));
    
    // Retournez l'ID de la séquence nouvellement ajoutée
    return $this->pdo->lastInsertId();
}

    // -------------------------- stages --------------
    
    public function getAllStages() {
        $query = "SELECT * FROM l_STAGES";
        $statement = $this->pdo->query($query);
        $stages = [];
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            // Ajouter chaque instance de M_Sequence au tableau $sequences
            $stages[] = new M_Stage($row['stage_id'], $row['sta_name'], $row['sta_description']);
        }
        return $stages;
    }
    public function addStage($name, $description){
        $query = "INSERT INTO l_STAGES(sta_name, sta_description) VALUES (:sta_name, :sta_description)";
        $statement = $this->pdo->prepare($query); 
        $statement->execute(array('sta_name'=>$name, 'sta_description' => $description));
        return $this->pdo->lastInsertId();
    }
    

}

    // -------------------- exercise ------------------

    

// Utilisation de la classe Database
// $db = new Database('mydatabase.db');
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