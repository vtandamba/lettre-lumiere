<?php

require_once '../src/App.php';
require_once '../src/models/Database.php';
// Controller for l_SEQUENCES table
class SequenceController
{

    public function showAllSequences()
    {
        // Créez une instance de Database en utilisant le chemin du fichier de la base de données
        $database = new Database('../db.sqlite');
        $app = new App($database);
        $sequences = $app->getAllSequences();
        require_once __DIR__ . '/../views/sequences/index.php';
    }
    // Dans votre contrôleur de séquence (SequenceController.php par exemple)

    public function addSequence($title, $stageId, $description, $content)
    {
        $database = new Database('../db.sqlite');

        $app = new App($database);
        $sequence_id = $app->addSequence($title, $stageId, $description, $content);

        header("Location: index.php?action=showAllSequences");
        exit();
    }


    // public function createSequence($seq_title, $stage_id, $seq_description, $seq_content)
    // {
    //     // Code to create a new sequence in the database
    // }

    // public function updateSequence($sequence_id, $seq_title, $stage_id, $seq_description, $seq_content)
    // {
    //     // Code to update an existing sequence in the database
    // }

    // public function deleteSequence($sequence_id)
    // {
    //     // Code to delete a sequence from the database
    // }
}

?>