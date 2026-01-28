import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import InputPage from './pages/InputPage';
import Dashboard from './pages/Dashboard';
import AcademicExcellence from './pages/AcademicExcellence';
import CompetitivePage from './pages/CompetitivePage';
import DrillPage from './pages/DrillPage';
import CareerPage from './pages/CareerPage';
import { LapPage, TestPage, ReteachPage } from './pages/AcademicFlow';
import LearningContentPage from './pages/LearningContentPage';
import AuthModal from './components/AuthModal';

function App() {
  const [userIntent, setUserIntent] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (data) => {
    setUserData(data); // In real app, this would be a user object
    setIsAuthenticated(true);
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
          <Route path="/academic/learn/:subject/:concept" element={<LearningContentPage />} />
          <Route path="/academic/lap" element={<LapPage />} />
          <Route path="/academic/test" element={<TestPage />} />
          <Route path="/academic/reteach" element={<ReteachPage />} />
          <Route path="/competitive" element={<CompetitivePage />} />
          <Route path="/competitive/drill" element={<DrillPage />} />
          <Route path="/career" element={<CareerPage />} />
          <Route
            path="/setup"
            element={
              userIntent ?
                <InputPage intent={userIntent} setUserData={setUserData} /> :
                <Navigate to="/" replace />
            }
          />
          <Route
            path="/dashboard"
            element={
              userData ?
                <Dashboard intent={userIntent} userData={userData} /> :
                <Navigate to="/" replace />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
