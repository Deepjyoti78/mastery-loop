<?php
// php-backend/api/quiz_results.php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/auth.php';

$userData = validateToken();
$userId   = $userData['id'];
$method   = $_SERVER['REQUEST_METHOD'];

switch ($method) {

    // ─── POST — store a quiz attempt ──────────────────────────────
    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);

        $conceptId         = $data['concept_id']         ?? null;
        $score             = (float)($data['score']      ?? 0);
        $mcqScore          = (float)($data['mcq_score']  ?? 0);
        $conceptualScore   = (float)($data['conceptual_score'] ?? 0);
        $passed            = $score >= 70 ? 1 : 0;
        $reteachTriggered  = $data['reteach_triggered']  ?? !$passed;

        if (!$conceptId) {
            http_response_code(400);
            echo json_encode(['error' => 'concept_id is required']);
            exit;
        }

        $stmt = $pdo->prepare(
            'INSERT INTO quiz_results
                (user_id, concept_id, score, passed, mcq_score, conceptual_score, reteach_triggered)
             VALUES (?, ?, ?, ?, ?, ?, ?)'
        );
        $stmt->execute([
            $userId, $conceptId, $score, $passed,
            $mcqScore, $conceptualScore, (int)$reteachTriggered
        ]);

        echo json_encode([
            'id'     => $pdo->lastInsertId(),
            'passed' => (bool)$passed,
            'score'  => $score,
        ]);
        break;

    // ─── GET — fetch quiz history for a concept ───────────────────
    case 'GET':
        $conceptId = $_GET['concept_id'] ?? null;

        if ($conceptId) {
            $stmt = $pdo->prepare(
                'SELECT * FROM quiz_results WHERE user_id = ? AND concept_id = ? ORDER BY taken_at DESC'
            );
            $stmt->execute([$userId, $conceptId]);
        } else {
            // All results — summary grouped by concept
            $stmt = $pdo->prepare(
                'SELECT concept_id,
                        COUNT(*)           AS attempts,
                        MAX(score)         AS best_score,
                        SUM(passed)        AS pass_count,
                        MAX(taken_at)      AS last_attempt
                 FROM quiz_results
                 WHERE user_id = ?
                 GROUP BY concept_id'
            );
            $stmt->execute([$userId]);
        }

        echo json_encode($stmt->fetchAll());
        break;

    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}
?>
