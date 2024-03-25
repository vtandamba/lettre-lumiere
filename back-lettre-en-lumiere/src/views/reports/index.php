
<section class="accordion">

    <h3 class="accordion-title">Liste des rapports</h3>
    <div class="accordion-content">
    <?php if(isset($reports) && !empty($reports)): ?>
        <ul>
            <?php foreach ($reports as $report): ?>
                <li>
                    <!-- Afficher les détails du rapport -->
                    <p>ID de l'étape: <?php echo $report->getStageId(); ?></p>
                    <p>ID de la séquence: <?php echo $report->getSequenceId(); ?></p>
                    <p>Type: <?php echo $report->getRepType(); ?></p>
                    <p>Contenu: <?php echo $report->getRepContenu(); ?></p>
                    <!-- Vous pouvez ajouter d'autres détails si nécessaire -->
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Aucun rapport trouvé.</p>
    <?php endif; ?>
    </div>
    </section>

