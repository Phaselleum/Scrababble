// Read raw POST body (works for application/json)
$rawJson = file_get_contents('php://input'); // [web:2][web:14]

// Basic validation: not empty and valid JSON
if ($rawJson === false || trim($rawJson) === '') {
    http_response_code(400); // Bad Request
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Empty request body']);
    exit;
}

if (json_decode($rawJson) === null && json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(400);
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Invalid JSON']);
    exit;
}

// Save to game.json in the same directory
$result = file_put_contents(__DIR__ . '/game.json', $rawJson); // [web:10][web:13]

if ($result === false) {
    http_response_code(500); // Server error
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Failed to write file']);
    exit;
}

// Success response
header('Content-Type: application/json');
echo json_encode(['status' => 'ok', 'bytes_written' => $result]);
Se