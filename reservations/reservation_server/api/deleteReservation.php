<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once('../config/database.php');
require_once 'auth.php'; 

$adminUser = requireAdmin($conn);

$input = json_decode(file_get_contents('php://input'), true);
$id = $input['id'] ?? $_POST['id'] ?? null;
if (!$id) {
    echo json_encode(["status"=>"error","message"=>"Reservation id required"]);
    exit();
}

$stmt = $conn->prepare("DELETE FROM reservations WHERE resID = ?");
$stmt->bind_param("i", $id);
if ($stmt->execute()) {
    echo json_encode(["status"=>"success","message"=>"Reservation deleted"]);
} else {
    echo json_encode(["status"=>"error","message"=>"Failed to delete"]);
}
$stmt->close();
$conn->close();
