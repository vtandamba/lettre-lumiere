<?php
// public/index.php

require_once '../src/controllers/UserController.php';
require_once '../src/controllers/StageController.php';
require_once '../src/controllers/SequenceController.php';
require_once '../src/controllers/ExerciseController.php';

require_once '../src/models/Database.php';
require_once '../src/App.php'; // Ajoutez cette ligne si nécessaire
// include'./includes/header.php';

// Chemin vers la base de données SQLite
$db_file = '../db.sqlite';

// Créez une instance de la classe Database
$db = new Database($db_file);

// Créez une instance de l'application en utilisant la base de données
$app = new App($db);

$userController = new UserController($app);
$stageController = new StageController($app);
$exerciseController = new ExerciseController($app);
$sequenceController = new SequenceController($app);
// Vérifiez si une action est spécifiée dans l'URL
$action = $_GET['action'] ?? '';

// Utilisez le contrôleur utilisateur en fonction de l'action spécifiée
switch ($action) {




    // user
    case 'showAllUsers':
        include './includes/header.php';
        $userController->showAllUsers();
        include './includes/footer.php';

        break;
    case 'addUser':
        // Vérifiez si le formulaire a été soumis
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            // Récupérez les valeurs du formulaire
            $name = $_POST["user_name"];
            $surname = $_POST["user_surname"];
            $password = $_POST["user_password"];

            // Appelez la méthode addUser avec les valeurs récupérées
            $userController->addUser($name, $surname, $password);
        }
        break;

    // exercices
    case 'showAllExercises':
        include './includes/header.php';

        $exerciseController->showAllExercises();
        include './includes/footer.php';

        break;
    case 'addExercise':
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            // Récupérez les données du formulaire
            $sequenceId = $_POST['sequence_id'];
            $type = $_POST['exo_type'];
            $consigne = $_POST['exo_consigne'];
            $choices = $_POST['exo_choices'];
            $ordre = $_POST['exo_ordre'];
            $exerciseController->addExercise($sequence_id, $type, $connsigne, $choices, $ordre);
        }
        include './includes/footer.php';
        break;
    // sequences
    case 'showAllSequences':
        include './includes/header.php';

        $sequenceController->showAllSequences();
        include './includes/footer.php';

        break;
    case 'addSequence':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $title = $_POST["seq_title"];
            $stageId = $_POST["stage_id"];
            $description = $_POST["seq_description"];
            $content = $_POST["seq_content"];
            $sequenceController->addSequence($title, $stageId, $description, $content);
        }
        include './includes/footer.php';
        break;

    // stage
    case 'showAllStages':
        include './includes/header.php';
        $stageController->showAllStages();
        include './includes/footer.php';

        break;
    case 'addStage':
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $name = $_POST["sta_name"];
            $descritption = $_POST["sta_description"];
            $stageController->addStage($name, $description);
        }
        break;
    default:
        include './includes/header.php';
        // Si aucune action n'est spécifiée, afficher tous les utilisateurs par défaut
        $userController->showAllUsers();
        $stageController->showAllStages();
        $sequenceController->showAllSequences();
        $exerciseController->showAllExercises();
        include './includes/footer.php';

        break;
}
// include './includes/footer.php'
?>



</body>

</html>