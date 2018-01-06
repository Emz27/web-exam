<?php
  include("../config.php");
  session_start();

$conn = new mysqli($db_host, $db_username, $db_password, $db_name);
$conn->query("SET time_zone = '+08:00'");
  $fetch_filter = isset($_POST['fetch_filter'])?$_POST['fetch_filter']:"";
  $student_id = isset($_POST['student_id'])?$_POST['student_id']:"";
  $state = isset($_POST['state'])?$_POST['state']:"";
  if($fetch_filter=="") $fetch_filter = isset($_GET['fetch_filter'])?$_GET['fetch_filter']:" 1";
  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
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

  $sql = "SELECT
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
  $result = $conn->query($sql);
  echo $conn->error;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $row['exam_questions'] = array();
      $sql1 = "SELECT
                q.id as question_id,
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
                where exam_question.exam = '".$row['exam_id']."'";

      $result1 = $conn->query($sql1);
      echo $conn->error;
      while($row1 = $result1->fetch_assoc()){
        $row1['question_options'] = array();
        $row1['student_answers'] = array();
        $sql2 = "SELECT * from question_option where question=".$row1['question_id']."";
        $result2 = $conn->query($sql2);
        while($row2 = $result2->fetch_assoc()){
          array_push($row1['question_options'],$row2);
        }
        $sql3 = "SELECT answer from student_answer where exam_question=".$row1['question_id']."
                    and student='".$student_id."'";
        $result3 = $conn->query($sql3);
        while($row3 = $result3->fetch_assoc()){
          $row3["student_answer_is_correct"] = "0";

          $sql4 = "SELECT * from question_option
                    where question_option.question = '".$row1['question_id']."'
                    AND description = '".$row3['answer']."'";
          $result4 = $conn->query($sql4);
          if($result4->num_rows) $row3["student_answer_is_correct"] = "1";
          array_push($row1['student_answers'],$row3);
        }
        array_push($row['exam_questions'],$row1);

      }
      array_push($data,$row);
    }
  }
  $conn->close();

  echo json_encode($data);
?>
