<?php
  if(session_id() == '' || !isset($_SESSION)) {
      session_start();
  }
  $data['isLogged'] = false;

      $data['isLogged'] = true;
      $data['id'] = $_SESSION['id'];
      $data['firstname'] = $_SESSION['firstname'];
      $data['middlename'] = $_SESSION['middlename'];
      $data['lastname'] = $_SESSION['lastname'];
      $data['type'] = $_SESSION['type'];
      $data['date_created'] = $_SESSION['date_created'];

  echo json_encode($data);
?>
