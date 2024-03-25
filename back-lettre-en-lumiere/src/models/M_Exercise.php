<?php

class M_Exercise {
    private $exercice_id;
    private $sequence_id;
    private $exo_type;
    private $exo_consigne;
    private $exo_choices;
    private $exo_ordre;

    // Constructeur
    public function __construct($exercice_id, $sequence_id, $exo_type, $exo_consigne, $exo_choices, $exo_ordre) {
        $this->exercice_id = $exercice_id;
        $this->sequence_id = $sequence_id;
        $this->exo_type = $exo_type;
        $this->exo_consigne = $exo_consigne;
        $this->exo_choices = $exo_choices;
        $this->exo_ordre = $exo_ordre;
    }

    // Getters
    public function getExerciceId() {
        return $this->exercice_id;
    }

    public function getSequenceId() {
        return $this->sequence_id;
    }

    public function getExoType() {
        return $this->exo_type;
    }

    public function getExoConsigne() {
        return $this->exo_consigne;
    }

    public function getExoChoices() {
        return $this->exo_choices;
    }

    public function getExoOrdre() {
        return $this->exo_ordre;
    }

    // Setters
    public function setSequenceId($sequence_id) {
        $this->sequence_id = $sequence_id;
    }

    public function setExoType($exo_type) {
        $this->exo_type = $exo_type;
    }

    public function setExoConsigne($exo_consigne) {
        $this->exo_consigne = $exo_consigne;
    }

    public function setExoChoices($exo_choices) {
        $this->exo_choices = $exo_choices;
    }

    public function setExoOrdre($exo_ordre) {
        $this->exo_ordre = $exo_ordre;
    }
}
?>
