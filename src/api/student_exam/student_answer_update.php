<?php
  include("../config.php");
  session_start();

  $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
  $mysqli->query("SET time_zone = '+08:00'");

  $student_id = $_SESSION['id'];
  $answer = isset($_POST['answer'])?$mysqli->real_escape_string($_POST['answer']):"";
  $student_answer_id = isset($_POST['student_answer_id'])?$mysqli->real_escape_string($_POST['student_answer_id']):"";

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "UPDATE `student_answer` SET
              `answer`='$answer'
              where id ='$student_answer_id'
              ";
  $mysqli->query($sql);
  echo $mysqli->error;
  $mysqli->close();

?>
