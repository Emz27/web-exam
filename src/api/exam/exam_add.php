<?php
  include("../config.php");
  session_start();
  $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
  $mysqli->query("SET time_zone = '+08:00'");

  $exam_description = isset($_POST['exam_description'])?$mysqli->real_escape_string($_POST['exam_description']):"";
  $exam_type_id = isset($_POST['exam_type_id'])?$mysqli->real_escape_string($_POST['exam_type_id']):"";
  $exam_subject_id = isset($_POST['exam_subject_id'])?$mysqli->real_escape_string($_POST['exam_subject_id']):"";
  $exam_teacher_subject_id = isset($_POST['exam_teacher_subject_id'])?$mysqli->real_escape_string($_POST['exam_teacher_subject_id']):"";
  $exam_teacher_id = isset($_POST['exam_teacher_id'])?$mysqli->real_escape_string($_POST['exam_teacher_id']):"";
  $exam_date_start = isset($_POST['exam_date_start'])?str_replace("T"," ",$_POST['exam_date_start']):"";
  $exam_date_end = isset($_POST['exam_date_end'])?str_replace("T"," ",$_POST['exam_date_end']):"";
  $exam_duration = isset($_POST['exam_duration'])?$mysqli->real_escape_string($_POST['exam_duration']):"";

  $exam_questions = isset($_POST['exam_questions'])?$_POST['exam_questions']:"";


  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "INSERT INTO `exam`(`description`, `type`, `teacher_subject`, `date_start`, `date_end`, `duration`)
              VALUES ('$exam_description', '$exam_type_id', '$exam_teacher_subject_id', '$exam_date_start', '$exam_date_end', '$exam_duration')";
  $mysqli->query($sql);

  if($mysqli->error)echo $mysqli->error.' line 33';

  $id = $mysqli->insert_id;
    foreach ($exam_questions as $value){
      $sql = "INSERT INTO `exam_question`(`exam`, `question`)
                  VALUES ('$id','".$value['question_id']."')";
      $mysqli->query($sql);
      if($mysqli->error)echo $mysqli->error.' line 40';
    }
  $mysqli->close();

?>
