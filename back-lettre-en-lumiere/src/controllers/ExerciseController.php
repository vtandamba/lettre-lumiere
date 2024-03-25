<?php
require_once '../src/App.php';
require_once '../src/models/Database.php';

class ExerciseController {
    // Méthode pour afficher tous les exercices
    public function showAllExercises() {
        $database = new Database('../db.sqlite');
        $app = new App($database);
        
        $exercises = $app->getAllExercises();
        require_once __DIR__ . '/../views/exercices/index.php';
            
    }

    // // Méthode pour afficher le formulaire d'ajout d'un exercice
    public function addExercise($sequence_id, $type, $consigne, $choices, $ordre) {
         
            // Créez une instance de Database en utilisant le chemin du fichier de la base de données
            $database = new Database('../db.sqlite');
    
            // Passez l'instance de Database à la classe App
            $app = new App($database);
    
            // Utilisez l'instance de App pour ajouter un nouvel utilisateur
            $exerciceId = $app->addExercise($sequence_id, $type, $consigne, $choices, $ordre);
            header('Location: index.php?action=showAllExercises');
            exit();
        }
    }


    // // Méthode pour afficher les détails d'un exercice spécifique
    // public function show($exercise_id) {
    //     // Logique pour récupérer les détails d'un exercice depuis le modèle
    //     $exercise = M_Exercise::getExerciseById($exercise_id);

    //     // Afficher la vue correspondante avec les détails de l'exercice
    //     include_once 'views/exercise/show.php';
    //     // Afficher la vue correspondante avec les données récupérées
    //     include_once 'views/exercise/index.php';
    // }

    // // Méthode pour afficher le formulaire de modification d'un exercice
    // public function edit($exercise_id) {
    //     // Logique pour récupérer les détails de l'exercice à modifier depuis le modèle
    //     $exercise = M_Exercise::getExerciseById($exercise_id);

    //     // Afficher le formulaire de modification de l'exercice avec les détails récupérés
    //     include_once 'views/exercise/edit.php';
    // }

    // // Méthode pour traiter la modification d'un exercice
    // public function update($exercise_id) {
    //     // Logique pour mettre à jour les données de l'exercice depuis les données reçues du formulaire
    //     // Redirection vers la liste des exercices après la mise à jour
    // }

    // // Méthode pour supprimer un exercice
    // public function destroy($exercise_id) {
    //     // Logique pour supprimer l'exercice spécifié depuis le modèle
    //     // Redirection vers la liste des exercices après la suppression
    // }
 
?>
