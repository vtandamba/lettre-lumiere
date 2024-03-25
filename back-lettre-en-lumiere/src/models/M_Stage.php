<?php

class M_Stage {
    private $stage_id;
    private $sta_name;
    private $sta_description;

    // Constructeur
    public function __construct($stage_id, $sta_name, $sta_description) {
        $this->stage_id = $stage_id;
        $this->sta_name = $sta_name;
        $this->sta_description = $sta_description;
    }

    // Getters
    public function getStageId() {
        return $this->stage_id;
    }

    public function getStaName() {
        return $this->sta_name;
    }

    public function getStaDescription() {
        return $this->sta_description;
    }

    // Setters
    public function setStaName($sta_name) {
        $this->sta_name = $sta_name;
    }

    public function setStaDescription($sta_description) {
        $this->sta_description = $sta_description;
    }
}
?>
