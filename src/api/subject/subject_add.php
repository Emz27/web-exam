<?php
  include("../config.php");
  session_start();
  $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
  $mysqli->query("SET time_zone = '+08:00'");
  $description = isset($_POST['description'])?$mysqli->real_escape_string($_POST['description']):"";
  $department = isset($_POST['department'])?$mysqli->real_escape_string($_POST['department']):"";



  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "INSERT INTO `subject`( `description`,`department`)
  VALUES ('$description','$department')";
  $mysqli->query($sql);

  echo $mysqli->error;

  $mysqli->close();

?>
