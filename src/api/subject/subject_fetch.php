<?php
  include("../config.php");

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
$mysqli->query("SET time_zone = '+08:00'");

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }
  $sql = "SELECT
            subject.id as id,
            subject.description as description,
            subject.department as department,
            department.description as department_description
            FROM subject left join department on subject.department = department.id";
  $result = $mysqli->query($sql);
  $data = array();
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      array_push($data,$row);
    }
  }
  $mysqli->close();
  echo json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
?>
