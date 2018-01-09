<?php
  include("../config.php");
  session_start();
  $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
  $mysqli->query("SET time_zone = '+08:00'");

  $student_id = $_SESSION['id'];
  $exam_id = isset($_POST['exam_id'])?$mysqli->real_escape_string($_POST['exam_id']):"";

  $temp = array();


  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "INSERT INTO student_answer(student,exam_question)
            SELECT '$student_id' as student,
            exam_question.id as exam_question
            from exam
            left join exam_question on exam_question.exam = exam.id
            left join question on question.id = exam_question.question
            left join question_option on question_option.question = question.id
            where question_option.is_correct = '1' and exam.id = '$exam_id'
            and NOT EXISTS(SELECT * from student_answer
                left join exam_question on exam_question.id = student_answer.exam_question
                left join exam on exam.id = exam_question.exam
                where exam.id = '$exam_id' and student_answer.student = '$student_id')
            ORDER BY rand()";
  $mysqli->query($sql);
  echo $mysqli->error;
  $mysqli->close();

?>
