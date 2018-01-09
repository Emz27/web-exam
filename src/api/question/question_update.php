<?php
  include("../config.php");
  session_start();
  $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
  $mysqli->query("SET time_zone = '+08:00'");

  $question_id = isset($_POST['question_id'])?$mysqli->real_escape_string($_POST['question_id']):"";
  $question_description = isset($_POST['question_description'])?$mysqli->real_escape_string($_POST['question_description']):"";
  $question_subject_id = isset($_POST['question_subject_id'])?$mysqli->real_escape_string($_POST['question_subject_id']):"";
  $question_subject_description = isset($_POST['question_subject_description'])?$mysqli->real_escape_string($_POST['question_subject_description']):"";
  $question_teacher_id = isset($_POST['question_teacher_id'])?$mysqli->real_escape_string($_POST['question_teacher_id']):"";
  $question_teacher_name = isset($_POST['question_teacher_name'])?$mysqli->real_escape_string($_POST['question_teacher_name']):"";
  $question_type_id = isset($_POST['question_type_id'])?$mysqli->real_escape_string($_POST['question_type_id']):"";
  $question_type_description = isset($_POST['question_type_description'])?$mysqli->real_escape_string($_POST['question_type_description']):"";
  $question_limit = isset($_POST['question_limit'])?$mysqli->real_escape_string($_POST['question_limit']):"";
  $question_point = isset($_POST['question_point'])?$mysqli->real_escape_string($_POST['question_point']):"";
  $question_options = isset($_POST['question_options'])?$mysqli->real_escape_string($_POST['question_options']):array();
  $question_teacher_subject_id = isset($_POST['question_teacher_subject_id'])?$mysqli->real_escape_string($_POST['question_teacher_subject_id']):"";
  $temp = array();
  foreach($question_options as $value){
    array_push($temp,$value['description']);
  }


  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "UPDATE `question` SET `description`='$question_description',
      `teacher_subject`='$question_teacher_subject_id',`type`='$question_type_id',
      `point`='$question_point'
      WHERE id='$question_id'";
  $mysqli->query($sql);
  if($mysqli->error)echo $mysqli->error.' line 35';

    $arr = "'asdfashasdasdgs'";
    if($temp) $arr .= ",'".join("','",$temp)."'";
    $sql = "DELETE FROM
             question_option
             WHERE
             question='$question_id'
             and
             description NOT IN ('asdfsadfsadfasdf',".$arr.")";
    $mysqli->query($sql);
    if($mysqli->error)echo $mysqli->error.' line 46';
    foreach ($question_options as $value){
      if(isset($value['description'])){
        $d = $value['description'];
        $i = isset($value['is_correct'])?$value['is_correct']:0;
        $qo = isset($value['id'])?$value['id']):"";
        $sql = "INSERT INTO question_option (id,description,is_correct,question)
                  VALUES ('$qo','$d','$i','$question_id')
                  ON DUPLICATE KEY UPDATE is_correct=VALUES(is_correct)";
        $mysqli->query($sql);
        if($mysqli->error)echo $mysqli->error.' line 54';
      }
      $sql = "INSERT INTO question_option (description,is_correct,question)
       SELECT * FROM (SELECT '$d' as a, '$i' as b,'$question_id' as c) AS tmp
       WHERE NOT EXISTS (
           SELECT id FROM question_option
           WHERE question = '$question_id' and description = '$d'
       )";
      $mysqli->query($sql);
    if($mysqli->error)echo $mysqli->error.' line 62';
    }




  $mysqli->close();

?>
