<?php
//  ici on recupere les donnée depuis db.sqlite
include '../private/db_connect.php';
include '../private/header_access.php';
 

// Vérifier la méthode HTTP utilisée
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si un ID d'étape est présent dans la requête
    if (isset($_GET['stage_id']) && isset($_GET['sequence_id'])) {
        // Récupérer les ID de l'étape et de la séquence à partir de la requête GET
        $stage_id = $_GET['stage_id'];
        $sequence_id = $_GET['sequence_id'];
        
        // Exécuter une requête SQL pour récupérer les données du rapport en fonction de l'ID de l'étape et de la séquence
        $query = "SELECT * FROM l_REPORT WHERE stage_id = :stage_id AND sequence_id = :sequence_id";
        $statement = $pdo->prepare($query);
        $statement->execute(['stage_id' => $stage_id, 'sequence_id' => $sequence_id]);
        $reports = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        // Retourner les données du rapport au format JSON
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($reports);
    } else {
        // Si aucun ID d'étape et de séquence n'est spécifié, récupérez tous les rapports
        $query = "SELECT * FROM l_REPORT";
        $statement = $pdo->query($query);
        $reports = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        // Retourner tous les rapports au format JSON
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($reports);
    }
    
}

// Endpoint pour ajouter un rapport
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données de la requête POST
    $data = json_decode(file_get_contents("php://input"), true);

    // Vérifier si les données sont valides
    if (
        (!isset($data['stage_id'])) || 
        (!isset($data['sequence_id'])) || 
        (!isset($data['rep_type'])) ||
        (!isset($data['rep_contenu']))
    ) {
        http_response_code(400);
        echo json_encode(array('message' => 'Paramètres manquants'));
        exit;
    } else {
        $stage_id = $data['stage_id'];
        $sequence_id = $data['sequence_id'];
        $rep_type = $data['rep_type'];
        $rep_contenu = $data['rep_contenu'];
    }

    // Insérer les données du rapport dans la base de données
    $query = "INSERT INTO l_REPORT (stage_id, sequence_id, rep_type, rep_contenu) 
              VALUES (:stage_id, :sequence_id, :rep_type, :rep_contenu)";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':stage_id', $stage_id);
    $statement->bindParam(':sequence_id', $sequence_id);
    $statement->bindParam(':rep_type', $rep_type);
    $statement->bindParam(':rep_contenu', $rep_contenu);

    $success = $statement->execute();

    // Vérifier si l'insertion a réussi
    if ($success) {
        // Retourner un message de succès
        http_response_code(201); // Code 201 pour création réussie
        echo json_encode(array('message' => 'Rapport ajouté avec succès'));
    } else {
        // Retourner une erreur si l'insertion a échoué
        http_response_code(500); // Code 500 pour erreur interne du serveur
        echo json_encode(array('message' => 'Erreur lors de l\'ajout du rapport'));
    }
}
?>

 