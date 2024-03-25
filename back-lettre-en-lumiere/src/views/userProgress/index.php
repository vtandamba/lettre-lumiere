 <section class="accordion"> 


    <h3 class="accordion-title">Liste des progrès utilisateur</h3>

     <div class="accordion-content"> 
    <?php if(isset($userProgress) && !empty($userProgress)): ?>
        <ul>
            <?php foreach ($userProgress as $progress): ?>
                <li>
                    <!-- Afficher les détails du progrès utilisateur -->
                    <p>ID de l'utilisateur: <?php echo $progress->getUserId(); ?></p>
                    <p>ID de l'exercice: <?php echo $progress->getExerciceId(); ?></p>
                    <p>Score: <?php echo $progress->getProScore(); ?></p>
                    <p>Date: <?php echo $progress->getProDate(); ?></p>
                    <!-- Vous pouvez ajouter d'autres détails si nécessaire -->
                </li>
            <?php endforeach; ?>
        </ul>
    <?php else: ?>
        <p>Aucun progrès utilisateur trouvé.</p>
    <?php endif; ?>
     </div>
 </section>