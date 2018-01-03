<?php
  include("../../config.php");
  session_start();

  $exam_id = isset($_POST['exam_id'])?$_POST['exam_id']:"";
  $exam_description = isset($_POST['exam_description'])?$_POST['exam_description']:"";
  $exam_type_id = isset($_POST['exam_type_id'])?$_POST['exam_type_id']:"";
  $subject_id = isset($_POST['subject_id'])?$_POST['subject_id']:"";
  $teacher_subject_id = isset($_POST['teacher_subject_id'])?$_POST['teacher_subject_id']:"";
  $teacher_id = isset($_POST['teacher_id'])?$_POST['teacher_id']:"";
  $date_start = isset($_POST['date_start'])?$_POST['date_start']:"";
  $date_end = isset($_POST['date_end'])?$_POST['date_end']:"";
  $duration = isset($_POST['duration'])?$_POST['duration']:"";

  $exam_questions = isset($_POST['exam_questions'])?$_POST['exam_questions']:"";

  $temp = array();
  foreach($exam_questions as $value){
    array_push($temp,$value['question_id']);
  }

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "UPDATE `exam` SET `description`='$exam_description',`type`='$exam_type_id',
            `teacher_subject`='$teacher_subject_id',`date_start`='$date_start',
            `date_end`='$date_end',`duration`='$duration'
            WHERE id='$exam_id'";
  $conn->query($sql);
  if($conn->error)echo $conn->error.' line 35';

    $arr = "'asdfashasdasdgs'";
    if($temp) $arr .= ",'".join("','",$temp)."'";
    $sql = "DELETE FROM
             exam_question
             WHERE
             exam='$exam_id'
             and
             question NOT IN ('asdfsadfsadfasdf',".$arr.")";
    $conn->query($sql);
    if($conn->error)echo $conn->error.' line 46';

    foreach ($exam_questions as $value){
      $sql = "INSERT INTO exam_question (exam,question)
       SELECT * FROM (SELECT '$exam_id' as a, '".$value['question_id']."' as b) AS tmp
       WHERE NOT EXISTS (
           SELECT * FROM exam_question
           WHERE question = '".$value['question_id']."' and exam = '$exam_id'
       )";
      $conn->query($sql);
      if($conn->error)echo $conn->error.' line 53';
    }
  $conn->close();

?>
