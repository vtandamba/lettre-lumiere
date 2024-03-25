<section class="accordion">


    <h3 class="accordion-title">Add Exercise</h3>
    <div class="accordion-content">


        <form action="index.php?action=addExercise" method="POST">
            <label for="sequence_id">Sequence ID:</label>
            <input type="text" id="sequence_id" name="sequence_id" required><br><br>

            <label for="exo_type">Type:</label>
            <input type="text" id="exo_type" name="exo_type" required><br><br>

            <label for="exo_consigne">Consigne:</label>
            <input type="text" id="exo_consigne" name="exo_consigne" required><br><br>

            <label for="exo_choices">Choices:</label>
            <input type="text" id="exo_choices" name="exo_choices"><br><br>

            <label for="exo_ordre">Order:</label>
            <input type="number" id="exo_ordre" name="exo_ordre" required><br><br>

            <input type="submit" value="Submit">
        </form>
    </div>

</section>