<?php
  include("../../config.php");
  session_start();
  $username = isset($_GET['username'])?$_GET['username']:"";
  $password = isset($_GET['password'])?$_GET['password']:"";
  $firstname = isset($_GET['firstname'])?$_GET['firstname']:"";
  $lastname = isset($_GET['lastname'])?$_GET['lastname']:"";
  $middlename = isset($_GET['middlename'])?$_GET['middlename']:"";
  $type = isset($_GET['type'])?$_GET['type']:"";
  $subject_subject = isset($_GET['subject_subject'])?$_GET['subject_subject']:array();
  $subject_id = isset($_GET['subject_id'])?$_GET['subject_id']:array();

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

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
