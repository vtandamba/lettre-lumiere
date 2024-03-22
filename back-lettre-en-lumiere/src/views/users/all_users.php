<!-- all_users.php -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>All Users</title>
</head>
<body>
    <h1>All Users</h1>
    <?php if(isset($users) && !empty($users)): ?>
    <ul>
        <?php foreach($users as $user): ?>
            <li><?php echo $user->getName(); ?></li>
        <?php endforeach; ?>
    </ul>
<?php else: ?>
    <p>Aucun utilisateur trouvé.</p>
<?php endif; ?>


    <a href="../src/views/users/add_user.php">Ajouter un utilisateur</a> <br>
<p> ou bien </p> <br>
<form action="../src/views/users/add_user.php" method="GET">
    <button type="submit">Ajouter un utilisateur</button>
</form>
</body>
</html>

