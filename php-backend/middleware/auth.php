<?php
// php-backend/middleware/auth.php

require_once __DIR__ . '/../config/db.php';

function generateToken(array $payload): string {
    $header  = base64url_encode(json_encode(['typ' => 'JWT', 'alg' => 'HS256']));
    $payload['exp'] = time() + (60 * 60 * 24 * 7); // 7 days
    $payload_enc = base64url_encode(json_encode($payload));
    $sig = base64url_encode(hash_hmac('sha256', "$header.$payload_enc", JWT_SECRET, true));
    return "$header.$payload_enc.$sig";
}

function validateToken(): array {
    $headers = getallheaders();
    $authHeader = $headers['Authorization'] ?? $headers['authorization'] ?? '';

    if (!$authHeader) {
        http_response_code(401);
        echo json_encode(['error' => 'No authorization header']);
        exit;
    }

    $token = str_replace('Bearer ', '', $authHeader);
    $parts = explode('.', $token);

    if (count($parts) !== 3) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token format']);
        exit;
    }

    [$header, $payload_enc, $sig] = $parts;
    $valid_sig = base64url_encode(hash_hmac('sha256', "$header.$payload_enc", JWT_SECRET, true));

    if (!hash_equals($sig, $valid_sig)) {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid token signature']);
        exit;
    }

    $data = json_decode(base64_decode(strtr($payload_enc, '-_', '+/')), true);

    if (!$data || $data['exp'] < time()) {
        http_response_code(401);
        echo json_encode(['error' => 'Token expired']);
        exit;
    }

    return $data;
}

function base64url_encode(string $data): string {
    return str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($data));
}
?>
