<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des exercices</title>
</head>
<body>
    <h1>Listes des exercices</h1>
    <ul>
        <?php foreach ($exercises as $exercise): ?>
            <li>
                <strong>Exercice ID:</strong> <?php echo $exercise['exercice_id']; ?><br>
                <strong>Type:</strong> <?php echo $exercise['exo_type']; ?><br>
                <strong>Consigne:</strong> <?php echo $exercise['exo_consigne']; ?><br>
                <!-- Ajoutez d'autres champs d'exercices si nécessaire -->
            </li>
        <?php endforeach; ?>
    </ul>
</body>
</html>
