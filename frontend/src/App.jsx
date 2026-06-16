import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Topbar from './Components/Topbar';
import LandingPage from './Pages/LandingPage';
import Eligibility from './Pages/Eligibility';
import LoanApplication from './Pages/LoanApplication';
import LoanBalance from './Pages/LoanBalance'
import './App.css';
import VerificationDashboard from './Pages/Admin/VerificationDashboard';

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }

    window.requestAnimationFrame(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
    });
  }, [hash, pathname]);

  return null;
}

function App() {
  return (
    <div>
      <ScrollToHash />
      <Topbar />
      <main>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/loan-application" element={<LoanApplication />} />
          <Route path="/Admin/Dashboard" element={<VerificationDashboard />} />
          <Route path="/Admin/VerificationDashboard" element={<VerificationDashboard />} />
          <Route path="/admin/dashboard" element={<VerificationDashboard />} />
          <Route path="/admin/verificationdashboard" element={<VerificationDashboard />} />
          <Route path="/check-balance" element={<LoanBalance />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;