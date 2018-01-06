<?php
  include("../config.php");
  session_start();

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $id = $_POST['id'];

  $sql = "DELETE from department where id = $id";
  $conn->query($sql);
  $conn->close();

?>
