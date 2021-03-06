<?php
  include("../config.php");
  session_start();

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
$mysqli->query("SET time_zone = '+08:00'");
  $fetch_filter = isset($_POST['fetch_filter'])?$mysqli->real_escape_string($_POST['fetch_filter']):"";
  // if($fetch_filter=="") echo "heyyaaaaaaaaa";
  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }
  $sql = "SELECT
            q.id as question_id,
            q.description as question_description,
            teacher_subject.id as question_teacher_subject_id,
            subject.id as question_subject_id,
            subject.description as question_subject_description,
            user.id as question_teacher_id,
            concat(user.firstname,' ',user.lastname) as question_teacher_name,
            q.type as question_type_id,
            question_type.description as question_type_description,
            q.point as question_point,
            question_type.option_limit as question_option_limit
            from question as q
            left join teacher_subject on teacher_subject.id = q.teacher_subject
            left join user on teacher_subject.teacher = user.id
            left join subject on teacher_subject.subject = subject.id
            left join question_type on q.type = question_type.id
            $fetch_filter ";
  $data = array();
  $result = $mysqli->query($sql);
  echo $mysqli->error;
  if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()){
      $row['question_options'] = array();
      $result1 = $mysqli->query("SELECT * from question_option where question=".$row['question_id']."");
      while($row1 = $result1->fetch_assoc()){
        array_push($row['question_options'],$row1);
      }
      array_push($data,$row);
    }
  }
  $mysqli->close();

  echo json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
?>
