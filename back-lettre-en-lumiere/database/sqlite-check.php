<?php
$dbname='base';
if(!class_exists('SQLite3'))
  die("SQLite 3 NOT supported.");
  
$base=new SQLite3($dbname, 0666);
echo "SQLite 3 supported."; 
?>