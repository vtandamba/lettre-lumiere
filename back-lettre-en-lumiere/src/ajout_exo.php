<?php
// Appel de l'API pour récupérer tous les exercices
$urlExercies = 'https://vtandamb.lpmiaw.univ-lr.fr/Autonomie/php/back-lettre-en-lumiere/api/api.exercices.php';
$urlSequences = 'https://vtandamb.lpmiaw.univ-lr.fr/Autonomie/php/back-lettre-en-lumiere/api/api.sequences.php';
$urlEtapes = 'https://vtandamb.lpmiaw.univ-lr.fr/Autonomie/php/back-lettre-en-lumiere/api/api.stages.php';
$exercises_json = file_get_contents($urlExercies);
$sequences_json = file_get_contents($urlSequences);
$etapes_json = file_get_contents($urlEtapes);

// Convertir la réponse JSON en tableau PHP
$exercices = json_decode($exercises_json, true);
$sequences = json_decode($sequences_json, true);
$etapes = json_decode($etapes_json, true);

// Vérifier si la requête a réussi
if ($exercices !== null && $sequences!==null && $etapes !== null)  {
    // Début du corps de la page HTML
    include './../includes/header.php';
}
?>
<body>
<form action=$urlExercies method="post" enctype="multipart/form-data">
    <!-- sequence -->
    <label for="sequence">Séquence</label>
    <select id="sequence" name="sequence">
        <?php foreach ($sequences as $sequence) : ?>
            <option value="<?= $sequence['sequence_id'] ?>"><?= $sequence['sequence_id'] ?></option>
        <?php endforeach; ?>
    </select>
    <br><br>
    <!-- etape  -->
    <label for="etape">Étapes</label>
    <select id="etape" name="etape">
    <?php foreach ($etapes as $etape) : ?>
    <option value="<?= $etape['stage_id']?>">Étape <?= $etape['stage_id'] ?></option>
    <?php endforeach; ?>

        </select>
    <br><br>
  <!-- consigne -->

    <label for="consigne" class="input__label">Consigne</label>
    <input type="text" id="consigne" name="consigne" class="input__field">
    <span>Type Sélectionner à afficher</span>
    <img class="input__ajout" src="../assets/design/bouton-ajout.png">
    ou consigne déja existant :
    <select id="etape" name="etape">
        Consigne
    <?php foreach ($exercices as $exercice) : ?>

    <option value="<?= $etape['stage_id']?>"> <?= $exercice['exo_consigne'] ?></option>
    <?php endforeach; ?>
<!--  images  -->


    <br><br>
    <label for="fileToUpload">Image</label>
    <input type="file" name="fileToUpload" id="fileToUpload">
    <br><br>
    <label for="propositions">Contenu</label>
    <div id="propositionsContainer">
        <!-- Les champs de proposition seront ajoutés ici -->
    </div>
    <br>
    <button type="button" id="ajouterProposition">Ajouter une proposition</button>
    <br><br>
    <input type="submit" value="Ajouter" name="submit">
</form>

 

<?php 
 
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $sequence_id = $_POST['sequence'];
    $etape = $_POST['etape'];
    $consigne = $_POST['consigne'];
    
    // // Traitement de l'image téléchargée
    // $target_dir = "https://vtandamb.lpmiaw.univ-lr.fr/Autonomie/php/back-lettre-en-lumiere/assets/design/";
    // $target_file = $target_dir . basename($_FILES["fileToUpload"]["name"]);
    // move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file);
    
    // Traitement des propositions
    $propositions = isset($_POST['propositions']) ? $_POST['propositions'] : [];
    $propositions_json = json_encode($propositions);
    
    // Enregistrement des données dans la base de données (à compléter)
    // Utilisez PDO ou une autre méthode pour insérer les données dans la table d'exercice
}
 

?>
<script>
    document.addEventListener('DOMContentLoaded', function() {
        document.getElementById('ajouterProposition').addEventListener('click', function() {
            var input = document.createElement('input');
            input.type = 'text';
            input.name = 'propositions[]'; // Utilisation de tableau pour stocker les propositions
            input.placeholder = 'Proposition';
            document.getElementById('propositionsContainer').appendChild(input);
        });
    });
</script>
