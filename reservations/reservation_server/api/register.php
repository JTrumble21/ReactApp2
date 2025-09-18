<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit();

require_once(__DIR__ . '/../config/database.php'); 
require_once(__DIR__ . '/../config/site.php');

// Validate inputs
$inputName = trim($_POST['name'] ?? '');
$inputEmail = trim($_POST['email'] ?? '');
$inputPassword = $_POST['password'] ?? '';
$inputAdminSecret = $_POST['adminSecret'] ?? '';

if (!$inputName || !$inputEmail || !$inputPassword) {
    echo json_encode(["status"=>"error","message"=>"Name, email and password required"]);
    exit();
}

// Check if email already exists
$stmt = $conn->prepare("SELECT id FROM users WHERE email = ? LIMIT 1");
if (!$stmt) {
    echo json_encode(["status"=>"error","message"=>"Prepare failed: " . $conn->error]);
    exit();
}
$stmt->bind_param("s", $inputEmail);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    echo json_encode(["status"=>"error","message"=>"Email already registered"]);
    $stmt->close();
    exit();
}
$stmt->close();

// Determine role
$role = 'user';
if (!empty($inputAdminSecret) && hash_equals(ADMIN_SECRET, $inputAdminSecret)) {
    $role = 'admin';
}

// Hash password
$hash = password_hash($inputPassword, PASSWORD_DEFAULT);

// Insert user
$stmt = $conn->prepare("INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)");
if (!$stmt) {
    echo json_encode(["status"=>"error","message"=>"Prepare failed: " . $conn->error]);
    exit();
}
$stmt->bind_param("ssss", $inputName, $inputEmail, $hash, $role);

if ($stmt->execute()) {
    echo json_encode(["status"=>"success","message"=>"User created successfully","role"=>$role]);
} else {
    echo json_encode(["status"=>"error","message"=>"Failed to create user: " . $stmt->error]);
}

$stmt->close();
$conn->close();
