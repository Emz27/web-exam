<?php
  include("../../config.php");
  session_start();

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
  $sql = "SELECT
            exam.id as exam_id,
            exam.description as exam_description,
            exam_type.id as exam_type_id,
            exam_type.description as exam_type_description,
            subject.id as subject_id,
            subject.description as subject_description,
            teacher_subject.id as teacher_subject_id,
            user.id as teacher_id,
            concat(user.firstname,' ',user.lastname) as teacher_name,
            date_end,
            date_start,
            duration

            from exam
            left join exam_type on exam_type.id = exam.type
            left join teacher_subject on teacher_subject.id = exam.teacher_subject
            left join user on user.id = teacher_subject.teacher
            left join subject on subject.id = teacher_subject.subject";
  $data = array();
  $result = $conn->query($sql);
  echo $conn->error;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $row['exam_questions'] = array();
      $sql1 = "SELECT
                q.id as question_id,
                q.description as question_description,
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
                from exam_question
                left join question as q on question.id = exam_question.question
                left join user on q.teacher = user.id
                left join subject on q.subject = subject.id
                left join question_type on q.type = question_type.id
                left join exam_type on q.exam_type = exam_type.id
                where exam_question.exam = '".$row['exam_id']."'";
      while($row1 = $result1->fetch_assoc()){
        $row1['question_options'] = array();
        $sql2 = "SELECT * from question_option where question=".$row1['question_id']."";
        $result2 = $conn->query($sql2);
        while($row2 = $result2->fetch_assoc()){
          array_push($row['question_options'],$row2);
        }
        array_push($row['exam_questions'],$row1);
      }
      array_push($data,$row);
    }
  }
  $conn->close();

  echo json_encode($data);
?>
