<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://valenciabasketcup.com');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);
$email = filter_var($data['email'] ?? '', FILTER_VALIDATE_EMAIL);

if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

$payload = json_encode(['email' => $email, 'listIds' => [4], 'updateEnabled' => true]);

$ch = curl_init('https://api.brevo.com/v3/contacts');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST => true,
    CURLOPT_POSTFIELDS => $payload,
    CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'api-key: YOUR_BREVO_API_KEY'
    ]
]);
$response = curl_exec($ch);
$status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

http_response_code($status);
echo $response;
