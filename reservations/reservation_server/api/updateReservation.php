<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

require_once('../config/config.php');
require_once('../config/database.php');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}


$input = json_decode(file_get_contents("php://input"), true);

if (!isset($input['id']) || !isset($input['status'])) {
    echo json_encode(["status" => "error", "message" => "Missing parameters"]);
    exit;
}

$id = intval($input['id']);
$status = $input['status'] === "booked" ? 1 : 0;

$query = "UPDATE reservations SET Booked = ? WHERE resID = ?";
$stmt = $conn->prepare($query);
$stmt->bind_param("ii", $status, $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success", "message" => "Reservation updated"]);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to update reservation"]);
}

$stmt->close();
$conn->close();
?>
