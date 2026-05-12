<?php
// php-backend/api/dashboard.php
require_once __DIR__ . '/../config/db.php';
require_once __DIR__ . '/../middleware/auth.php';

$userData = validateToken();
$userId   = $userData['id'];

// ── Concepts summary ──────────────────────────────────────────────
$stmt = $pdo->prepare(
    'SELECT
        COUNT(*)                                          AS total_concepts,
        SUM(status = "completed")                         AS completed_concepts,
        SUM(status = "in_progress")                       AS in_progress_concepts,
        IFNULL(ROUND(AVG(best_score), 1), 0)              AS avg_score
     FROM concept_progress WHERE user_id = ?'
);
$stmt->execute([$userId]);
$conceptStats = $stmt->fetch();

// ── Quiz summary ──────────────────────────────────────────────────
$stmt = $pdo->prepare(
    'SELECT
        COUNT(*)             AS total_quizzes,
        SUM(passed)          AS passed_quizzes,
        ROUND(AVG(score), 1) AS avg_quiz_score,
        MAX(taken_at)        AS last_quiz_at
     FROM quiz_results WHERE user_id = ?'
);
$stmt->execute([$userId]);
$quizStats = $stmt->fetch();

// ── Recent quiz activity (last 7) ────────────────────────────────
$stmt = $pdo->prepare(
    'SELECT concept_id, score, passed, taken_at
     FROM quiz_results WHERE user_id = ?
     ORDER BY taken_at DESC LIMIT 7'
);
$stmt->execute([$userId]);
$recentActivity = $stmt->fetchAll();

// ── Streak: count of days with at least one quiz in last 30 days ─
$stmt = $pdo->prepare(
    'SELECT COUNT(DISTINCT DATE(taken_at)) AS active_days
     FROM quiz_results
     WHERE user_id = ? AND taken_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)'
);
$stmt->execute([$userId]);
$streakData = $stmt->fetch();

// ── User profile ──────────────────────────────────────────────────
$stmt = $pdo->prepare(
    'SELECT name, email, intent, skill_level, created_at FROM users WHERE id = ?'
);
$stmt->execute([$userId]);
$userProfile = $stmt->fetch();

echo json_encode([
    'user'            => $userProfile,
    'concept_stats'   => $conceptStats,
    'quiz_stats'      => $quizStats,
    'recent_activity' => $recentActivity,
    'active_days_30'  => (int)$streakData['active_days'],
]);
?>
