<?php
header('Content-Type: application/json');
$allowedOrigins = ['https://valenciabasketcup.com', 'https://www.valenciabasketcup.com'];
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email = isset($input['email']) ? trim($input['email']) : '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

// La clave NO debe estar en el repositorio: se lee de la variable de entorno
// BREVO_API_KEY o de config.php (ver config.example.php), que está en .gitignore.
$apiKey = getenv('BREVO_API_KEY') ?: '';
$listId = 3;
if ($apiKey === '' && file_exists(__DIR__ . '/config.php')) {
    $config = include __DIR__ . '/config.php';
    $apiKey = $config['BREVO_API_KEY'] ?? '';
    $listId = $config['BREVO_LIST_ID'] ?? $listId;
}
if ($apiKey === '') {
    http_response_code(500);
    echo json_encode(['error' => 'Server not configured']);
    exit;
}

$data = json_encode([
    'email' => $email,
    'listIds' => [$listId],
    'updateEnabled' => true
]);

$ch = curl_init('https://api.brevo.com/v3/contacts');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'api-key: ' . $apiKey
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode === 201 || $httpCode === 204) {
    echo json_encode(['success' => true]);
} else {
    $body = json_decode($response, true);
    $message = isset($body['message']) ? $body['message'] : 'Error';
    http_response_code(500);
    echo json_encode(['error' => $message]);
}
