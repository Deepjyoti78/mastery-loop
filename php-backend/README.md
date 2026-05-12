# MasteryLoop — PHP Backend Setup Guide

## Prerequisites
- XAMPP installed (Apache + MySQL)
- Node.js + npm (for React frontend)

---

## Step 1: Set Up XAMPP

1. Start **XAMPP Control Panel**
2. Start **Apache** and **MySQL**

---

## Step 2: Place PHP Backend in htdocs

Copy the `php-backend/` folder into your XAMPP htdocs:

```
C:\xampp\htdocs\masteryloop\php-backend\
```

So the API is accessible at:
```
http://localhost/masteryloop/php-backend/api/auth.php
```

---

## Step 3: Create the Database

1. Open **phpMyAdmin** → `http://localhost/phpmyadmin`
2. Click **New** → create database named `masteryloop`
3. Select the `masteryloop` database
4. Click **Import** → choose:
   ```
   php-backend/db/schema.sql
   ```
5. Click **Go**

You should now have 4 tables: `users`, `concept_progress`, `quiz_results`, `career_analyses`

---

## Step 4: Configure DB Connection

Open `php-backend/config/db.php` and verify:

```php
define('DB_HOST', 'localhost');
define('DB_NAME', 'masteryloop');
define('DB_USER', 'root');
define('DB_PASS', '');          // ← blank for default XAMPP
define('JWT_SECRET', 'masteryloop_super_secret_key_2026');
```

---

## Step 5: Run the React Frontend

In a terminal:
```bash
cd masteryloop/   # the Vite project folder
npm run dev
```

Open `http://localhost:5173`

---

## Step 6: Test the Integration

1. **Register** a new user via the Auth Modal → check `users` table in phpMyAdmin
2. **Open a concept card** in Academic Flow → check `concept_progress` table
3. **Complete a Mastery Checkpoint** → check `quiz_results` and `concept_progress` tables
4. **Reload the app** → concept statuses should persist (loaded from DB)

---

## API Endpoints Reference

| URL | Method | Description |
|---|---|---|
| `/api/auth.php?action=register` | POST | Register new user |
| `/api/auth.php?action=login` | POST | Login, get JWT |
| `/api/auth.php` | GET | Get current user profile |
| `/api/progress.php` | GET | Get all concept progress |
| `/api/progress.php` | POST | Save/update concept progress |
| `/api/quiz_results.php` | POST | Save quiz attempt |
| `/api/quiz_results.php` | GET | Get quiz history |
| `/api/career.php` | POST | Save career analysis |
| `/api/career.php` | GET | Get saved analyses |
| `/api/dashboard.php` | GET | Get aggregated stats |

> All endpoints except `register` and `login` require `Authorization: Bearer <token>` header.
