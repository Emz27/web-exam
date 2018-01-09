<?php
  include("../config.php");
  session_start();

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
$mysqli->query("SET time_zone = '+08:00'");
  $fetch_filter = isset($_POST['fetch_filter'])?$mysqli->real_escape_string($_POST['fetch_filter']):"";
  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }
  $sql = "SELECT
            exam.id as exam_id,
            exam.description as exam_description,
            exam_type.id as exam_type_id,
            exam_type.description as exam_type_description,
            subject.id as exam_subject_id,
            subject.description as exam_subject_description,
            teacher_subject.id as exam_teacher_subject_id,
            user.id as exam_teacher_id,
            concat(user.firstname,' ',user.lastname) as exam_teacher_name,
            date_end as exam_date_end,
            date_start as exam_date_start,
            duration as exam_duration

            from exam
            left join exam_type on exam_type.id = exam.type
            left join teacher_subject on teacher_subject.id = exam.teacher_subject
            left join user on user.id = teacher_subject.teacher
            left join subject on subject.id = teacher_subject.subject
            $fetch_filter";
  $data = array();
  $result = $mysqli->query($sql);
  echo $mysqli->error;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $row['exam_questions'] = array();
      $sql1 = "SELECT
                q.id as question_id,
                q.description as question_description,
                subject.id as question_subject_id,
                subject.description as question_subject_description,
                user.id as question_teacher_id,
                concat(user.firstname,' ',user.lastname) as question_teacher_name,
                q.type as question_type_id,
                question_type.description as question_type_description,
                q.point as question_point,
                question_type.option_limit as question_option_limit
                from exam_question
                left join question as q on q.id = exam_question.question
                left join question_type on q.type = question_type.id
                left join teacher_subject on teacher_subject.id = q.teacher_subject
                left join user on teacher_subject.teacher = user.id
                left join subject on teacher_subject.subject = subject.id
                where exam_question.exam = '".$row['exam_id']."'";

      $result1 = $mysqli->query($sql1);
      echo $mysqli->error;
      while($row1 = $result1->fetch_assoc()){
        $row1['question_options'] = array();
        $sql2 = "SELECT * from question_option where question=".$row1['question_id']."";
        $result2 = $mysqli->query($sql2);
        while($row2 = $result2->fetch_assoc()){
          array_push($row1['question_options'],$row2);
        }
        array_push($row['exam_questions'],$row1);
      }
      array_push($data,$row);
    }
  }
  $mysqli->close();

  echo json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
?>
