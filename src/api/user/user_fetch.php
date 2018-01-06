<?php
  include("../../config.php");
  session_start();

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }


  $sql1 = "SELECT
              user.id as id,user.username as username,user.password as password,
              user.firstname as firstname,user.lastname as lastname,user.middlename as middlename,
              user.type as type,user_type.description as type_description,
              group_concat(subject.description) as subject_description,
              group_concat(teacher_subject.id) as subject_id,
              group_concat(subject.id) as subject_subject
              FROM user
              left join user_type on user_type.id = user.type
              left join teacher_subject on teacher_subject.teacher = user.id
              left join subject on subject.id = teacher_subject.subject
              where user.is_active = 1 and user.type = 2
              group by user.id
              ";
  $sql2 = "SELECT
              user.id as id,user.username as username,user.password as password,
              user.firstname as firstname,user.lastname as lastname,user.middlename as middlename,
              user.type as type,user_type.description as type_description,
              group_concat(subject.description) as subject_description,
              group_concat(subject.id) as subject_id,
              group_concat(teacher_subject.id) as subject_subject,
              group_concat(concat(u.firstname,' ',u.lastname)) as subject_teacher
              FROM user
              left join user_type on user_type.id = user.type
              left join student_subject on student_subject.student = user.id
              left join teacher_subject on teacher_subject.id = student_subject.teacher_subject
              left join user as u on u.id = teacher_subject.teacher
              left join subject on subject.id = teacher_subject.subject
              where user.is_active = 1 and user.type = 3
              group by user.id
              ";


  $data = array();
  $result = $conn->query($sql1);
  echo $conn->error;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $row['subject_id'] = explode(',',$row['subject_id'],0);
      $row['subject_subject'] = explode(',',$row['subject_subject'],0);
      $row['subject_teacher'] = array();
      $row['subject_description'] = explode(',',$row['subject_description'],0);
      array_push($data,$row);
    }
  }
  $result = $conn->query($sql2);
  echo $conn->error;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $row['subject_id'] = explode(',',$row['subject_id'],0);
      $row['subject_subject'] = explode(',',$row['subject_subject'],0);
      $row['subject_teacher'] = explode(',',$row['subject_teacher'],0);
      $row['subject_description'] = explode(',',$row['subject_description'],0);
      array_push($data,$row);
    }
  }
  $conn->close();

  echo json_encode($data);
?>
