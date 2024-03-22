<?php
setlocale (LC_TIME, 'fr_FR.utf8','fra'); 
// Chemin vers votre fichier de base de données SQLite

// echo 'its works';

/**
 * __DIR__ est une constante magique en PHP qui représente le chemin absolu
 *  du répertoire du fichier dans lequel elle est utilisée
 */
$db_file = __DIR__ . '/../db.sqlite';


try {
    // Connexion à la base de données SQLite avec PDO
    $pdo = new PDO('sqlite:' . $db_file);
    // Configuration de PDO pour lever des exceptions en cas d'erreur
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Gestion des erreurs de connexion
    die('Erreur de connexion à la base de données : ' . $e->getMessage());
}
?>