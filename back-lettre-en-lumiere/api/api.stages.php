<?php
//  ici on recupere les donnée depuis db.sqlite
 include '../includes/db_connect.php';
 include '../includes/header.php';


    // Endpoint pour récupérer tous les etapes
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        // Exécuter une requête SQL pour récupérer toutes les données des utilisateurs
        $query = "SELECT * FROM l_STAGES";
        $statement = $pdo->query($query);
        $stages = $statement->fetchAll(PDO::FETCH_ASSOC);

        http_response_code(200);
        header('Content-Type: application/json');
        echo json_encode($stages);
    } 

 
?>