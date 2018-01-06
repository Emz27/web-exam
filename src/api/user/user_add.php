<?php
  include("../config.php");
  session_start();
  $username = isset($_POST['username'])?$_POST['username']:"";
  $password = isset($_POST['password'])?$_POST['password']:"";
  $firstname = isset($_POST['firstname'])?$_POST['firstname']:"";
  $lastname = isset($_POST['lastname'])?$_POST['lastname']:"";
  $middlename = isset($_POST['middlename'])?$_POST['middlename']:"";
  $type = isset($_POST['type'])?$_POST['type']:"";
  $subject_subject = isset($_POST['subject_subject'])?$_POST['subject_subject']:array();
  $subject_id = isset($_POST['subject_id'])?$_POST['subject_id']:array();

$conn = new mysqli($db_host, $db_username, $db_password, $db_name);
$conn->query("SET time_zone = "+08:00"");

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "INSERT INTO `user`( `username`, `password`, `firstname`, `middlename`, `lastname`, `type`)
  VALUES ('$username','$password','$firstname','$middlename','$lastname','$type')";
  $conn->query($sql);

  echo $conn->error;
  $id = $conn->insert_id;
  if($type=="2"){
    $sql = "INSERT INTO `teacher`( `id`)
    VALUES ('$id')";
    $conn->query($sql);
    foreach ($subject_subject as $value){
      $sql = "INSERT INTO `teacher_subject`(`teacher`, `subject`)
      VALUES ('$id','$value')";
      $conn->query($sql);
      echo $conn->error;
    }
  }
  else if($type =="3") {
    $sql = "INSERT INTO `student`( `id`)
    VALUES ('$id')";
    $conn->query($sql);
    foreach ($subject_subject as $value){
      $sql = "INSERT INTO `student_subject`(`student`, `teacher_subject`)
      VALUES ('$id','$value')";
      $conn->query($sql);
      echo $conn->error;
    }
  }


  $conn->close();

?>
