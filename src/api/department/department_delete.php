<?php
  include("../config.php");
  session_start();

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
$mysqli->query("SET time_zone = '+08:00'");

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $id = $mysqli->real_escape_string($_POST['id']);

  $sql = "DELETE from department where id = $id";
  $mysqli->query($sql);
  $mysqli->close();

?>
