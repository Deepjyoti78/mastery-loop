// src/services/apiService.js
// Dual-mode:
//   LOCAL  (localhost / 127.0.0.1) → calls PHP backend at /masteryloop/api
//   PRODUCTION (Vercel / any other host) → uses localStorage-based mock auth

const IS_LOCAL =
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1';

const BASE_URL = 'http://localhost/masteryloop/api';

// ─── Token / Storage helpers ─────────────────────────────────────
export const getToken  = () => localStorage.getItem('mastery_token');
export const setToken  = (t) => localStorage.setItem('mastery_token', t);
export const clearToken = () => {
  localStorage.removeItem('mastery_token');
  localStorage.removeItem('mastery_auth');
  localStorage.removeItem('mastery_user_data');
};

// ─── Core fetch (only used in LOCAL mode) ────────────────────────
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}/${endpoint}`, { ...options, headers });
  const data = await res.json().catch(() => ({ error: 'Invalid server response' }));
  if (!res.ok) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
};

// ─── Mock JWT (production only) ───────────────────────────────────
// Simple base64-based token so the app logic (which checks for a token) still works.
const makeMockToken = (user) =>
  btoa(JSON.stringify({ id: user.id, email: user.email, name: user.name, exp: Date.now() + 86400000 }));

// ─── Mock User Store (localStorage) ──────────────────────────────
const USERS_KEY = 'ml_users_db';
const getUsers  = () => JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
const saveUsers = (u) => localStorage.setItem(USERS_KEY, JSON.stringify(u));

// ─── Auth ─────────────────────────────────────────────────────────
export const apiRegister = async (payload) => {
  if (IS_LOCAL) return apiFetch('auth.php?action=register', { method: 'POST', body: JSON.stringify(payload) });

  // Production mock
  const { name, email, password } = payload;
  if (!name || !email || !password) throw new Error('Name, email and password are required');
  const users = getUsers();
  if (users.find(u => u.email === email)) throw new Error('Email already registered');
  const user = { id: Date.now(), name, email, password, intent: payload.intent || 'academic', skill_level: payload.skill_level || 'beginner' };
  saveUsers([...users, user]);
  const token = makeMockToken(user);
  return { token, user: { id: user.id, name: user.name, email: user.email, intent: user.intent } };
};

export const apiLogin = async (payload) => {
  if (IS_LOCAL) return apiFetch('auth.php?action=login', { method: 'POST', body: JSON.stringify(payload) });

  // Production mock
  const { email, password } = payload;
  const users = getUsers();
  const user  = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  const token = makeMockToken(user);
  return { token, user: { id: user.id, name: user.name, email: user.email, intent: user.intent, skill_level: user.skill_level } };
};

export const apiGetProfile = () => {
  if (IS_LOCAL) return apiFetch('auth.php');
  const raw = localStorage.getItem('mastery_user_data');
  return Promise.resolve(raw ? JSON.parse(raw) : null);
};

// ─── Progress ─────────────────────────────────────────────────────
const PROG_KEY = (uid) => `ml_progress_${uid}`;
const getUid   = () => { try { return JSON.parse(localStorage.getItem('mastery_user_data'))?.id || 'guest'; } catch { return 'guest'; } };

export const apiGetProgress = (conceptId = null) => {
  if (IS_LOCAL) return apiFetch(conceptId ? `progress.php?concept_id=${conceptId}` : 'progress.php');
  const all = JSON.parse(localStorage.getItem(PROG_KEY(getUid())) || '[]');
  return Promise.resolve(conceptId ? all.filter(p => p.concept_id === conceptId) : all);
};

export const apiSaveProgress = (payload) => {
  if (IS_LOCAL) return apiFetch('progress.php', { method: 'POST', body: JSON.stringify(payload) });
  const key  = PROG_KEY(getUid());
  const all  = JSON.parse(localStorage.getItem(key) || '[]');
  const idx  = all.findIndex(p => p.concept_id === payload.concept_id);
  const rec  = { ...payload, last_attempt: new Date().toISOString() };
  idx >= 0 ? (all[idx] = { ...all[idx], ...rec }) : all.push(rec);
  localStorage.setItem(key, JSON.stringify(all));
  return Promise.resolve(rec);
};

// ─── Quiz Results ─────────────────────────────────────────────────
const QUIZ_KEY = (uid) => `ml_quizzes_${uid}`;

export const apiSaveQuizResult = (payload) => {
  if (IS_LOCAL) return apiFetch('quiz_results.php', { method: 'POST', body: JSON.stringify(payload) });
  const key = QUIZ_KEY(getUid());
  const all = JSON.parse(localStorage.getItem(key) || '[]');
  const rec = { ...payload, id: Date.now(), taken_at: new Date().toISOString() };
  localStorage.setItem(key, JSON.stringify([...all, rec]));
  return Promise.resolve(rec);
};

export const apiGetQuizHistory = (conceptId = null) => {
  if (IS_LOCAL) return apiFetch(conceptId ? `quiz_results.php?concept_id=${conceptId}` : 'quiz_results.php');
  const all = JSON.parse(localStorage.getItem(QUIZ_KEY(getUid())) || '[]');
  return Promise.resolve(conceptId ? all.filter(q => q.concept_id === conceptId) : all);
};

// ─── Career ───────────────────────────────────────────────────────
const CAREER_KEY = (uid) => `ml_career_${uid}`;

export const apiSaveCareerAnalysis = (payload) => {
  if (IS_LOCAL) return apiFetch('career.php', { method: 'POST', body: JSON.stringify(payload) });
  const key = CAREER_KEY(getUid());
  const all = JSON.parse(localStorage.getItem(key) || '[]');
  const rec = { ...payload, id: Date.now(), created_at: new Date().toISOString() };
  localStorage.setItem(key, JSON.stringify([...all, rec]));
  return Promise.resolve(rec);
};

export const apiGetCareerAnalyses = () => {
  if (IS_LOCAL) return apiFetch('career.php');
  return Promise.resolve(JSON.parse(localStorage.getItem(CAREER_KEY(getUid())) || '[]'));
};

export const apiDeleteCareerAnalysis = (id) => {
  if (IS_LOCAL) return apiFetch(`career.php?id=${id}`, { method: 'DELETE' });
  const key = CAREER_KEY(getUid());
  const all = JSON.parse(localStorage.getItem(key) || '[]').filter(c => c.id !== id);
  localStorage.setItem(key, JSON.stringify(all));
  return Promise.resolve({ success: true });
};

// ─── Dashboard ────────────────────────────────────────────────────
export const apiGetDashboard = () => {
  if (IS_LOCAL) return apiFetch('dashboard.php');
  // Return basic stats from localStorage
  const uid   = getUid();
  const prog  = JSON.parse(localStorage.getItem(PROG_KEY(uid)) || '[]');
  const quiz  = JSON.parse(localStorage.getItem(QUIZ_KEY(uid)) || '[]');
  const career = JSON.parse(localStorage.getItem(CAREER_KEY(uid)) || '[]');
  return Promise.resolve({
    total_users: 1,
    total_progress: prog.length,
    completed_concepts: prog.filter(p => p.status === 'completed').length,
    total_quizzes: quiz.length,
    avg_score: quiz.length ? (quiz.reduce((s, q) => s + (q.score || 0), 0) / quiz.length).toFixed(1) : 0,
    total_career: career.length,
  });
};
