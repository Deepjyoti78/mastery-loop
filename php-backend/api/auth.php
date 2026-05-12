<?php
// php-backend/api/auth.php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/auth.php';

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

switch ($method) {
    // ─── POST /api/auth.php?action=register ───────────────────────
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        if ($action === 'register') {
            $name        = trim($data['name']        ?? '');
            $email       = trim($data['email']       ?? '');
            $password    = trim($data['password']    ?? '');
            $intent      = $data['intent']           ?? 'academic';
            $skill_level = $data['skill_level']      ?? 'beginner';
            $weekly_hours= (int)($data['weekly_hours'] ?? 5);

            if (!$name || !$email || !$password) {
                http_response_code(400);
                echo json_encode(['error' => 'Name, email and password are required']);
                exit;
            }

            if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid email address']);
                exit;
            }

            // Check duplicate email
            $stmt = $pdo->prepare('SELECT id FROM users WHERE email = ?');
            $stmt->execute([$email]);
            if ($stmt->fetch()) {
                http_response_code(409);
                echo json_encode(['error' => 'Email already registered']);
                exit;
            }

            $hash = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $pdo->prepare(
                'INSERT INTO users (name, email, password, intent, skill_level, weekly_hours)
                 VALUES (?, ?, ?, ?, ?, ?)'
            );
            $stmt->execute([$name, $email, $hash, $intent, $skill_level, $weekly_hours]);
            $userId = $pdo->lastInsertId();

            $token = generateToken(['id' => $userId, 'email' => $email, 'name' => $name]);
            echo json_encode([
                'token' => $token,
                'user'  => ['id' => $userId, 'name' => $name, 'email' => $email, 'intent' => $intent]
            ]);
        }

        elseif ($action === 'login') {
            $email    = trim($data['email']    ?? '');
            $password = trim($data['password'] ?? '');

            if (!$email || !$password) {
                http_response_code(400);
                echo json_encode(['error' => 'Email and password are required']);
                exit;
            }

            $stmt = $pdo->prepare('SELECT * FROM users WHERE email = ?');
            $stmt->execute([$email]);
            $user = $stmt->fetch();

            if (!$user || !password_verify($password, $user['password'])) {
                http_response_code(401);
                echo json_encode(['error' => 'Invalid email or password']);
                exit;
            }

            $token = generateToken(['id' => $user['id'], 'email' => $user['email'], 'name' => $user['name']]);
            echo json_encode([
                'token' => $token,
                'user'  => [
                    'id'          => $user['id'],
                    'name'        => $user['name'],
                    'email'       => $user['email'],
                    'intent'      => $user['intent'],
                    'skill_level' => $user['skill_level'],
                ]
            ]);
        }

        else {
            http_response_code(400);
            echo json_encode(['error' => 'Unknown action. Use ?action=register or ?action=login']);
        }
        break;

    // ─── GET /api/auth.php  (validate token / get profile) ────────
    case 'GET':
        $userData = validateToken();
        $stmt = $pdo->prepare('SELECT id, name, email, intent, skill_level, weekly_hours, created_at FROM users WHERE id = ?');
        $stmt->execute([$userData['id']]);
        $user = $stmt->fetch();
        if (!$user) {
            http_response_code(404);
            echo json_encode(['error' => 'User not found']);
            exit;
        }
        echo json_encode($user);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
