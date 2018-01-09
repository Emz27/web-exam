<?php
  include("../config.php");
  session_start();

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
$mysqli->query("SET time_zone = '+08:00'");

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "SELECT
            subject.description as subject_description,
            subject.id as subject_subject,
            concat(user.firstname,' ',user.lastname) as subject_teacher,
            teacher_subject.id as subject_id
            FROM teacher_subject
            inner join user on teacher_subject.teacher = user.id
            inner join subject on subject.id = teacher_subject.subject
            where (teacher_subject.is_active and user.is_active = 1)
            ";

  $result = $mysqli->query($sql);
  echo $mysqli->error;
  $data = array();
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      array_push($data,$row);
    }
  }
  else {

  }
  $mysqli->close();

  echo json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
?>
