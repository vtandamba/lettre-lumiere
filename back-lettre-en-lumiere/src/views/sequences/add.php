<section class="accordion">

    <h3 class="accordion-title" > ajout sequence</h3>
    <div class="accordion-content">
    <form action="./index.php?action=addSequence" method="post">
        <label for="seq_title">Titre de la séquence:</label><br>
        <input type="text" id="seq_title" name="seq_title"><br>

        <label for="stage_id">Étape:</label><br>
        <input type="text" id="stage_id" name="stage_id"><br>

        <label for="seq_description">Description de la séquence:</label><br>
        <textarea id="seq_description" name="seq_description"></textarea><br>

        <label for="seq_content">Contenu de la séquence:</label><br>
        <textarea id="seq_content" name="seq_content"></textarea><br>

        <input type="submit" value="Ajouter">
    </form>
    </div>
    </section>
