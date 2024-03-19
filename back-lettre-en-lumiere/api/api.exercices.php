<?php
//  ici on recupere les donnée depuis db.sqlite
    include '../includes/db_connect.php';
    include '../includes/header.php';


    // Endpoint pour récupérer tous les exercices en fonction des sequences
    // Endpoint pour récupérer tous les exercices en fonction des sequences
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si un ID de séquence est présent dans la requête
    if (isset($_GET['sequence_id'])) {
        // Récupérer l'ID de la séquence à partir de la requête GET
        $sequence_id = $_GET['sequence_id'];
        
        // Exécuter une requête SQL pour récupérer les données des exercices en fonction de l'ID de la séquence
        $query = "SELECT * FROM l_EXERCICES WHERE sequence_id = :sequence_id";
        $statement = $pdo->prepare($query);
        $statement->execute(['sequence_id' => $sequence_id]);
        $exercices = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        // Vérifier si des exercices existent pour la séquence spécifiée
        if ($exercices) {
            // Retourner les données des exercices au format JSON
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($exercices);
        } else {
            // Retourner une erreur si aucun exercice n'est trouvé pour la séquence spécifiée
            http_response_code(404);
            echo json_encode(array('message' => 'Aucun exercice trouvé pour la séquence spécifiée'));
        }
    } else {
        // Si aucun ID de séquence n'est spécifié, récupérez tous les exercices
        $query = "SELECT * FROM l_EXERCICES";
        $statement = $pdo->query($query);
        $exercices = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        // Retourner tous les exercices au format JSON
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($exercices);
    }
}

    // Endpoint pour ajouter un exercice
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données de l'exercice à partir du corps de la requête POST
    $_POST = json_decode(file_get_contents("php://input"), true);

 // Vérifier si la séquence ID existe dans la table des séquences
    $query = "SELECT COUNT(*) FROM l_SEQUENCES WHERE sequence_id = :sequence_id";
    $statement = $pdo->prepare($query);
    $statement->execute(['sequence_id' => $sequence_id]);
    $sequence_exists = $statement->fetchColumn();
    
    if (!$sequence_exists) {
        http_response_code(404);
        echo json_encode(array('message' => 'La séquence spécifiée n\'existe pas'));
        exit;
    }
    
    // Insérer les données dans la table des exercices avec la clé étrangère sequence_id
    $query = "INSERT INTO l_EXERCICES (sequence_id, exo_type, exo_consigne, exo_choices, exo_ordre) 
                VALUES (:sequence_id, :exo_type, :exo_consigne, :exo_choices, :exo_ordre)";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':sequence_id', $sequence_id);
    $statement->bindParam(':exo_type', $type);
    $statement->bindParam(':exo_consigne', $consigne);
    $statement->bindParam(':exo_choices', $choice);
    $statement->bindParam(':exo_ordre', $ordre);

    $success = $statement->execute();

    // Vérifier si l'insertion a réussi
    if ($success) {
        // Retourner un message de succès
        http_response_code(201); // Code 201 pour création réussie
        echo json_encode(array('message' => 'exercice ajouté avec succès'));
    } else {
        // Retourner une erreur si l'insertion a échoué
        http_response_code(500); // Code 500 pour erreur interne du serveur
        echo json_encode(array('message' => 'Erreur lors de l\'ajout de l\'exercice'));
    }
} 

?>