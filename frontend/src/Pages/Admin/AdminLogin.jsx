import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";
import bgImage from "../../assets/admin-login-bg.png";
import lapoLogo from "../../assets/LapoLogo.png";

export default function AdminLogin() {
  const [staffId, setStaffId] = useState("");
  const [role, setRole] = useState("Verification Officer");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Map dropdown display values to backend role values
  const roleMap = {
    "Verification Officer": "verification",
    "Approval Officer": "approval",
    "Disbursement Officer": "disbursement",
  };

  // Map backend role values to dashboard routes
  const routeMap = {
    verification: "/Admin/VerificationDashboard",
    approval: "/Admin/ApprovalDashboard",
    disbursement: "/Admin/DisbursementDashboard",
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/loans/admin/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          staff_id: staffId,
          role: roleMap[role],
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed. Please check your details.");
        setLoading(false);
        return;
      }

      // Store staff info so dashboards can access it
      localStorage.setItem("staff", JSON.stringify(data));

      // Route to the correct dashboard based on role
      navigate(routeMap[data.role]);

    } catch (err) {
      setError("Could not connect to server. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-root">

      {/* Left Panel */}
      <div className="login-left" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="login-left__overlay" />

        <div className="login-left__brand">
          <img
            src={lapoLogo}
            alt="LAPO Microfinance Bank"
            className="login-left__logo"
          />
          <span className="login-left__portal-sub">STAFF PORTAL</span>
        </div>

        <div className="login-left__hero">
          <h1 className="login-left__heading">
            Institutional<br />Trust &amp; Security.
          </h1>
          <p className="login-left__sub">
            Access the administrative dashboard to manage operations, oversee
            transactions, and maintain secure institutional workflows.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="login-right">
        <div className="login-form">

          <h2 className="login-form__heading">Welcome back</h2>
          <p className="login-form__sub">Sign in to your administrative account.</p>

          {/* Staff ID */}
          <label className="login-form__label">Staff ID</label>
          <div className="login-form__input-wrapper">
            <IdIcon />
            <input
              type="text"
              className="login-form__input"
              placeholder="Eg. VER001, APP001,DIS001"
              value={staffId}
              onChange={(e) => setStaffId(e.target.value)}
            />
          </div>

          {/* Role dropdown */}
          <label className="login-form__label">Role</label>
          <div className="login-form__select-wrapper">
            <select
              className="login-form__select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="Verification Officer">Verification Officer</option>
              <option value="Approval Officer">Approval Officer</option>
              <option value="Disbursement Officer">Disbursement Officer</option>
            </select>
            <ChevronDownIcon />
          </div>

          {/* Remember me */}
          <div className="login-form__remember-row">
            <label className="login-form__check-label">
              <input
                type="checkbox"
                className="login-form__checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>

          {/* Error message */}
          {error && (
            <p style={{ color: "red", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            className="login-form__submit-btn"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? "Signing in..." : <> Secure Login <LockSmallIcon /> </>}
          </button>

          {/* Footer */}
          <div className="login-form__secure-note">
            <ShieldIcon />
            <span>Secure Institutional Access</span>
          </div>

        </div>
      </div>
    </div>
  );
}

/* ── Icons ── */
function IdIcon() {
  return (
    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <circle cx="8.5" cy="12" r="2" />
      <path d="M13 10h6" />
      <path d="M13 14h6" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg className="select-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function LockSmallIcon() {
  return (
    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="shield-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}