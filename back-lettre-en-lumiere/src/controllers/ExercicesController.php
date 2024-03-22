<?php
include 'Exercise.php';

class ExerciseController {
    // Méthode pour afficher tous les exercices
    public function index() {
        // Logique pour récupérer tous les exercices depuis le modèle
        $exercises = Exercise::getAllExercises();

        // Afficher la vue correspondante avec les données récupérées
        include_once '../views/exercise/index.php';
    }

    // Méthode pour afficher le formulaire d'ajout d'un exercice
    public function create() {
        // Afficher le formulaire d'ajout d'un exercice
        // include_once 'views/exercise/create.php';
    }

    // Méthode pour traiter l'ajout d'un nouvel exercice
    public function store() {
        // Logique pour ajouter un nouvel exercice depuis les données reçues du formulaire
        // Redirection vers la liste des exercices après l'ajout
    }

    // Méthode pour afficher les détails d'un exercice spécifique
    public function show($exercise_id) {
        // Logique pour récupérer les détails d'un exercice depuis le modèle
        // $exercise = Exercise::getExerciseById($exercise_id);

        // Afficher la vue correspondante avec les détails de l'exercice
        // include_once 'views/exercise/show.php';
    }

    // Méthode pour afficher le formulaire de modification d'un exercice
    public function edit($exercise_id) {
        // Logique pour récupérer les détails de l'exercice à modifier depuis le modèle
        // $exercise = Exercise::getExerciseById($exercise_id);

        // Afficher le formulaire de modification de l'exercice avec les détails récupérés
        // include_once 'views/exercise/edit.php';
    }

    // Méthode pour traiter la modification d'un exercice
    public function update($exercise_id) {
        // Logique pour mettre à jour les données de l'exercice depuis les données reçues du formulaire
        // Redirection vers la liste des exercices après la mise à jour
    }

    // Méthode pour supprimer un exercice
    public function destroy($exercise_id) {
        // Logique pour supprimer l'exercice spécifié depuis le modèle
        // Redirection vers la liste des exercices après la suppression
    }
}
?>
