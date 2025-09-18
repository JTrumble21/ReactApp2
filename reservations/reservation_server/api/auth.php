<?php
require_once 'config/site.php';
require_once '../config/database.php';

function getBearerTokenFromHeader() {
    $headers = null;
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $headers = trim($_SERVER["HTTP_AUTHORIZATION"]);
    } elseif (function_exists('apache_request_headers')) {
        $requestHeaders = apache_request_headers();
        if (isset($requestHeaders['Authorization'])) {
            $headers = trim($requestHeaders['Authorization']);
        }
    }
    if (!$headers) return null;
    if (preg_match('/Bearer\s(\S+)/', $headers, $matches)) {
        return $matches[1];
    }
    return null;
}

function getUserByToken($conn, $token) {
    if (!$token) return null;
    $stmt = $conn->prepare("SELECT id, name, email, role FROM users WHERE api_token = ? LIMIT 1");
    $stmt->bind_param("s", $token);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    return $user ?: null;
}

function requireAdmin($conn) {
    $token = getBearerTokenFromHeader();
    if (!$token) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Missing token"]);
        exit();
    }
    $user = getUserByToken($conn, $token);
    if (!$user) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid token"]);
        exit();
    }
    if ($user['role'] !== 'admin') {
        http_response_code(403);
        echo json_encode(["status" => "error", "message" => "Admin required"]);
        exit();
    }
    return $user; // admin user row
}

function requireLogin($conn) {
    $token = getBearerTokenFromHeader();
    if (!$token) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Missing token"]);
        exit();
    }
    $user = getUserByToken($conn, $token);
    if (!$user) {
        http_response_code(401);
        echo json_encode(["status" => "error", "message" => "Invalid token"]);
        exit();
    }
    return $user;
}
