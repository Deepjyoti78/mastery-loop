-- ================================================
-- MasteryLoop Database Schema
-- Import via phpMyAdmin or: mysql -u root masteryloop < schema.sql
-- ================================================

CREATE DATABASE IF NOT EXISTS masteryloop CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE masteryloop;

-- -----------------------------------------------
-- Users: real auth replacing AuthModal mock
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100)  NOT NULL,
    email       VARCHAR(150)  UNIQUE NOT NULL,
    password    VARCHAR(255)  NOT NULL,           -- bcrypt hash
    intent      ENUM('academic','competitive','career') DEFAULT 'academic',
    skill_level ENUM('beginner','intermediate','advanced') DEFAULT 'beginner',
    weekly_hours INT          DEFAULT 5,
    created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- -----------------------------------------------
-- Concept Progress: tracks LAP flow per user
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS concept_progress (
    id            INT AUTO_INCREMENT PRIMARY KEY,
    user_id       INT           NOT NULL,
    concept_id    VARCHAR(100)  NOT NULL,          -- e.g. "why-scheduling"
    subject       VARCHAR(100)  DEFAULT 'Operating Systems',
    concept_title VARCHAR(200),
    status        ENUM('locked','in_progress','completed') DEFAULT 'locked',
    attempts      INT           DEFAULT 0,
    best_score    DECIMAL(5,2)  DEFAULT 0.00,
    last_attempt  TIMESTAMP     NULL,
    completed_at  TIMESTAMP     NULL,
    UNIQUE KEY uq_user_concept (user_id, concept_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------
-- Quiz Results: every quiz attempt logged
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS quiz_results (
    id                  INT AUTO_INCREMENT PRIMARY KEY,
    user_id             INT           NOT NULL,
    concept_id          VARCHAR(100)  NOT NULL,
    score               DECIMAL(5,2)  NOT NULL,     -- 0.00 to 100.00
    passed              TINYINT(1)    DEFAULT 0,
    mcq_score           DECIMAL(5,2)  DEFAULT 0,
    conceptual_score    DECIMAL(5,2)  DEFAULT 0,
    reteach_triggered   TINYINT(1)    DEFAULT 0,
    taken_at            TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- -----------------------------------------------
-- Career Analyses: cache expensive AI results
-- -----------------------------------------------
CREATE TABLE IF NOT EXISTS career_analyses (
    id              INT AUTO_INCREMENT PRIMARY KEY,
    user_id         INT           NOT NULL,
    target_role     VARCHAR(200),
    readiness_score INT           DEFAULT 0,
    result_json     LONGTEXT,                       -- full Gemini JSON response
    created_at      TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
