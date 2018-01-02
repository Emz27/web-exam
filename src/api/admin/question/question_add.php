<?php
  include("../../config.php");
  session_start();

  $description = isset($_GET['description'])?$_GET['description']:"";
  $subject_id = isset($_GET['subject_id'])?$_GET['subject_id']:"";
  $subject_description = isset($_GET['subject_description'])?$_GET['subject_description']:"";
  $teacher_id = isset($_GET['teacher_id'])?$_GET['teacher_id']:"";
  $teacher_name = isset($_GET['teacher_name'])?$_GET['teacher_name']:"";
  $exam_type_id = isset($_GET['exam_type_id'])?$_GET['exam_type_id']:"";
  $exam_type_description = isset($_GET['exam_type_description'])?$_GET['exam_type_description']:"";
  $question_type_id = isset($_GET['question_type_id'])?$_GET['question_type_id']:"";
  $question_type_description = isset($_GET['question_type_description'])?$_GET['question_type_description']:"";
  $question_limit = isset($_GET['question_limit'])?$_GET['question_limit']:"";
  $point = isset($_GET['point'])?$_GET['point']:"";
  $question_options = isset($_GET['question_options'])?$_GET['question_options']:array();

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO `question`(`description`, `subject`, `teacher`, `type`, `exam_type`, `point`)
            VALUES ('$description','$subject_id','$teacher_id','$question_type_id','$exam_type_id','$point')";
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
