<?php
ini_set('display_errors', 0); // hide PHP warnings/notices
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once('../config/database.php'); // your connection

$name = $_POST['name'] ?? '';
$location = $_POST['location'] ?? '';
$date = $_POST['date'] ?? '';
$time = $_POST['time'] ?? '';
$photoName = "placeholder.jpg"; // default placeholder

// Handle uploaded photo
if (isset($_FILES['photo']) && $_FILES['photo']['error'] === UPLOAD_ERR_OK) {
    $uploadDir = __DIR__ . "/uploads/";
    if (!is_dir($uploadDir)) mkdir($uploadDir, 0777, true);

    $photoName = time() . "_" . basename($_FILES['photo']['name']);
    move_uploaded_file($_FILES['photo']['tmp_name'], $uploadDir . $photoName);
}

// Validate required fields
if (!$name || !$location || !$date || !$time) {
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit();
}

// Insert into database
$stmt = $conn->prepare("INSERT INTO reservations (name, location, date, time, photo) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("sssss", $name, $location, $date, $time, $photoName);

if ($stmt->execute()) {
    echo json_encode([
        "status" => "success",
        "reservationId" => $stmt->insert_id,
        "photo" => $photoName
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to create reservation"]);
}

$stmt->close();
$conn->close();
?>
