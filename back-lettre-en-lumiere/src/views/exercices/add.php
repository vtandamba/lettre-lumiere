<section class="accordion">
    <h3 class="accordion-title">Add Exercise</h3>
    <div class="accordion-content">
        <form action="index.php?action=addExercise" method="POST">
            <label for="sequence_id">Sequence </label>
            <select id="sequence_id" name="sequence_id">
                <?php foreach ($exercises as $exercise): ?>
                    <option value="<?php echo $exercise->getSequenceId(); ?>">
                        <?php echo $exercise->getSeqTitle(); ?>
                    </option>
                <?php endforeach; ?>
            </select><br>

            <label for="exo_type">Type:</label>
            <select id="exo_type" name="exo_type">
                <?php foreach ($exercises as $exercise): ?>
                    <option value="<?php echo $exercise->getExoType(); ?>">
                        <?php echo $exercise->getExoType(); ?>
                    </option>
                <?php endforeach; ?>
            </select><br>

            <label for="exo_consigne">Consigne:</label><br>
            <select id="exo_consigne" name="exo_consigne">
                <option value="">Choisir une consigne existante</option>
                <?php foreach ($exercises as $exercise): ?>
                    <option value="<?php echo $exercise->getExoConsigne(); ?>">
                        <?php echo $exercise->getExoConsigne(); ?>
                    </option>
                <?php endforeach; ?>
            </select><br><br><br>

            <label for="exo_consigne">Ou saisir une nouvelle consigne : </label>
            <input type="text" id="exo_consigne" name="exo_consigne"><br>

            <label for="exo_ordre">Order:</label>
            <input type="number" id="exo_ordre" name="exo_ordre" required><br><br>

            <!-- Formulaire pour les choix -->
            <div id="new_choice_form">
                <h4>Nouveau choix</h4>
                <div class="choice">
                    <input type="text" name="new_choice_value[]" placeholder="Value du choix" required><br>
                    <input type="text" name="new_choice_image[]" placeholder="Image URL"><br>
                    <input type="text" name="new_choice_chosenSyllable[]" placeholder="Chosen Syllable"><br>
                    <button class="remove_choice">Annuler le choix</button><br><br>
                </div>
            </div>
            <input type="hidden" name="exo_choices" id="exo_choices">
                    <a href="#new_choice_form" id="add_new_choice">Ajouter un nouveau choix </a>
           <br><br>
            <hr>
            <a href="#new_choice_form" id="validate_choices">Valider les choix</a>
             
            <input type="submit" value="Submit">
        </form>
    </div>
</section>

<script>
    // Fonction pour ajouter un nouveau choix
    document.getElementById('add_new_choice').addEventListener('click', function () {
        var newChoiceForm = document.querySelector('#new_choice_form');
        var newChoice = newChoiceForm.querySelector('.choice').cloneNode(true); // Cloner le premier choix

        // Réinitialiser les champs de saisie dans le formulaire cloné
        newChoice.querySelectorAll('input[type="text"]').forEach(function (input) {
            input.value = ''; // Effacer la valeur
        });

        newChoiceForm.appendChild(newChoice); // Ajouter le choix cloné à la fin du formulaire
    });

    // Fonction pour enlever un choix
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove_choice')) {
            var choices = document.querySelectorAll('.choice');
            if (choices.length > 1) { // S'assurer qu'il reste au moins un choix
                event.target.parentNode.remove(); // Supprimer le formulaire de choix parent
            } else {
                alert("Au moins un choix doit être présent.");
            }
        }
    });

    // Formatter les choix avant la soumission
    document.getElementById('validate_choices').addEventListener('click', function () {
        // Récupérer tous les champs de saisie des valeurs, des images et des syllabes choisies
        var values = document.querySelectorAll('input[name="new_choice_value[]"]');
        var images = document.querySelectorAll('input[name="new_choice_image[]"]');
        var syllables = document.querySelectorAll('input[name="new_choice_chosenSyllable[]"]');

        var choicesArray = [];

        // Parcourir tous les champs de saisie et créer un objet pour chaque choix
        for (var i = 0; i < values.length; i++) {
            var choice = {
                value: values[i].value,
                image: images[i].value || null,
                chosenSyllable: syllables[i].value || null
            };
            choicesArray.push(choice);
        }

        // Convertir le tableau d'objets en chaîne JSON
        var choicesJSON = JSON.stringify(choicesArray);
        document.getElementById('exo_choices').value = choicesJSON;
        // Afficher la chaîne JSON dans la console
        console.log(choicesJSON);
    });

    // Formater avant de soumettre --

    // Ajoutez un gestionnaire d'événement pour l'événement "submit" du formulaire
    document.querySelector('form').addEventListener('submit', function (event) {
        // Empêcher le formulaire de se soumettre normalement
        event.preventDefault();

        // Récupérer tous les champs de saisie des valeurs, des images et des syllabes choisies
        var values = document.querySelectorAll('input[name="new_choice_value[]"]');
        var images = document.querySelectorAll('input[name="new_choice_image[]"]');
        var syllables = document.querySelectorAll('input[name="new_choice_chosenSyllable[]"]');

        var choicesArray = [];

        // Parcourir tous les champs de saisie et créer un objet pour chaque choix
        for (var i = 0; i < values.length; i++) {
            var choice = {
                value: values[i].value,
                image: images[i].value || null,
                chosenSyllable: syllables[i].value || null
            };
            choicesArray.push(choice);
        }

        // Convertir le tableau d'objets en chaîne JSON
        var choicesJSON = JSON.stringify(choicesArray);

        // Afficher la chaîne JSON dans la console
        console.log(choicesJSON);
        // Mettre à jour la valeur du champ caché avec le JSON des choix
        document.getElementById('exo_choices').value = choicesJSON;
        // Vous pouvez ensuite soumettre le formulaire manuellement si nécessaire
        // this.submit(); // Décommentez cette ligne si vous souhaitez soumettre le formulaire automatiquement après validation des choix
    });

    // Fonction pour ajouter un nouveau choix
    document.getElementById('add_new_choice').addEventListener('click', function () {
        var newChoiceForm = document.querySelector('#new_choice_form');
        var newChoice = newChoiceForm.querySelector('.choice').cloneNode(true); // Cloner le premier choix

        // Réinitialiser les champs de saisie dans le formulaire cloné
        newChoice.querySelectorAll('input[type="text"]').forEach(function (input) {
            input.value = ''; // Effacer la valeur
        });

        newChoiceForm.appendChild(newChoice); // Ajouter le choix cloné à la fin du formulaire
    });

    // Fonction pour enlever un choix
    document.addEventListener('click', function (event) {
        if (event.target.classList.contains('remove_choice')) {
            var choices = document.querySelectorAll('.choice');
            if (choices.length > 1) { // S'assurer qu'il reste au moins un choix
                event.target.parentNode.remove(); // Supprimer le formulaire de choix parent
            } else {
                alert("Au moins un choix doit être présent.");
            }
        }
    });

</script>