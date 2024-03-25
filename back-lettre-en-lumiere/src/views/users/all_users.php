
    <!-- all_users.php -->

    <section class="accordion">

        <h3 class="accordion-title">All Users</h3>
        <div class="accordion-content">
            <?php if (isset ($users) && !empty ($users)): ?>
                <ul>
                    <?php foreach ($users as $user): ?>
                        <li>
                            <?php echo $user->getName(); ?>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php else: ?>
                <p>Aucun utilisateur trouvé.</p>
            <?php endif; ?>
    </section>
    </div>


    <?php include 'add_user.php' ?>



    <!-- 
<section class="accordion" > <h3 class="accordion-title"> Actions</h3>
<div class="accordion-content">
    <a href="../src/views/users/add_user.php">Ajouter un utilisateur</a> <br>
    <p> ou bien </p> <br>
    <form action="../src/views/users/add_user.php" method="GET">
        <button type="submit">Ajouter un utilisateur</button>
    </form>


    <a href="../src/views/exercices/index.php">voir les exo </a> <br>
    <p> ou bien </p> <br>
    <form action="../src/views/exercices/index.php" method="GET">
        <button type="submit">>voir les exo</button>
    </form>

    <a href="../src/views/stages/add.php">ajouter une etape</a> <br>
    <p> ou bien </p> <br>
    <form action="../src/views/stages/add.php" method="GET">
        <button type="submit">ajouter</button>
    </form>

    <a href="../src/views/sequences/add.php">ajouter une sequence</a> <br>
    <p> ou bien </p> <br>
    <form action="../src/views/sequences/add.php" method="GET">
        <button type="submit">ajouter une sequences</button>
    </form>
</div>
</section> -->
