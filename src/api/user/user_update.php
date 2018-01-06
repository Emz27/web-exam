<?php
  include("../../config.php");
  session_start();
  $id = isset($_POST['id'])?$_POST['id']:"";
  $username = isset($_POST['username'])?$_POST['username']:"";
  $password = isset($_POST['password'])?$_POST['password']:"";
  $firstname = isset($_POST['firstname'])?$_POST['firstname']:"";
  $lastname = isset($_POST['lastname'])?$_POST['lastname']:"";
  $middlename = isset($_POST['middlename'])?$_POST['middlename']:"";
  $type = isset($_POST['type'])?$_POST['type']:"";
  $subject_subject = isset($_POST['subject_subject'])?$_POST['subject_subject']:array();
  $subject_id = isset($_POST['subject_id'])?$_POST['subject_id']:array();

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "UPDATE user SET username='$username',password='$password',
  firstname='$firstname',middlename='$middlename',
  lastname='$lastname',type='$type' WHERE id = '$id'";
  echo $id;
  $conn->query($sql);
  echo $conn->error;
  if($type == "2"){
    $sql = "DELETE FROM student WHERE student.id='$id'";
    $conn->query($sql);
    echo $conn->error;
    $sql = "INSERT IGNORE INTO teacher (id) VALUES ('$id')";
    $conn->query($sql);
    echo $conn->error;
    $arr = "'asdfashasdasdgs'";
    if($subject_subject) $arr .= ",".join(",",$subject_subject);
    $sql = "DELETE FROM
             teacher_subject
             WHERE
             teacher='$id'
             and
             subject NOT IN ('asdfsadfsadfasdf',$arr)";
    $conn->query($sql);
    echo $conn->error;
    foreach ($subject_subject as $value){
      $sql = "INSERT INTO teacher_subject (teacher,subject)
       SELECT * FROM (SELECT '$id', '$value') AS tmp
       WHERE NOT EXISTS (
           SELECT id FROM teacher_subject WHERE teacher = '$id' and subject = '$value'
       )";
      $conn->query($sql);
       echo $conn->error;
    }
  }
  else if($type == "3"){
    $sql = "DELETE FROM teacher WHERE teacher.id='$id'";
    $conn->query($sql);
    echo $conn->error;
    $sql = "INSERT IGNORE INTO student (id) VALUES ($id)";
    $conn->query($sql);
    echo $conn->error;
    $arr = "'asdfashasdasdgs'";
    if($subject_subject) $arr .= ",".join(",",$subject_subject);
    $sql = "DELETE FROM
             student_subject
             WHERE
             student = $id
             and
             teacher_subject NOT IN ('casdfasdfasdfafsd',$arr)";

    $conn->query($sql);
    echo $conn->error;
    foreach ($subject_subject as $value){
      $sql = "INSERT INTO student_subject (student,teacher_subject)
       SELECT * FROM (SELECT '$id','$value') AS tmp
       WHERE NOT EXISTS (
           SELECT id FROM student_subject WHERE teacher_subject = '$value' and student = '$id'
       )";
      $conn->query($sql);
      echo $conn->error;
    }
  }
  echo $conn->error;


  $conn->close();

?>
