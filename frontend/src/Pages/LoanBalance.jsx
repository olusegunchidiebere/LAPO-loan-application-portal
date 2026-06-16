import { useState } from "react";
import { Search, Lock, ArrowLeft, CreditCard, CheckCircle } from "lucide-react";
import "./LoanBalance.css";

const API_URL = "http://127.0.0.1:8000/api/loans/balance/";

export default function LoanBalance() {
  const [lookupNumber, setLookupNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheck = async () => {
    if (!lookupNumber.trim()) {
      setError("Please enter your IPPIS or Oracle number.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lookup_number: lookupNumber.trim() }),
      });

      const data = await response.json();

      if (data.found) {
        setResult(data);
      } else {
        setError(data.message || "No account found. Please check and try again.");
      }
    } catch (err) {
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleCheck();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="clb-page">
      {/* Left Panel */}
      <div className="clb-left">
        <div className="clb-left-content">
          <h1 className="clb-hero-title">
            Empowering your<br />financial journey.
          </h1>
          <p className="clb-hero-subtitle">
            Access your loan details instantly, securely, and conveniently with LAPO Online.
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="clb-right">
        <div className="clb-card">
          <h2 className="clb-card-title">Check Your Loan Balance</h2>
          <p className="clb-card-subtitle">
            Enter your details below to view your current loan status and securely access your balance.
          </p>

          <div className="clb-form-group">
            <label className="clb-label">Oracle No or IPPIS No</label>
            <div className="clb-input-wrapper">
              <CreditCard size={16} className="clb-input-icon" />
              <input
                className="clb-input"
                type="text"
                placeholder="Eg. IPPIS001 or ORC004"
                value={lookupNumber}
                onChange={(e) => setLookupNumber(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            {error && <p className="clb-error">{error}</p>}
          </div>

          <button className="clb-btn" onClick={handleCheck} disabled={loading}>
            {loading ? (
              <span className="clb-btn-loading">
                <span className="clb-spinner"></span> Checking...
              </span>
            ) : (
              <>
                <Search size={16} /> Check Balance
              </>
            )}
          </button>

          <div className="clb-card-footer">
            <a href="/" className="clb-back-link">
              <ArrowLeft size={14} /> Back to Home
            </a>
            <span className="clb-secure-badge">
              <Lock size={12} /> Secured by 256-bit SSL
            </span>
          </div>
        </div>

        {/* Result Card — slides in after search */}
        {result && (
          <div className="clb-result">
            <div className="clb-result-header">
              <div className="clb-result-identity">
                <h3 className="clb-result-name">{result.full_name}</h3>
                <span className="clb-badge clb-badge-verified">
                  <CheckCircle size={12} /> Verified
                </span>
              </div>
              <span className="clb-badge clb-badge-active">
                <CheckCircle size={12} /> Active Loan
              </span>
            </div>

            <p className="clb-result-account">
              Identifier: <strong>{result.identifier}</strong>
            </p>

            <div className="clb-balance-card">
              <div className="clb-balance-left">
                <p className="clb-balance-label">Outstanding Balance</p>
                <p className="clb-balance-amount">
                  {formatCurrency(result.loan_balance)}
                </p>
              </div>
              <div className="clb-balance-icon">🏛️</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}