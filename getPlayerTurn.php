<?php
$filePath = __DIR__ . '/turn.txt';
$turnContent = file_get_contents($filePath);
$turnValue = (int) trim($turnContent);
header('Content-Type: application/json');
echo json_encode($turnValue); // Returns: 0 or 1
?>