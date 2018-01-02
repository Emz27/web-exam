<?php
  include("../../config.php");
  session_start();

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = "SELECT
            q.id as id,
            q.description as description,
            q.subject as subject_id,
            subject.description as subject_description,
            q.teacher as teacher_id,
            concat(user.firstname,' ',user.lastname) as teacher_name,
            q.type as question_type_id,
            question_type.description as question_type_description,
            exam_type.id as exam_type_id,
            exam_type.description as exam_type_description,
            q.point as point,
            question_type.option_limit as option_limit
            from question as q
            left join user on q.teacher = user.id
            left join subject on q.subject = subject.id
            left join question_type on q.type = question_type.id
            left join exam_type on q.exam_type = exam_type.id";
  $data = array();
  $result = $conn->query($sql);
  echo $conn->error;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $row['question_options'] = array();
      $result1 = $conn->query("SELECT * from question_option where question=".$row['id']."");
      while($row1 = $result1->fetch_assoc()){
        array_push($row['question_options'],$row1);
      }
      array_push($data,$row);
    }
  }
  $conn->close();

  echo json_encode($data);
?>
