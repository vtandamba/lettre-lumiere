<?php
require_once '../src/App.php';
require_once '../src/models/Database.php';


// Controller for l_STAGES table
class StageController {
    public function showAllStages() {
        $database = new Database('../db.sqlite');

        $app = new App($database);
        $stages = $app->getAllStages();
        require_once __DIR__ . '/../views/stages/index.php';
    
    }

    public function addStage($name, $description) {
        
        $database = new Database('../db.sqlite');

        // Passez l'instance de Database à la classe App
        $app = new App($database);

        // Utilisez l'instance de App pour ajouter un nouvel utilisateur
        $stageId = $app->addStage($name, $description);
        header('Location: index.php?action=showAllStages');
        exit();
    }

    public function updateStage($stage_id, $name, $description) {
        // Code to update an existing stage in the database
    }

    public function deleteStage($stage_id) {
        // Code to delete a stage from the database
    }
}


 

?>
