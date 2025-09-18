<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once('../config/database.php');

$input = json_decode(file_get_contents('php://input'), true);
$email = trim($input['email'] ?? '');
$password = $input['password'] ?? '';

if (!$email || !$password) {
    echo json_encode(["status"=>"error","message"=>"Email and password required"]);
    exit();
}

$stmt = $conn->prepare("SELECT id, name, email, password, role FROM users WHERE email = ? LIMIT 1");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();
$stmt->close();

if (!$user || !password_verify($password, $user['password'])) {
    echo json_encode(["status"=>"error","message"=>"Invalid credentials"]);
    exit();
}

$token = bin2hex(random_bytes(32));
$stmt = $conn->prepare("UPDATE users SET api_token = ? WHERE id = ?");
$stmt->bind_param("si", $token, $user['id']);
if (!$stmt->execute()) {
    echo json_encode(["status"=>"error","message"=>"Failed to create session token"]);
    exit();
}
$stmt->close();

echo json_encode([
    "status"=>"success",
    "message"=>"Logged in",
    "token"=>$token,
    "role"=>$user['role'],
    "name"=>$user['name'],
    "userId"=>$user['id']
]);

$conn->close();

