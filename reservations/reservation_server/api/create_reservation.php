<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php');

$data = json_decode(file_get_contents('php://input'), true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "Invalid JSON input"
    ]);
    exit();
}

$name = $data['name'] ?? '';
$location = $data['location'] ?? '';
$date = $data['date'] ?? '';
$time = $data['time'] ?? '';

if (!$name || !$location || !$date || !$time) {
    echo json_encode([
        "status" => "error",
        "message" => "Missing required fields"
    ]);
    exit();
}

$stmt = $conn->prepare("INSERT INTO reservations (name, location, date, time) VALUES (?, ?, ?, ?)");
$stmt->bind_param("ssss", $name, $location, $date, $time);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "message" => "Reservation created successfully",
        "reservationId" => $stmt->insert_id
    ]);
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Failed to create reservation"
    ]);
}

$stmt->close();
$conn->close();
