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

  $conn = new mysqli($db_host, $db_username, $db_password, $db_name);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $sql = "SELECT * FROM user WHERE user.username = '$username' AND user.password = '$password'";

  $result = $conn->query($sql);

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
  $conn->close();
  echo json_encode($data);
?>
