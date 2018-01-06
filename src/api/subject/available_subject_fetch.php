<?php
  include("../config.php");
  session_start();

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT
            subject.description as subject_description,
            subject.id as subject_id,
            concat(user.firstname,' ',user.lastname) as teacher_name,
            teacher_subject.id as teacher_subject_id
            FROM teacher_subject
            inner join user on teacher_subject.teacher = user.id
            inner join subject on subject.id = teacher_subject.subject
            where (teacher_subject.is_active and user.is_active = 1)
            ";

  $result = $conn->query($sql);
  echo $conn->error;
  $data = array();
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      array_push($data,$row);
    }
  }
  else {

  }
  $conn->close();

  echo json_encode($data);
?>
