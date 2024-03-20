<?php
//  ici on recupere les donnée depuis db.sqlite
 include '../includes/db_connect.php';
 include '../includes/header.php';


// Endpoint pour récupérer tous les utilisateurs
// get pour afficher les utilisateurs en fonction de leur nom et leur mot de passe
// Endpoint pour récupérer un utilisateur en fonction de son nom et de son mot de passe
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Vérifier si les paramètres nom et mot de passe sont définis dans l'URL
    if(isset($_GET['user_name']) && isset($_GET['user_password'])) {
        // Exécuter une requête SQL pour récupérer l'utilisateur en fonction du nom et du mot de passe
        $query = "SELECT * FROM l_USER WHERE user_name = :user_name AND user_password = :user_password";
        $statement = $pdo->prepare($query);
        $statement->bindParam(':user_name', $_GET['user_name']);
        $statement->bindParam(':user_password', $_GET['user_password']);
        $statement->execute();
        $user = $statement->fetch(PDO::FETCH_ASSOC);

        // Vérifier si un utilisateur correspondant a été trouvé
        if($user) {
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($user);
        } else {
            // Aucun utilisateur trouvé avec le nom et le mot de passe fournis
            http_response_code(404);
            echo json_encode(array('message' => 'Utilisateur non trouvé'));
        }
    } else {
        // Les paramètres nom et mot de passe ne sont pas définis dans l'URL
        // Si aucun paramètre n'est fourni, afficher tous les utilisateurs
        $query = "SELECT * FROM l_USER";
        $statement = $pdo->query($query);
        $users = $statement->fetchAll(PDO::FETCH_ASSOC);

        // Vérifier s'il y a des utilisateurs
        if($users) {
            http_response_code(200);
            header('Content-Type: application/json');
            echo json_encode($users);
        } else {
            // Aucun utilisateur trouvé dans la base de données
            http_response_code(404);
            echo json_encode(array('message' => 'Aucun utilisateur trouvé'));
        }
    }
}



    // Endpoint pour ajouter un utilisateur 
    
// Endpoint pour ajouter un utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Récupérer les données de l'utilisateur à partir du corps de la requête POST
    $_POST = json_decode(file_get_contents("php://input"), true);

    // Vérifier si les données sont valides
    if (
        (!isset($_POST['user_name']) ) || (!isset($_POST['user_prenom'] ) || (!isset($_POST['user_prenom'])  ))) {
        http_response_code(400);
        echo json_encode(array('message' => 'Paramètres manquants'));
        exit;
    } else {
        $name = $_POST['user_name'];
        $prenom = $_POST['user_prenom'];
        $password = $_POST['user_password'];
    }

    // Insérer les données de l'utilisateur dans la base de données
    $query = "INSERT INTO l_USER (user_name, user_prenom, user_password ) VALUES (:name, :prenom, :password)";
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