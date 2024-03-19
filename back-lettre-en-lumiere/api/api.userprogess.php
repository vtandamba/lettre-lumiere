<?php
//  ici on recupere les donnée depuis db.sqlite
 include '../includes/db_connect.php';
 include '../includes/header.php';


    // Endpoint pour récupérer tous les etapes
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Exécuter une requête SQL pour récupérer toutes les données des utilisateurs
        $query = "SELECT * FROM l_USER_PROGRESS WHERE :id='user_progress_id' ";
        $statement = $pdo->query($query);
        $stages = $statement->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($stages);
    } 

    // Endpoint pour ajouter un progrès utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données de la requête POST
    $_POST = json_decode(file_get_contents("php://input"), true);

    // Vérifier si les données sont valides
    if (
        (!isset($_POST['usp_score'])) || 
        (!isset($_POST['user_id']))
    ) {
        http_response_code(400);
        echo json_encode(array('message' => 'Paramètres manquants'));
        exit;
    } else {
        $score = $_POST['usp_score'];
        $user_id = $_POST['user_id'];
    }

    // Insérer les données de progrès utilisateur dans la base de données
    $query = "INSERT INTO l_USER_PROGRESS (usp_score, user_id) VALUES (:score, :user_id)";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':score', $score);
    $statement->bindParam(':user_id', $user_id);

    $success = $statement->execute();

    // Vérifier si l'insertion a réussi
    if ($success) {
        // Retourner un message de succès
        http_response_code(201); // Code 201 pour création réussie
        echo json_encode(array('message' => 'Progrès utilisateur ajouté avec succès'));
    } else {
        // Retourner une erreur si l'insertion a échoué
        http_response_code(500); // Code 500 pour erreur interne du serveur
        echo json_encode(array('message' => 'Erreur lors de l\'ajout du progrès utilisateur'));
    }
}


?>