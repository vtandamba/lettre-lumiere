<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page d'administration</title>
  <link rel="stylesheet" href="./styles/main.css">
  <style>

  </style>
</head>

<body>
  <header>
    <h1>Header</h1>
    <form action="index.php" method="GET">
      <label for="action">Choisir une catégorie : </label>
      <select name="action" id="action">
        <option value="default">Voir tout</option>

        <option value="showAllUsers">Les utilisateurs</option>
        <option value="showAllStages"> Les étapes</option>
        <option value="showAllSequences">Les Séquences</option>
        <option value="showAllExercises">Les Exercices</option>

        <!-- Ajoutez d'autres options d'action si nécessaire -->
      </select>
      <input type="submit" value="Go">
    </form>
  </header>
  <main>

  