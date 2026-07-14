<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
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

$apiKey = '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';
$listId = 3;

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
