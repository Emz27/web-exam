<?php
  include("../../config.php");
  session_start();

  $question_id = isset($_POST['question_id'])?$_POST['question_id']:"";
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
  $temp = array();
  foreach($question_options as $value){
    array_push($temp,$value['description']);
  }

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "UPDATE `question` SET `description`='$question_description',
      `teacher_subject`='$question_teacher_subject_id',`type`='$question_type_id',
      `point`='$question_point'
      WHERE id='$question_id'";
  $conn->query($sql);
  if($conn->error)echo $conn->error.' line 35';

    $arr = "'asdfashasdasdgs'";
    if($temp) $arr .= ",'".join("','",$temp)."'";
    $sql = "DELETE FROM
             question_option
             WHERE
             question='$question_id'
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
                  VALUES ('$qo','$d','$i','$question_id')
                  ON DUPLICATE KEY UPDATE is_correct=VALUES(is_correct)";
        $conn->query($sql);
        if($conn->error)echo $conn->error.' line 54';
      }
      $sql = "INSERT INTO question_option (description,is_correct,question)
       SELECT * FROM (SELECT '$d' as a, '$i' as b,'$question_id' as c) AS tmp
       WHERE NOT EXISTS (
           SELECT id FROM question_option
           WHERE question = '$question_id' and description = '$d'
       )";
      $conn->query($sql);
    if($conn->error)echo $conn->error.' line 62';
    }




  $conn->close();

?>
