<?php

  // Database configuration
  $dbHost = 'localhost';
  $dbUsername = 'root';
  $dbName = 'reservations_react';
  $dbPassword = '';

  // Create a connection
  $conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

  // Check connection
  if ($conn->connect_error) {
    die("Connection failed: ". $conn->connect_error);
  } else {
    echo "Connected successfully";
  }
?>