<?php
  include("../../config.php");
  session_start();

  $exam_description = isset($_POST['exam_description'])?$_POST['exam_description']:"";
  $exam_type_id = isset($_POST['exam_type_id'])?$_POST['exam_type_id']:"";
  $subject_id = isset($_POST['subject_id'])?$_POST['subject_id']:"";
  $teacher_subject_id = isset($_POST['teacher_subject_id'])?$_POST['teacher_subject_id']:"";
  $teacher_id = isset($_POST['teacher_id'])?$_POST['teacher_id']:"";
  $date_start = isset($_POST['date_start'])?$_POST['date_start']:"";
  $date_end = isset($_POST['date_end'])?$_POST['date_end']:"";
  $duration = isset($_POST['duration'])?$_POST['duration']:"";

  $exam_questions = isset($_POST['exam_questions'])?$_POST['exam_questions']:"";

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO `exam`(`description`, `type`, `teacher_subject`, `date_start`, `date_end`, `duration`)
              VALUES ('$exam_description', '$exam_type_id', '$teacher_subject_id', '$date_start', '$date_end', '$duration')";
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
