<!-- all_users.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Users</title>
</head>
<body>
    <h1>Alls Users</h1>
    <ul>
    <?php foreach ($users as $user): ?>
            <li><?= $user->getName() ?></li>
        <?php endforeach; ?>
    </ul>

    <a href="../src/views/users/add_user.php">Ajouter un utilisateur</a> <br>
<p> ou bien </p> <br>
<form action="../src/views/users/add_user.php" method="GET">
    <button type="submit">Ajouter un utilisateur</button>
</form>
</body>
</html>

