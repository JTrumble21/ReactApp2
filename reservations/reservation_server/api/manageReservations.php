<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

require_once('../config/config.php');
require_once('../config/database.php');


$requestUri = $_SERVER['REQUEST_URI'];
$parts = explode('/', trim($requestUri, '/'));
$id = intval(end($parts));

if (!$id) {
    echo json_encode(["status" => "error", "message" => "Invalid reservation ID"]);
    exit;
}

$query = "SELECT * FROM reservations WHERE resID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("i", $id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $row = $result->fetch_assoc();
    echo json_encode([
        "status" => "success",
        "data" => [
            "id" => $row['resID'],
            "name" => $row['Name'],
            "location" => $row['Location'],
            "date" => $row['Date'],
            "time" => $row['Time'],
            "booked" => (int)$row['Booked']
        ]
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "Reservation not found"]);
}

$stmt->close();
$conn->close();
?>
