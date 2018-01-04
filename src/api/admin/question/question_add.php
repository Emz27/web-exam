<?php
  include("../../config.php");
  session_start();

  $question_description = isset($_POST['question_description'])?$_POST['question_description']:"";
  $subject_id = isset($_POST['subject_id'])?$_POST['subject_id']:"";
  $subject_description = isset($_POST['subject_description'])?$_POST['subject_description']:"";
  $teacher_id = isset($_POST['teacher_id'])?$_POST['teacher_id']:"";
  $teacher_name = isset($_POST['teacher_name'])?$_POST['teacher_name']:"";
  $exam_type_id = isset($_POST['exam_type_id'])?$_POST['exam_type_id']:"";
  $exam_type_description = isset($_POST['exam_type_description'])?$_POST['exam_type_description']:"";
  $question_type_id = isset($_POST['question_type_id'])?$_POST['question_type_id']:"";
  $question_type_description = isset($_POST['question_type_description'])?$_POST['question_type_description']:"";
  $question_limit = isset($_POST['question_limit'])?$_POST['question_limit']:"";
  $point = isset($_POST['point'])?$_POST['point']:"";
  $question_options = isset($_POST['question_options'])?$_POST['question_options']:array();
  $question_teacher_subject_id = isset($_POST['question_teacher_subject_id'])?$_POST['question_teacher_subject_id']:"";

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO `question`(`description`, `teacher_subject`, `type`, `exam_type`, `point`)
            VALUES ('$question_description','$question_teacher_subject_id','$question_type_id','$exam_type_id','$point')";
  $conn->query($sql);

  if($conn->error)echo $conn->error.' line 33';
  $id = $conn->insert_id;

    foreach ($question_options as $value){
      $sql = "INSERT INTO `question_option`( `description`, `is_correct`, `question`)
                VALUES ('".$value['description']."','".$value['is_correct']."','$id')";
      $conn->query($sql);
      if($conn->error)echo $conn->error.' line 40';
    }
  $conn->close();

?>
