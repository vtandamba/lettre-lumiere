<?php
class Exercise {
    private $id;
    private $sequenceId;
    private $type;
    private $consigne;
    private $choices;
    private $ordre;

    public function __construct($id, $sequenceId, $type, $consigne, $choices, $ordre) {
        $this->id = $id;
        $this->sequenceId = $sequenceId;
        $this->type = $type;
        $this->consigne = $consigne;
        $this->choices = $choices;
        $this->ordre = $ordre;
    }

    // Getters et setters pour chaque propriété
    public function getId() {
        return $this->id;
    }

    public function getSequenceId() {
        return $this->sequenceId;
    }

    public function getType() {
        return $this->type;
    }

    public function getConsigne() {
        return $this->consigne;
    }

    public function getChoices() {
        return $this->choices;
    }

    public function getOrdre() {
        return $this->ordre;
    }

    public function setSequenceId($sequenceId) {
        $this->sequenceId = $sequenceId;
    }

    public function setType($type) {
        $this->type = $type;
    }

    public function setConsigne($consigne) {
        $this->consigne = $consigne;
    }

    public function setChoices($choices) {
        $this->choices = $choices;
    }

    public function setOrdre($ordre) {
        $this->ordre = $ordre;
    }
}


// CREER UN EXERCICE
$exercise = new Exercise(
    $id,  
    $sequenceId,  
    $type,  
    $consigne,  
    $choices,  
    $ordre  
);


?>
