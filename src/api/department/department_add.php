<?php
  include("../config.php");
  session_start();
  $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
  $mysqli->query("SET time_zone = '+08:00'");

  $description = isset($_POST['description'])?$mysqli->real_escape_string($_POST['description']):"";



  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "INSERT INTO `department`( `description`)
  VALUES ('$description')";
  $mysqli->query($sql);

  echo $mysqli->error;

  $mysqli->close();

?>
