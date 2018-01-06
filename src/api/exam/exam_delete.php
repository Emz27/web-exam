<?php
  include("../config.php");
  session_start();

$conn = new mysqli($db_host, $db_username, $db_password, $db_name);
$conn->query("SET time_zone = "+08:00"");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $id = $_POST['exam_id'];

  $sql = "DELETE from exam where id = $id";
  $conn->query($sql);
  $conn->close();

?>
