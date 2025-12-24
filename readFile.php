<?php
$filePath = __DIR__ . '/game.json';
$gamestate = file_get_contents($filePath);
header('Content-Type: application/json');
echo json_encode($gamestate); // Returns: 0 or 1
?>