<?php
// app/models/Database.php
echo '-- database --';

class Database {
    private $pdo;
    private $db_file;

    public function __construct($db_file) {
        $this->db_file = $db_file;
        try {
            $this->pdo = new PDO('sqlite:' . $db_file);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die('Erreur de connexion à la base de données : ' . $e->getMessage());
        }
    }

    public function getPdo() {
        return $this->pdo;
    }

    public function getFileName() {
        return $this->db_file;
    }
}

?>
