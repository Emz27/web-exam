<?php
  include("../../config.php");
  session_start();
  $id = isset($_POST['id'])?$_POST['id']:"";
  $description = isset($_POST['description'])?$_POST['description']:"";
  $department = isset($_POST['department'])?$_POST['department']:"";

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "UPDATE subject SET description='$description',department='$department' WHERE id = '$id'";
  $conn->query($sql);

  echo $conn->error;

  $conn->close();

?>
