<?php
//  ici on recupere les donnée depuis db.sqlite
//  ici on recupere les donnée depuis db.sqlite
include '../private/db_connect.php';
include '../private/header_access.php';


 if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si les paramètres user_id et exercice_id sont définis dans l'URL
    if(isset($_GET['user_id']) && isset($_GET['exercice_id'])) {
        // Exécuter une requête SQL pour récupérer les données pour un utilisateur et un exercice spécifiques
        $query = "SELECT pro_score, pro_date AS most_recent_date 
            FROM l_USER_PROGRESS
            WHERE exercice_id = :exercice_id AND user_id = :user_id
            GROUP BY user_id, exercice_id";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':user_id', $_GET['user_id']);
        $statement->bindParam(':exercice_id', $_GET['exercice_id']);
        $statement->execute();
        $data = $statement->fetchAll(PDO::FETCH_ASSOC);

        // Vérifier si des données ont été trouvées pour l'utilisateur et l'exercice spécifiés
        if($data) {
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($data);
        } else {
            // Aucune donnée trouvée pour l'utilisateur et l'exercice spécifiés
            http_response_code(404);
            echo json_encode(array('message' => 'Aucune donnée trouvée pour l\'utilisateur et l\'exercice spécifiés'));
        }
    } else {
        // Si les paramètres user_id et exercice_id ne sont pas définis, récupérer toutes les étapes
        $query = "SELECT * FROM l_USER_PROGRESS";
        $statement = $pdo->query($query);
        $stages = $statement->fetchAll(PDO::FETCH_ASSOC);

        // Vérifier s'il y a des étapes
        if($stages) {
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($stages);
        } else {
            // Aucune étape trouvée
            http_response_code(404);
            echo json_encode(array('message' => 'Aucune étape trouvée'));
        }
    }
}

    
    // Endpoint pour ajouter un progrès utilisateur

// Endpoint pour ajouter un progrès utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données de la requête POST

    $_POST = json_decode(file_get_contents("php://input"), true);

    // Vérifier si les données sont valides
    if (
        (!isset($_POST['pro_score']) && !isset($_POST['exercice_id']) && !isset($_POST['user_id'])) 
    ) {
        http_response_code(400); // Code 400 pour une mauvaise requête
        echo json_encode(array('message' => 'Paramètres manquants'));
        exit;
    } else {
        $pro_score = $_POST['pro_score'];
        $user_id = $_POST['user_id'];
        $exercice_id = $_POST['exercice_id'];
        $DateAndTime = date('m-d-Y h:i:s a', time());  
    }

    // Insérer les données de score utilisateur dans la base de données
    $query = "INSERT INTO l_USER_PROGRESS (pro_score, exercice_id, user_id, pro_date) VALUES (:pro_score, :exercice_id, :user_id, :pro_date )";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':pro_score', $pro_score);
    $statement->bindParam(':user_id', $user_id);
    $statement->bindParam(':exercice_id', $exercice_id);
    $statement->bindParam(':pro_date', $DateAndTime);

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

//Récupérer les scores les plus récents
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
 
}

?>