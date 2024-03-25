 
    <section class="accordion">

    <h3 class="accordion-title">Liste des exercices</h3>
    <div class="accordion-content">
    <?php if(isset($exercises) && !empty($exercises)): ?>
        <ul>
            <?php foreach ($exercises as $exercise): ?>
                <li>
                    <p>ID: <?php echo $exercise->getExerciceId(); ?></p>
                    <p>ID de la séquence: <?php echo $exercise->getSequenceId(); ?></p>
                    <p>Type: <?php echo $exercise->getExoType(); ?></p>
                    <p>Consigne: <?php echo $exercise->getExoConsigne(); ?></p>
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Aucun exercice trouvé.</p>
    <?php endif; ?>
    </div>  
    </section>
    

    <?php
    include 'add.php';
    ?>
     
 