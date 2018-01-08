<?php
  include("../config.php");
  session_start();
  $id = isset($_POST['id'])?$_POST['id']:"";
  $description = isset($_POST['description'])?$_POST['description']:"";

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
$mysqli->query("SET time_zone = '+08:00'");

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "UPDATE department SET description='$description' WHERE id = '$id'";
  $mysqli->query($sql);

  echo $mysqli->error;

  $mysqli->close();

?>
