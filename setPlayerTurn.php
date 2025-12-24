<?php
$playerTurn = isset($_GET['player']) ? (int)$_GET['player'] : null;

$filePath = __DIR__ . '/turn.txt';

$result = file_put_contents($filePath, $playerTurn);

header('Content-Type: application/json');
echo json_encode([
    'status' => 'ok',
    'turn_set' => $playerTurn,
    'bytes_written' => $result
]);
?>