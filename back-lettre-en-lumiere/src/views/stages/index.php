<!-- views/stage/index.php -->
<section class="accordion">

    <h3 class="accordion-title">Liste des stages</h3>
    <div class="accordion-content">
    <?php if (isset ($stages) && !empty ($stages)): ?>

        <ul>
            <?php foreach ($stages as $stage): ?>
                <li>
                    <!-- Afficher les détails du stage -->
                    <h2>
                        <?php echo $stage->getStaName(); ?>
                    </h2>
                    <p>
                        <?php echo $stage->getStaDescription(); ?>
                    </p>
                </li>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Aucune étape trouvé.</p>
        <?php endif; ?>
    </ul>
    </div>
</section>
<?php 
include 'add.php';
?>