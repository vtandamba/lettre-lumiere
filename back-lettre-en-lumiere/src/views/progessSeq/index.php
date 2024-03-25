
<section class="accordion">
<h3 class="accordion-title" >Liste des progrès de séquence</h3>
<div class="accordion-content">
    <?php if(isset($progressSeq) && !empty($progressSeq)): ?>
        <ul>
            <?php foreach ($progressSeq as $progress): ?>
                <li>
                    <!-- Afficher les détails du progrès de séquence -->
                    <p>ID de l'utilisateur: <?php echo $progress->getUserId(); ?></p>
                    <p>ID de la séquence: <?php echo $progress->getSequenceId(); ?></p>
                    <p>Complété: <?php echo $progress->getCompleted() ? 'Oui' : 'Non'; ?></p>
                    <p>Score: <?php echo $progress->getSeqScore(); ?></p>
                    <!-- Vous pouvez ajouter d'autres détails si nécessaire -->
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Aucun progrès de séquence trouvé.</p>
    <?php endif; ?>   
</div>
</section>
 