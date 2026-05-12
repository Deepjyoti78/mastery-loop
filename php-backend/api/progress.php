<?php
// php-backend/api/progress.php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/auth.php';

$userData = validateToken();
$userId   = $userData['id'];
$method   = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // ─── GET — fetch all concept progress for this user ───────────
    case 'GET':
        $conceptId = $_GET['concept_id'] ?? null;

        if ($conceptId) {
            // Single concept
            $stmt = $pdo->prepare(
                'SELECT * FROM concept_progress WHERE user_id = ? AND concept_id = ?'
            );
            $stmt->execute([$userId, $conceptId]);
            $row = $stmt->fetch();
            echo json_encode($row ?: (object)[]);
        } else {
            // All concepts
            $stmt = $pdo->prepare(
                'SELECT * FROM concept_progress WHERE user_id = ? ORDER BY id ASC'
            );
            $stmt->execute([$userId]);
            echo json_encode($stmt->fetchAll());
        }
        break;

    // ─── POST — create or update a concept's progress ─────────────
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        $conceptId    = $data['concept_id']    ?? null;
        $conceptTitle = $data['concept_title'] ?? '';
        $subject      = $data['subject']       ?? 'Operating Systems';
        $status       = $data['status']        ?? 'in_progress';
        $bestScore    = (float)($data['best_score'] ?? 0);

        if (!$conceptId) {
            http_response_code(400);
            echo json_encode(['error' => 'concept_id is required']);
            exit;
        }

        $completedAt = ($status === 'completed') ? date('Y-m-d H:i:s') : null;

        // Upsert: insert or update on duplicate (user_id + concept_id)
        $sql = "INSERT INTO concept_progress
                    (user_id, concept_id, subject, concept_title, status, attempts, best_score, last_attempt, completed_at)
                VALUES (?, ?, ?, ?, ?, 1, ?, NOW(), ?)
                ON DUPLICATE KEY UPDATE
                    status        = VALUES(status),
                    attempts      = attempts + 1,
                    best_score    = GREATEST(best_score, VALUES(best_score)),
                    last_attempt  = NOW(),
                    completed_at  = IF(VALUES(status) = 'completed' AND completed_at IS NULL, NOW(), completed_at)";

        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userId, $conceptId, $subject, $conceptTitle, $status, $bestScore, $completedAt]);

        // Return updated row
        $stmt = $pdo->prepare('SELECT * FROM concept_progress WHERE user_id = ? AND concept_id = ?');
        $stmt->execute([$userId, $conceptId]);
        echo json_encode($stmt->fetch());
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
