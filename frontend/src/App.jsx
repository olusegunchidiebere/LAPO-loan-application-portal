import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AdminLogin from './Pages/Admin/AdminLogin';
import Topbar from './Components/Topbar';
import LandingPage from './Pages/LandingPage';
import Eligibility from './Pages/Eligibility';
import LoanApplication from './Pages/LoanApplication';
import LoanBalance from './Pages/LoanBalance'
import './App.css';
import VerificationDashboard from './Pages/Admin/VerificationDashboard';
import ApprovalDashboard from './Pages/Admin/ApprovalDashboard';
import DisbursementDashboard from './Pages/Admin/DisbursementDashboard';

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
  const { pathname, search } = useLocation();
  const lowerPathname = pathname.toLowerCase();
  const lowerSearch = search.toLowerCase();
  const isDisbursementQuery =
    lowerSearch.includes('admin?disbursementdashboard') ||
    (lowerPathname === '/admin' && lowerSearch.includes('disbursementdashboard'));
  const isAdminPage = lowerPathname.startsWith('/admin') || isDisbursementQuery;

  return (
    <div className={isAdminPage ? 'app-shell admin-shell' : 'app-shell has-topbar'}>
      <ScrollToHash />
      {!isAdminPage && <Topbar />}
      <main>
        <Routes>
          <Route path="/" element={isDisbursementQuery ? <DisbursementDashboard /> : <LandingPage />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/loan-application" element={<LoanApplication />} />
           <Route path="/admin" element={<AdminLogin />} />
          <Route path="/Admin/Dashboard" element={<VerificationDashboard />} />
          <Route path="/Admin" element={isDisbursementQuery ? <DisbursementDashboard /> : <VerificationDashboard />} />
          <Route path="/Admin/VerificationDashboard" element={<VerificationDashboard />} />
          <Route path="/Admin/ApprovalDashboard" element={<ApprovalDashboard />} />
          <Route path="/Admin/DisbursementDashboard" element={<DisbursementDashboard />} />
          <Route path="/admin" element={isDisbursementQuery ? <DisbursementDashboard /> : <VerificationDashboard />} />
          <Route path="/admin/dashboard" element={<VerificationDashboard />} />
          <Route path="/admin/verificationdashboard" element={<VerificationDashboard />} />
          <Route path="/admin/approvaldashboard" element={<ApprovalDashboard />} />
          <Route path="/admin/disbursementdashboard" element={<DisbursementDashboard />} />
          <Route path="/check-balance" element={<LoanBalance />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
