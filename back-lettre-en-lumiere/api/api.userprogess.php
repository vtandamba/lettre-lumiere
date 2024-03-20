<?php
//  ici on recupere les donnée depuis db.sqlite
 include '../includes/db_connect.php';
 include '../includes/header.php';


    // Endpoint pour récupérer tous les etapes
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Exécuter une requête SQL pour récupérer toutes les données des utilisateurs
        $query = "SELECT * FROM l_USER_PROGRESS ";
        $statement = $pdo->query($query);
        $stages = $statement->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($stages);
    } 

    // Endpoint pour ajouter un progrès utilisateur

// Endpoint pour ajouter un progrès utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données de la requête POST
    $_POST = json_decode(file_get_contents("php://input"), true);

    // Vérifier si les données sont valides
    if (
        (!isset($_POST['pro_score'])) 
    ) {
        http_response_code(400); // Code 400 pour une mauvaise requête
        echo json_encode(array('message' => 'Paramètres manquants'));
        exit;
    } else {
        $pro_score = $_POST['pro_score'];
        // $user_id = $_POST['user_id'];
    }

    // Insérer les données de score utilisateur dans la base de données
    $query = "INSERT INTO l_USER_PROGRESS (pro_score) VALUES (:pro_score )";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':pro_score', $pro_score);
    // $statement->bindParam(':user_id', $user_id);

    $success = $statement->execute();

    // Vérifier si l'insertion a réussi
    if ($success) {
        http_response_code(201); // Code 201 pour création réussie
        echo json_encode(array('message' => 'Score ajouté avec succès'));
    } else {
        http_response_code(500); // Code 500 pour erreur interne du serveur
        echo json_encode(array('message' => 'Erreur lors de l\'ajout du score'));
    }
}

?>