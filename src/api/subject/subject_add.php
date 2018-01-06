<?php
  include("../config.php");
  session_start();
  $description = isset($_POST['description'])?$_POST['description']:"";
  $department = isset($_POST['department'])?$_POST['department']:"";


$conn = new mysqli($db_host, $db_username, $db_password, $db_name);
$conn->query("SET time_zone = '+08:00'");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO `subject`( `description`,`department`)
  VALUES ('$description','$department')";
  $conn->query($sql);

  echo $conn->error;

  $conn->close();

?>
