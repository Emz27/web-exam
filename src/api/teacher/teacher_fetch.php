<?php
  include("../config.php");

$conn = new mysqli($db_host, $db_username, $db_password, $db_name);
$conn->query("SET time_zone = '+08:00'");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = "SELECT
            user.id as id,
            concat(user.firstname,' ',user.lastname) as teacher_name
            FROM user
            inner join user_type on user.type = user_type.id
            where user_type.description like 'Teacher'";
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
