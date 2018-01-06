<?php
  include("../../config.php");
  session_start();

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $id = $_POST['question_id'];

  $sql = "DELETE from question where id = $id";
  $conn->query($sql);
  $conn->close();

?>
