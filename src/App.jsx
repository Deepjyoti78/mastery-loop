import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';

import AcademicExcellence from './pages/AcademicExcellence';
import CompetitivePage from './pages/CompetitivePage';
import DrillPage from './pages/DrillPage';
import CareerPage from './pages/CareerPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SchedulePage from './pages/SchedulePage';
import AcademicFlow from './pages/AcademicFlow';

import TodayFocusPage from './pages/TodayFocusPage';
import SetupPage from './pages/SetupPage';
import AuthModal from './components/AuthModal';

function App() {
  const [userIntent, setUserIntent] = useState(null);
  const [userData, setUserData] = useState(() => {
    const saved = localStorage.getItem('mastery_user_data');
    return saved ? JSON.parse(saved) : null;
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('mastery_auth') === 'true';
  });

  const handleLogin = (data) => {
    setUserData(data);
    setIsAuthenticated(true);
    localStorage.setItem('mastery_auth', 'true');
    localStorage.setItem('mastery_user_data', JSON.stringify(data));
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-700 relative">

        {/* Auth Gating */}
        {!isAuthenticated && (
          <AuthModal
            isOpen={true}
            defaultMode="signup"
            onAuthenticated={handleLogin}
            onClose={() => { }}
          />
        )}

        <Routes>
          <Route path="/" element={<LandingPage setIntent={setUserIntent} />} />
          <Route path="/academic" element={<AcademicExcellence />} />
          <Route path="/academic/flow/:subjectId" element={<AcademicFlow />} />

          <Route path="/competitive" element={<CompetitivePage />} />
          <Route path="/competitive/drill" element={<DrillPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/schedule" element={<SchedulePage />} />
          <Route path="/today-focus" element={<TodayFocusPage />} />
          <Route path="/setup" element={<SetupPage />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
