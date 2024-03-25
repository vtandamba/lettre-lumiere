
<?php
class M_ProgressSeq {
    private $user_id;
    private $sequence_id;
    private $completed;
    private $seq_score;

    // Constructeur
    public function __construct($user_id, $sequence_id, $completed, $seq_score) {
        $this->user_id = $user_id;
        $this->sequence_id = $sequence_id;
        $this->completed = $completed;
        $this->seq_score = $seq_score;
    }

    // Getters
    public function getUserId() {
        return $this->user_id;
    }

    public function getSequenceId() {
        return $this->sequence_id;
    }

    public function getCompleted() {
        return $this->completed;
    }

    public function getSeqScore() {
        return $this->seq_score;
    }

    // Setters
    public function setUserId($user_id) {
        $this->user_id = $user_id;
    }

    public function setSequenceId($sequence_id) {
        $this->sequence_id = $sequence_id;
    }

    public function setCompleted($completed) {
        $this->completed = $completed;
    }

    public function setSeqScore($seq_score) {
        $this->seq_score = $seq_score;
    }
}
?>
