<section class="accordion"> 
    <h3 class="accordion-title">Add User</h3>
    <div class="accordion-content">
    <form action="./index.php?action=addUser" method="POST">
        <label for="user_name">Name:</label>
        <input type="text" id="user_name" name="user_name" required><br><br>
        
        <label for="user_surname">Surname:</label>
        <input type="text" id="user_surname" name="user_surname" required><br><br>
        
        <label for="user_password">Password:</label>
        <input type="password" id="user_password" name="user_password" required><br><br>
        
        <input type="submit" value="Submit">
    </form>
    </div>
    </section>
