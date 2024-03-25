<?php

class M_Sequence {
    private $sequence_id;
    private $seq_title;
    private $stage_id;
    private $seq_description;
    private $seq_content;

    // Constructeur
    public function __construct($sequence_id, $seq_title, $stage_id, $seq_description, $seq_content) {
        $this->sequence_id = $sequence_id;
        $this->seq_title = $seq_title;
        $this->stage_id = $stage_id;
        $this->seq_description = $seq_description;
        $this->seq_content = $seq_content;
    }

    // Getters
    public function getSequenceId() {
        return $this->sequence_id;
    }

    public function getSeqTitle() {
        return $this->seq_title;
    }

    public function getStageId() {
        return $this->stage_id;
    }

    public function getSeqDescription() {
        return $this->seq_description;
    }

    public function getSeqContent() {
        return $this->seq_content;
    }

    // Setters
    public function setSeqTitle($seq_title) {
        $this->seq_title = $seq_title;
    }

    public function setStageId($stage_id) {
        $this->stage_id = $stage_id;
    }

    public function setSeqDescription($seq_description) {
        $this->seq_description = $seq_description;
    }

    public function setSeqContent($seq_content) {
        $this->seq_content = $seq_content;
    }
}
?>
