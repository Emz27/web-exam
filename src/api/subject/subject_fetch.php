<?php
  include("../config.php");

$conn = new mysqli($db_host, $db_username, $db_password, $db_name);
$conn->query("SET time_zone = '+08:00'");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = "SELECT
            subject.id as id,
            subject.description as description,
            subject.department as department,
            department.description as department_description
            FROM subject left join department on subject.department = department.id";
  $result = $conn->query($sql);
  $data = array();
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      array_push($data,$row);
    }
  }
  $conn->close();
  echo json_encode($data);
?>
