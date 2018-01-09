<?php
  include("../config.php");
  session_start();

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
$mysqli->query("SET time_zone = '+08:00'");
  $fetch_filter = isset($_POST['fetch_filter'])?$_POST['fetch_filter']:"";
  $student_id = $_SESSION['id'];
  $state = isset($_POST['state'])?$_POST['state']:"";
  if($fetch_filter=="") $fetch_filter = isset($_GET['fetch_filter'])?$_GET['fetch_filter']:" 1";
  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }
  switch($state){
    case "present":{
      $fetch_filter =  " where student_subject.student ='$student_id'
      and exam.date_start < now()
      and exam.date_end > now() ";
      break;
    }
    case "future":{
      $fetch_filter = "  where student_subject.student ='$student_id'
      and exam.date_start > now()
      and exam.date_end > now()";
      break;
    }
    case "past":{
      $fetch_filter = " where student_subject.student ='$student_id'
      and exam.date_start < now()
      and exam.date_end < now()";
      break;
    }
  }

  $exam_sql = "SELECT
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

            left join student_subject on student_subject.teacher_subject = teacher_subject.id

            $fetch_filter";
  $data = array();
  $exam_result = $mysqli->query($exam_sql);
  echo $mysqli->error;
  if ($exam_result->num_rows > 0) {
    while($exam_row = $exam_result->fetch_assoc()){
      $exam_row['exam_questions'] = array();
      $exam_question_sql = "SELECT
                q.id as question_id,
                exam_question.id as exam_question_id,
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
                where exam_question.exam = '".$exam_row['exam_id']."'
                order by q.type,q.id";

      $exam_question_result = $mysqli->query($exam_question_sql);
      echo $mysqli->error;
      while($exam_question_row = $exam_question_result->fetch_assoc()){
        $exam_question_row['question_options'] = array();
        $exam_question_row['student_answers'] = array();
        $question_option_sql = "SELECT * from question_option where question=".$exam_question_row['question_id']."";
        $question_option_result = $mysqli->query($question_option_sql);
        while($question_option_row = $question_option_result->fetch_assoc()){
          array_push($exam_question_row['question_options'],$question_option_row);
        }
        $student_answer_sql = "SELECT * from student_answer
                                where exam_question=".$exam_question_row['exam_question_id']."
                                and student='".$student_id."'";
        $student_answer_result = $mysqli->query($student_answer_sql);
        while($student_answer_row = $student_answer_result->fetch_assoc()){
          $student_answer_row["student_answer_is_correct"] = "0";

          $is_correct_sql = "SELECT * from question_option
                    where question_option.question = '".$exam_question_row['question_id']."'
                    AND description = '".$student_answer_row['answer']."'";
          $is_correct_result = $mysqli->query($is_correct_sql);
          if($is_correct_result->num_rows) $student_answer_row["student_answer_is_correct"] = "1";
          array_push($exam_question_row['student_answers'],$student_answer_row);
        }
        array_push($exam_row['exam_questions'],$exam_question_row);

      }
      array_push($data,$exam_row);
    }
  }
  $mysqli->close();

  echo json_encode($data);
?>
