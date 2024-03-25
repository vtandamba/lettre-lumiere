<?php

class M_UserProgress {
    private $user_id;
    private $exercice_id;
    private $pro_score;
    private $pro_date;

    // Constructeur
    public function __construct($user_id, $exercice_id, $pro_score, $pro_date) {
        $this->user_id = $user_id;
        $this->exercice_id = $exercice_id;
        $this->pro_score = $pro_score;
        $this->pro_date = $pro_date;
    }

    // Getters
    public function getUserId() {
        return $this->user_id;
    }

    public function getExerciceId() {
        return $this->exercice_id;
    }

    public function getProScore() {
        return $this->pro_score;
    }

    public function getProDate() {
        return $this->pro_date;
    }

    // Setters
    public function setProScore($pro_score) {
        $this->pro_score = $pro_score;
    }

    public function setProDate($pro_date) {
        $this->pro_date = $pro_date;
    }
}
?>
