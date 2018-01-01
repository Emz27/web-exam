<?php
  include("../../config.php");
  session_start();
  $description = isset($_GET['description'])?$_GET['description']:"";
  $department = isset($_GET['department'])?$_GET['department']:"";


  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO `subject`( `description`,`department`)
  VALUES ('$description','$department')";
  $conn->query($sql);

  echo $conn->error;

  $conn->close();

?>
