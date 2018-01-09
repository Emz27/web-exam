<?php
  if(session_id() == '' || !isset($_SESSION)) {
      session_start();
  }
  $data['isLogged'] = false;
  if (isset($_SESSION['isLogged']) && $_SESSION['isLogged'] == true)
  {
      $data['isLogged'] = true;
      $data['id'] = $_SESSION['id'];
      $data['firstname'] = $_SESSION['firstname'];
      $data['middlename'] = $_SESSION['middlename'];
      $data['lastname'] = $_SESSION['lastname'];
      $data['type'] = $_SESSION['type'];
      $data['date_created'] = $_SESSION['date_created'];
  }
  echo json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
?>
