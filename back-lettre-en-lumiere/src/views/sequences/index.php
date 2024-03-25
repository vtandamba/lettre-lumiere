<section class="accordion">
    <h3 class="accordion-title">Liste des séquences</h3>

    <div class="accordion-content">

   
    <?php if (isset ($sequences) && !empty ($sequences)): ?>
        <ul>
            <?php foreach ($sequences as $sequence): ?>
                <li>
                    <!-- Afficher les détails de la séquence -->
                    <p>ID:
                        <?php echo $sequence->getSequenceId(); ?>
                    </p>
                    <p>Titre:
                        <?php echo $sequence->getSeqTitle(); ?>
                    </p>
                    <p>ID de l'étape:
                        <?php echo $sequence->getStageId(); ?>
                    </p>
                    <p>Description:
                        <?php echo $sequence->getSeqDescription(); ?>
                    </p>
                    <!-- Vous pouvez ajouter d'autres détails si nécessaire -->
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Aucune séquence trouvée.</p>
    <?php endif; ?> </div>
     </section>
    <?php
    include 'add.php';
    ?>