<?php

class M_Sequence {
    private $sequence_id;
    private $seq_title;
    private $stage_id;
    private $seq_description;
    private $seq_content;
    private $sta_name;
    private $sta_description;

    // Constructeur
    public function __construct($sequence_id, $seq_title, $stage_id, $seq_description, $seq_content, $sta_name, $sta_description) {
        $this->sequence_id = $sequence_id;
        $this->seq_title = $seq_title;
        $this->stage_id = $stage_id;
        $this->seq_description = $seq_description;
        $this->seq_content = $seq_content;
        $this->sta_name = $sta_name;
        $this->sta_description = $sta_description;
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
    public function getStaName() {
        return $this->sta_name;
    }
    public function getStadescription() {
        return $this->sta_description;
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
