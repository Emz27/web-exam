<?php
  include("../config.php");
  session_start();

  $question_description = isset($_POST['question_description'])?$_POST['question_description']:"";
  $question_subject_id = isset($_POST['question_subject_id'])?$_POST['question_subject_id']:"";
  $question_subject_description = isset($_POST['question_subject_description'])?$_POST['question_subject_description']:"";
  $question_teacher_id = isset($_POST['question_teacher_id'])?$_POST['question_teacher_id']:"";
  $question_teacher_name = isset($_POST['question_teacher_name'])?$_POST['question_teacher_name']:"";
  $question_type_id = isset($_POST['question_type_id'])?$_POST['question_type_id']:"";
  $question_type_description = isset($_POST['question_type_description'])?$_POST['question_type_description']:"";
  $question_limit = isset($_POST['question_limit'])?$_POST['question_limit']:"";
  $question_point = isset($_POST['question_point'])?$_POST['question_point']:"";
  $question_options = isset($_POST['question_options'])?$_POST['question_options']:array();
  $question_teacher_subject_id = isset($_POST['question_teacher_subject_id'])?$_POST['question_teacher_subject_id']:"";

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
$mysqli->query("SET time_zone = '+08:00'");

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "INSERT INTO `question`(`description`, `teacher_subject`, `type`, `point`)
            VALUES ('$question_description','$question_teacher_subject_id','$question_type_id','$question_point')";
  $mysqli->query($sql);

  if($mysqli->error)echo $mysqli->error.' line 33';
  $id = $mysqli->insert_id;

    foreach ($question_options as $value){
      $sql = "INSERT INTO `question_option`( `description`, `is_correct`, `question`)
                VALUES ('".$value['description']."','".$value['is_correct']."','$id')";
      $mysqli->query($sql);
      if($mysqli->error)echo $mysqli->error.' line 40';
    }
  $mysqli->close();

?>
