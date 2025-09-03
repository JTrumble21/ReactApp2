<?php
require_once 'db.php'; // your PDO connection

$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
$limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 6;
$offset = ($page - 1) * $limit;

// Get total count
$totalQuery = $pdo->query("SELECT COUNT(*) as total FROM reservations");
$totalReservations = $totalQuery->fetch(PDO::FETCH_ASSOC)['total'];

// Get paginated reservations
$stmt = $pdo->prepare("SELECT * FROM reservations ORDER BY date DESC LIMIT :limit OFFSET :offset");
$stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$reservations = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode([
    "reservations" => $reservations,
    "totalReservations" => $totalReservations
]);
?>
