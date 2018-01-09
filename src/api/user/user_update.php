<?php
  include("../config.php");
  session_start();
  $mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
  $mysqli->query("SET time_zone = '+08:00'");
  $id = isset($_POST['id'])?$mysqli->real_escape_string($_POST['id']):"";
  $username = isset($_POST['username'])?$mysqli->real_escape_string($_POST['username']):"";
  $password = isset($_POST['password'])?$mysqli->real_escape_string($_POST['password']):"";
  $firstname = isset($_POST['firstname'])?$mysqli->real_escape_string($_POST['firstname']):"";
  $lastname = isset($_POST['lastname'])?$mysqli->real_escape_string($_POST['lastname']):"";
  $middlename = isset($_POST['middlename'])?$mysqli->real_escape_string($_POST['middlename']):"";
  $type = isset($_POST['type'])?$mysqli->real_escape_string($_POST['type']):"";
  $subject_subject = isset($_POST['subject_subject'])?$mysqli->real_escape_string($_POST['subject_subject']):array();
  $subject_id = isset($_POST['subject_id'])?$mysqli->real_escape_string($_POST['subject_id']):array();


  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "UPDATE user SET username='$username',password='$password',
  firstname='$firstname',middlename='$middlename',
  lastname='$lastname',type='$type' WHERE id = '$id'";
  echo $id;
  $mysqli->query($sql);
  echo $mysqli->error;
  if($type == "2"){
    $sql = "DELETE FROM student WHERE student.id='$id'";
    $mysqli->query($sql);
    echo $mysqli->error;
    $sql = "INSERT IGNORE INTO teacher (id) VALUES ('$id')";
    $mysqli->query($sql);
    echo $mysqli->error;
    $arr = "'asdfashasdasdgs'";
    if($subject_subject) $arr .= ",".join(",",$subject_subject);
    $sql = "DELETE FROM
             teacher_subject
             WHERE
             teacher='$id'
             and
             subject NOT IN ('asdfsadfsadfasdf',$arr)";
    $mysqli->query($sql);
    echo $mysqli->error;
    foreach ($subject_subject as $value){
      $sql = "INSERT INTO teacher_subject (teacher,subject)
       SELECT * FROM (SELECT '$id', '$value') AS tmp
       WHERE NOT EXISTS (
           SELECT id FROM teacher_subject WHERE teacher = '$id' and subject = '$value'
       )";
      $mysqli->query($sql);
       echo $mysqli->error;
    }
  }
  else if($type == "3"){
    $sql = "DELETE FROM teacher WHERE teacher.id='$id'";
    $mysqli->query($sql);
    echo $mysqli->error;
    $sql = "INSERT IGNORE INTO student (id) VALUES ($id)";
    $mysqli->query($sql);
    echo $mysqli->error;
    $arr = "'asdfashasdasdgs'";
    if($subject_subject) $arr .= ",".join(",",$subject_subject);
    $sql = "DELETE FROM
             student_subject
             WHERE
             student = $id
             and
             teacher_subject NOT IN ('casdfasdfasdfafsd',$arr)";

    $mysqli->query($sql);
    echo $mysqli->error;
    foreach ($subject_subject as $value){
      $sql = "INSERT INTO student_subject (student,teacher_subject)
       SELECT * FROM (SELECT '$id','$value') AS tmp
       WHERE NOT EXISTS (
           SELECT id FROM student_subject WHERE teacher_subject = '$value' and student = '$id'
       )";
      $mysqli->query($sql);
      echo $mysqli->error;
    }
  }
  echo $mysqli->error;


  $mysqli->close();

?>
