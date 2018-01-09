<?php
  include("../config.php");
  session_start();
  $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
  $mysqli->query("SET time_zone = '+08:00'");
  $id = isset($_POST['id'])?$mysqli->real_escape_string($_POST['id']):"";
  $description = isset($_POST['description'])?$mysqli->real_escape_string($_POST['description']):"";
  $department = isset($_POST['department'])?$mysqli->real_escape_string($_POST['department']):"";


  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "UPDATE subject SET description='$description',department='$department' WHERE id = '$id'";
  $mysqli->query($sql);

  echo $mysqli->error;

  $mysqli->close();

?>
