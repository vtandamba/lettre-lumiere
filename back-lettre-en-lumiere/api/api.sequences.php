<?php
//  ici on recupere les donnée depuis db.sqlite
 include '../includes/db_connect.php';
 include '../includes/header.php';

 
 if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si un ID d'étape est présent dans la requête
    if (isset($_GET['stage_id'])) {
        // Récupérer l'ID de l'étape à partir de la requête GET
        $stage_id = $_GET['stage_id'];
        
        // Exécuter une requête SQL pour récupérer les données de la séquence en fonction de l'ID de l'étape
        $query = "SELECT * FROM l_SEQUENCES WHERE stage_id = :stage_id";
        $statement = $pdo->prepare($query);
        $statement->execute(['stage_id' => $stage_id]);
        $sequence = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        // Vérifier si la séquence existe
        if ($sequence) {
            // Retourner les données de la séquence au format JSON
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($sequence);
        } else {
            // Retourner une erreur si la séquence n'existe pas
            http_response_code(404);
            echo json_encode(array('message' => 'Séquence non trouvée'));
        }
    } elseif (isset ($_GET['sequence_id'])) {
        // Récupérer l'ID de la séquence à partir de la requête GET
        $sequence_id = $_GET['sequence_id'];
        
        // Exécuter une requête SQL pour récupérer les données de la séquence en fonction de son ID
        $query = "SELECT * FROM l_SEQUENCES WHERE sequence_id = :sequence_id";
        $statement = $pdo->prepare($query);
        $statement->execute(['sequence_id' => $sequence_id]);
        $sequence = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        // Vérifier si la séquence existe
        if ($sequence) {
            // Retourner les données de la séquence au format JSON
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($sequence);
        } else {
            // Retourner une erreur si la séquence n'existe pas
            http_response_code(404);
            echo json_encode(array('message' => 'Séquence non trouvée'));
        }
    } else {
        // Si aucun ID d'étape n'est spécifié, récupérez toutes les séquences
        $query = "SELECT * FROM l_SEQUENCES";
        $statement = $pdo->query($query);
        $sequences = $statement->fetchAll(PDO::FETCH_ASSOC);
        
        // Retourner toutes les séquences au format JSON
        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($sequences);
    }
}

    
// Endpoint pour ajouter une séquence
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données de la requête POST
    $_POST = json_decode(file_get_contents("php://input"), true);

    // Vérifier si les données sont valides
    if (
        (!isset($_POST['seq_title'])) || 
        (!isset($_POST['seq_description'])) || 
        (!isset($_POST['seq_content']))
    ) {
        http_response_code(400);
        echo json_encode(array('message' => 'Paramètres manquants'));
        exit;
    } else {
        $title = $_POST['seq_title'];
        $description = $_POST['seq_description'];
        $content = $_POST['seq_content'];
    }

    // Vérifier si le stage ID existe dans la table des stages
    $stage_id = 1; // Remplacez 1 par l'ID du stage approprié, ou récupérez-le à partir des données POST si nécessaire
    $query_stage = "SELECT COUNT(*) FROM l_STAGES WHERE stage_id = :stage_id";
    $statement_stage = $pdo->prepare($query_stage);
    $statement_stage->execute(['stage_id' => $stage_id]);
    $stage_exists = $statement_stage->fetchColumn();

    if (!$stage_exists) {
        http_response_code(404);
        echo json_encode(array('message' => 'Le stage spécifié n\'existe pas'));
        exit;
    }

    // Insérer les données de la séquence dans la base de données
    $query = "INSERT INTO l_SEQUENCES (seq_title, stage_id, seq_description, seq_content) 
              VALUES (:title, :stage_id, :description, :content)";
    $statement = $pdo->prepare($query);
    $statement->bindParam(':title', $title);
    $statement->bindParam(':stage_id', $stage_id);
    $statement->bindParam(':description', $description);
    $statement->bindParam(':content', $content);

    $success = $statement->execute();

    // Vérifier si l'insertion a réussi
    if ($success) {
        // Retourner un message de succès
        http_response_code(201); // Code 201 pour création réussie
        echo json_encode(array('message' => 'Séquence ajoutée avec succès'));
    } else {
        // Retourner une erreur si l'insertion a échoué
        http_response_code(500); // Code 500 pour erreur interne du serveur
        echo json_encode(array('message' => 'Erreur lors de l\'ajout de la séquence'));
    }
}

?>