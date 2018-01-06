<?php
  include("../config.php");
  session_start();
  $id = isset($_POST['id'])?$_POST['id']:"";
  $description = isset($_POST['description'])?$_POST['description']:"";

$conn = new mysqli($db_host, $db_username, $db_password, $db_name);
$conn->query("SET time_zone = "+08:00"");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "UPDATE department SET description='$description' WHERE id = '$id'";
  $conn->query($sql);

  echo $conn->error;

  $conn->close();

?>
