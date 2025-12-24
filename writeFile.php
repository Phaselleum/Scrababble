<?php
// Read raw POST body (works for application/json)
$rawJson = file_get_contents('php://input'); // [web:2][web:14]

// Save to game.json in the same directory
$result = file_put_contents(__DIR__ . '/game.json', $rawJson); // [web:10][web:13]

// Success response
header('Content-Type: application/json');
echo json_encode(['status' => 'ok', 'bytes_written' => $result]);

?>