<?php
  session_start();

  unset($_SESSION['isLogged']);
  unset($_SESSION['id']);
  unset($_SESSION['firstname']);
  unset($_SESSION['middlename']);
  unset($_SESSION['lastname']);
  unset($_SESSION['type']);
  unset($_SESSION['date_created']);

?>
