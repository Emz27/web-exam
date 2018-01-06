<?php
  include("../../config.php");
  session_start();

  $exam_description = isset($_POST['exam_description'])?$_POST['exam_description']:"";
  $exam_type_id = isset($_POST['exam_type_id'])?$_POST['exam_type_id']:"";
  $exam_subject_id = isset($_POST['exam_subject_id'])?$_POST['exam_subject_id']:"";
  $exam_teacher_subject_id = isset($_POST['exam_teacher_subject_id'])?$_POST['exam_teacher_subject_id']:"";
  $exam_teacher_id = isset($_POST['exam_teacher_id'])?$_POST['exam_teacher_id']:"";
  $exam_date_start = isset($_POST['exam_date_start'])?str_replace("T"," ",$_POST['exam_date_start']):"";
  $exam_date_end = isset($_POST['exam_date_end'])?str_replace("T"," ",$_POST['exam_date_end']):"";
  $exam_duration = isset($_POST['exam_duration'])?$_POST['exam_duration']:"";

  $exam_questions = isset($_POST['exam_questions'])?$_POST['exam_questions']:"";

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO `exam`(`description`, `type`, `teacher_subject`, `date_start`, `date_end`, `duration`)
              VALUES ('$exam_description', '$exam_type_id', '$exam_teacher_subject_id', '$exam_date_start', '$exam_date_end', '$exam_duration')";
  $conn->query($sql);

  if($conn->error)echo $conn->error.' line 33';

  $id = $conn->insert_id;
    foreach ($exam_questions as $value){
      $sql = "INSERT INTO `exam_question`(`exam`, `question`)
                  VALUES ('$id','".$value['question_id']."')";
      $conn->query($sql);
      if($conn->error)echo $conn->error.' line 40';
    }
  $conn->close();

?>
