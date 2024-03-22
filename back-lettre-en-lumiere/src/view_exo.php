<?php
// Appel de l'API pour récupérer tous les exercices
$url = 'https://vtandamb.lpmiaw.univ-lr.fr/Autonomie/php/back-lettre-en-lumiere/api/api.exercices.php';
$exercises_json = file_get_contents($url);

// Convertir la réponse JSON en tableau PHP
$exercises = json_decode($exercises_json, true);

// Vérifier si la requête a réussi
if ($exercises !== null) {
    // Début du corps de la page HTML
    include './../includes/header.php';
?>
<body>
    <h1 class="titre">Tous les un exercice</h1>
    <!-- Autres éléments HTML... -->

    <!-- Affichage des exercices récupérés -->
    <?php foreach ($exercises as $exercise) : ?>
        <div>
            <h2>Exercice <?php echo $exercise['exercice_id']; ?></h2>
            <p>Type : <?php echo $exercise['exo_type']; ?></p>
            <p>Consigne : <?php echo $exercise['exo_consigne']; ?></p>
            <p>Sequence : <?php echo $exercise['seq_title']; ?></p>
            <!-- Afficher d'autres détails de l'exercice... -->
        </div>
    <?php endforeach; ?>

    <!-- Fin du corps de la page HTML -->
    <?php include './../includes/footer.php'; ?>
</body>
<?php
} else {
    // La requête a échoué
    echo "Erreur lors de la récupération des exercices.";
}
?>
