<?php
 
    class User {
        private $id;
        private $name;
        private $surname;
        private $password;
    
        public function __construct($id, $name, $surname, $password) {
            $this->user_id = $id;
            $this->user_name = $name;
            $this->user_surname = $surname;
            $this->user_password = $password;
        }
    
        // Getters et setters pour chaque propriété
        public function getId() {
            return $this->user_id;
        }
    
        public function getName() {
            return $this->user_name;
        }
    
        public function getSurname() {
            return $this->user_surname;
        }
    
        public function getPassword() {
            return $this->user_password;
        }
    
        public function setName($name) {
            $this->user_name = $name;
        }
    
        public function setSurname($surname) {
            $this->user_surname = $surname;
        }
    
        public function setPassword($password) {
            $this->user_password = $password;
        }
    }
    


?>