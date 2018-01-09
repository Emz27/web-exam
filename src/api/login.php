<?php
  include("config.php");
  session_start();

  $username = $_POST['username'];
  $password = $_POST['password'];

  $data['id'] = -1;
  $data['type'] = -1;
  $data['isLogged'] = false;
  $data['username'] = $username;
  $data['password'] = $password;

$mysqli = new mysqli($db_host, $db_username, $db_password, $db_name);
$mysqli->query("SET time_zone = '+08:00'");

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "SELECT * FROM user WHERE user.username = '$username' AND user.password = '$password'";

  $result = $mysqli->query($sql);

  if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $data = $row;

      $data['isLogged'] = true;

      $_SESSION['isLogged'] = true;
      $_SESSION['id'] = $data['id'];
      $_SESSION['firstname'] = $data['firstname'];
      $_SESSION['middlename'] = $data['middlename'];
      $_SESSION['lastname'] = $data['lastname'];
      $_SESSION['type'] = $data['type'];
      $_SESSION['date_created'] = $data['date_created'];
  }
  $mysqli->close();
  echo json_encode($data, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP | JSON_UNESCAPED_UNICODE);
?>
