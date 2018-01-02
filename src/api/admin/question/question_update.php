<?php
  include("../../config.php");
  session_start();

  $id = isset($_GET['id'])?$_GET['id']:"";
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
  $temp = array();
  foreach($question_options as $value){
    array_push($temp,$value['description']);
  }

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "UPDATE `question` SET `description`='$description',
      `subject`='$subject_id',`teacher`='$teacher_id',`type`='$question_type_id',
      `exam_type`='$exam_type_id',`point`='$point'
      WHERE id='$id'";
  $conn->query($sql);
  if($conn->error)echo $conn->error.' line 35';

    $arr = "'asdfashasdasdgs'";
    if($temp) $arr .= ",'".join("','",$temp)."'";
    $sql = "DELETE FROM
             question_option
             WHERE
             question='$id'
             and
             description NOT IN ('asdfsadfsadfasdf',".$arr.")";
    $conn->query($sql);
    if($conn->error)echo $conn->error.' line 46';
    foreach ($question_options as $value){
      if(isset($value['description'])){
        $d = $value['description'];
        $i = isset($value['is_correct'])?$value['is_correct']:0;
        $qo = isset($value['id'])?$value['id']:"";
        $sql = "INSERT INTO question_option (id,description,is_correct,question)
                  VALUES ('$qo','$d','$i','$id')
                  ON DUPLICATE KEY UPDATE is_correct=VALUES(is_correct)";
        $conn->query($sql);
        if($conn->error)echo $conn->error.' line 54';
      }
      $sql = "INSERT INTO question_option (description,is_correct,question)
       SELECT * FROM (SELECT '$d' as a, '$i' as b,'$id' as c) AS tmp
       WHERE NOT EXISTS (
           SELECT id FROM question_option
           WHERE question = '$id' and description = '$d'
       )";
      $conn->query($sql);
    if($conn->error)echo $conn->error.' line 62';
    }




  $conn->close();

?>
