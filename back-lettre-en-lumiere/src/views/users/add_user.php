<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Add User</title>
</head>
<body>
    <h1>Add User</h1>
    <form action="../../../public/index.php?action=addUser" method="POST">
        <label for="user_name">Name:</label>
        <input type="text" id="user_name" name="user_name" required><br><br>
        
        <label for="user_surname">Surname:</label>
        <input type="text" id="user_surname" name="user_surname" required><br><br>
        
        <label for="user_password">Password:</label>
        <input type="user_password" id="user_password" name="user_password" required><br><br>
        
        <input type="submit" value="Submit">
    </form>
</body>
</html>
