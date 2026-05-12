<?php
// php-backend/api/career.php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/auth.php';

$userData = validateToken();
$userId   = $userData['id'];
$method   = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // ─── POST — save a new career analysis result from AI ─────────
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        $targetRole     = $data['target_role']     ?? 'Software Engineer';
        $readinessScore = (int)($data['readiness_score'] ?? 0);
        $resultJson     = isset($data['result_json'])
                            ? json_encode($data['result_json'])
                            : json_encode($data);

        $stmt = $pdo->prepare(
            'INSERT INTO career_analyses (user_id, target_role, readiness_score, result_json)
             VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([$userId, $targetRole, $readinessScore, $resultJson]);

        echo json_encode([
            'id'              => $pdo->lastInsertId(),
            'target_role'     => $targetRole,
            'readiness_score' => $readinessScore,
        ]);
        break;

    // ─── GET — fetch latest analysis for this user ────────────────
    case 'GET':
        $stmt = $pdo->prepare(
            'SELECT * FROM career_analyses WHERE user_id = ? ORDER BY created_at DESC LIMIT 10'
        );
        $stmt->execute([$userId]);
        $rows = $stmt->fetchAll();

        // Decode stored JSON so frontend gets proper objects
        foreach ($rows as &$row) {
            $row['result_json'] = json_decode($row['result_json'], true);
        }

        echo json_encode($rows);
        break;

    // ─── DELETE — remove a specific analysis ──────────────────────
    case 'DELETE':
        $id = $_GET['id'] ?? null;
        if (!$id) {
            http_response_code(400);
            echo json_encode(['error' => 'id param required']);
            exit;
        }
        $stmt = $pdo->prepare('DELETE FROM career_analyses WHERE id = ? AND user_id = ?');
        $stmt->execute([$id, $userId]);
        echo json_encode(['message' => 'Deleted']);
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
