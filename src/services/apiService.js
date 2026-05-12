// src/services/apiService.js
// Central fetch wrapper for all PHP backend calls.

const BASE_URL = 'http://localhost/masteryloop/api';

// ─── Token helpers ──────────────────────────────────────────────
export const getToken = () => localStorage.getItem('mastery_token');
export const setToken = (token) => localStorage.setItem('mastery_token', token);
export const clearToken = () => {
  localStorage.removeItem('mastery_token');
  localStorage.removeItem('mastery_auth');
  localStorage.removeItem('mastery_user_data');
};

// ─── Core fetch wrapper ─────────────────────────────────────────
const apiFetch = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    ...options,
    headers,
  });

  const data = await res.json().catch(() => ({ error: 'Invalid server response' }));

  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }

  return data;
};

// ─── Auth ───────────────────────────────────────────────────────
export const apiRegister = (payload) =>
  apiFetch('auth.php?action=register', { method: 'POST', body: JSON.stringify(payload) });

export const apiLogin = (payload) =>
  apiFetch('auth.php?action=login', { method: 'POST', body: JSON.stringify(payload) });

export const apiGetProfile = () => apiFetch('auth.php');

// ─── Progress ───────────────────────────────────────────────────
export const apiGetProgress = (conceptId = null) =>
  apiFetch(conceptId ? `progress.php?concept_id=${conceptId}` : 'progress.php');

export const apiSaveProgress = (payload) =>
  apiFetch('progress.php', { method: 'POST', body: JSON.stringify(payload) });

// ─── Quiz Results ────────────────────────────────────────────────
export const apiSaveQuizResult = (payload) =>
  apiFetch('quiz_results.php', { method: 'POST', body: JSON.stringify(payload) });

export const apiGetQuizHistory = (conceptId = null) =>
  apiFetch(conceptId ? `quiz_results.php?concept_id=${conceptId}` : 'quiz_results.php');

// ─── Career ─────────────────────────────────────────────────────
export const apiSaveCareerAnalysis = (payload) =>
  apiFetch('career.php', { method: 'POST', body: JSON.stringify(payload) });

export const apiGetCareerAnalyses = () => apiFetch('career.php');

export const apiDeleteCareerAnalysis = (id) =>
  apiFetch(`career.php?id=${id}`, { method: 'DELETE' });

// ─── Dashboard ───────────────────────────────────────────────────
export const apiGetDashboard = () => apiFetch('dashboard.php');
