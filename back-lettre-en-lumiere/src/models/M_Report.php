<?php

class M_Report {
    private $stage_id;
    private $sequence_id;
    private $rep_type;
    private $rep_contenu;

    // Constructeur
    public function __construct($stage_id, $sequence_id, $rep_type, $rep_contenu) {
        $this->stage_id = $stage_id;
        $this->sequence_id = $sequence_id;
        $this->rep_type = $rep_type;
        $this->rep_contenu = $rep_contenu;
    }

    // Getters
    public function getStageId() {
        return $this->stage_id;
    }

    public function getSequenceId() {
        return $this->sequence_id;
    }

    public function getRepType() {
        return $this->rep_type;
    }

    public function getRepContenu() {
        return $this->rep_contenu;
    }

    // Setters
    public function setRepType($rep_type) {
        $this->rep_type = $rep_type;
    }

    public function setRepContenu($rep_contenu) {
        $this->rep_contenu = $rep_contenu;
    }
}
?>
