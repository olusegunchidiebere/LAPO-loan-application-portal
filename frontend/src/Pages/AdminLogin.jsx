import { useState } from "react";
import "./AdminLogin.css";
import bgImage from "../assets/admin-login-bg.png";
import lapoLogo from "../assets/LapoLogo.png";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log("Login:", { email, password, rememberMe });
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

          {/* Email */}
          <label className="login-form__label">Staff Email</label>
          <div className="login-form__input-wrapper">
            <MailIcon />
            <input
              type="email"
              className="login-form__input"
              placeholder="name@lapo-nigeria.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <label className="login-form__label">Password</label>
          <div className="login-form__input-wrapper">
            <LockIcon />
            <input
              type={showPassword ? "text" : "password"}
              className="login-form__input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              className="login-form__eye-btn"
              onClick={() => setShowPassword((v) => !v)}
              aria-label="Toggle password"
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>

          {/* Remember me + Forgot */}
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
            <button className="login-form__forgot-btn">Forgot Password?</button>
          </div>

          {/* Submit */}
          <button className="login-form__submit-btn" onClick={handleLogin}>
            Secure Login <LockSmallIcon />
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
function MailIcon() {
  return (
    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}
function LockIcon() {
  return (
    <svg className="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
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
function EyeIcon() {
  return (
    <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
function EyeOffIcon() {
  return (
    <svg className="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
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