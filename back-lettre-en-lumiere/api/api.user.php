<?php
//  ici on recupere les donnée depuis db.sqlite
 include '../includes/db_connect.php';
 include '../includes/header.php';


    // Endpoint pour récupérer tous les utilisateurs
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Exécuter une requête SQL pour récupérer toutes les données des utilisateurs
        $query = "SELECT * FROM l_USER";
        $statement = $pdo->query($query);
        $stages = $statement->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($stages);
    } 
    // Endpoint pour ajouter un utilisateur 
    
// Endpoint pour ajouter un utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données de l'utilisateur à partir du corps de la requête POST
    $_POST = json_decode(file_get_contents("php://input"), true);

    // Vérifier si les données sont valides
    if (
        (!isset($_POST['user_nom']) ) || (!isset($_POST['user_prenom'] ) || (!isset($_POST['user_prenom'])  ))) {
        http_response_code(400);
        echo json_encode(array('message' => 'Paramètres manquants'));
        exit;
    } else {
        $name = $_POST['user_nom'];
        $prenom = $_POST['user_prenom'];
        $password = $_POST['user_password'];
    }

    // Insérer les données de l'utilisateur dans la base de données
    $query = "INSERT INTO l_USER (user_nom, user_prenom, user_password ) VALUES (:name, :prenom, :password)";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':name', $name);
    $statement->bindParam(':prenom', $prenom);
    $statement->bindParam(':password', $password);

    $success = $statement->execute();

    // Vérifier si l'insertion a réussi
    if ($success) {
        // Retourner un message de succès
        http_response_code(201); // Code 201 pour création réussie
        echo json_encode(array('message' => 'Utilisateur ajouté avec succès'));
    } else {
        // Retourner une erreur si l'insertion a échoué
        http_response_code(500); // Code 500 pour erreur interne du serveur
        echo json_encode(array('message' => 'Erreur lors de l\'ajout de l\'utilisateur'));
    }
} 

?>