<?php
  include("../../config.php");
  session_start();
  $id = isset($_GET['id'])?$_GET['id']:"";
  $description = isset($_GET['description'])?$_GET['description']:"";
  $department = isset($_GET['department'])?$_GET['department']:"";

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "UPDATE subject SET description='$description',department='$department' WHERE id = '$id'";
  $conn->query($sql);

  echo $conn->error;

  $conn->close();

?>
