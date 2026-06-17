import { useMemo, useState } from 'react';
import { AlertTriangle, CheckCircle, Filter, Quote, RefreshCw, ShieldCheck, X, XCircle } from 'lucide-react';
import './ApprovalDashboard.css';
import LapoLogo from '../../assets/LapoLogo.png';
import TotalPending from '../../assets/TotalPending.png';
import VerifiedIcon from '../../assets/VerifiedIcon.png';
import RejectedIcon from '../../assets/RejectedIcon.png';

const APPLICATIONS_STORAGE_KEY = 'lapoLoanApplications';
const FORWARDED_STATUS = 'Verified';
const APPROVED_STATUS = 'Approved';
const REJECTED_STATUS = 'Rejected';

function readAllApplications() {
  try {
    const applications = JSON.parse(localStorage.getItem(APPLICATIONS_STORAGE_KEY) || '[]');
    return Array.isArray(applications)
      ? applications.filter((application) => application && typeof application === 'object')
      : [];
  } catch {
    return [];
  }
}

function formatApplicantName(application) {
  return `${application.surname || ''} ${application.otherNames || ''}`.trim() || 'Unnamed Applicant';
}

function formatAmount(value) {
  const amount = Number(value || 0);
  return amount ? amount.toLocaleString() : '0';
}

function formatCurrency(value) {
  return `\u20A6 ${formatAmount(value)}`;
}

function formatDate(value) {
  if (!value) return '-';
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

function valueOrDash(value) {
  return value || '-';
}

function DetailField({ label, value }) {
  return (
    <div className="ad-detail-field">
      <span>{label}</span>
      <strong>{valueOrDash(value)}</strong>
    </div>
  );
}

function MetricRow({ label, value }) {
  return (
    <div className="ad-metric-row">
      <span>{label}</span>
      <strong>{valueOrDash(value)}</strong>
    </div>
  );
}

export default function ApprovalDashboard() {
  const [allApplications, setAllApplications] = useState(() => readAllApplications());
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const approvalQueue = useMemo(
    () => allApplications.filter((application) => application.status === FORWARDED_STATUS),
    [allApplications]
  );

  const selectedApplication = approvalQueue.find((application) => application.id === selectedApplicationId);

  const stats = useMemo(() => {
    const totalByStatus = (status) =>
      allApplications.filter((application) => application.status === status).length;

    return [
      { label: 'Total Pending', value: approvalQueue.length, badge: 'Live', icon: TotalPending, tone: 'pending' },
      { label: 'Verified', value: totalByStatus(APPROVED_STATUS), badge: 'Today', icon: VerifiedIcon, tone: 'verified' },
      { label: 'Rejected', value: totalByStatus(REJECTED_STATUS), badge: 'Today', icon: RejectedIcon, tone: 'rejected' },
    ];
  }, [allApplications, approvalQueue.length]);

  const refreshQueue = () => {
    setAllApplications(readAllApplications());
    setSelectedApplicationId(null);
    setRejectionReason('');
  };

  const updateApprovalStatus = (status) => {
    if (!selectedApplication) return;

    if (status === REJECTED_STATUS && !rejectionReason.trim()) {
      alert('Please enter a reason before rejecting this application.');
      return;
    }

    const reviewedAt = new Date().toISOString();
    const updatedApplications = readAllApplications().map((application) =>
      application.id === selectedApplication.id
        ? {
            ...application,
            status,
            approvalStatus: status,
            approvalReviewedAt: reviewedAt,
            approvalRejectionReason: status === REJECTED_STATUS ? rejectionReason.trim() : '',
          }
        : application
    );

    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updatedApplications));
    setAllApplications(updatedApplications);
    setSelectedApplicationId(null);
    setRejectionReason('');
  };

  if (selectedApplication) {
    const applicantName = formatApplicantName(selectedApplication);
    const loanPurpose = selectedApplication.loanPurpose || selectedApplication.loanType;
    const term = selectedApplication.tenor ? `${selectedApplication.tenor} Months` : '-';
    const verificationNote = selectedApplication.verificationNotes || selectedApplication.internalNotes;

    return (
      <section className="ad-page ad-review-page">
        <header className="ad-header">
          <div className="ad-brand">
            <img src={LapoLogo} alt="LAPO Microfinance Bank" />
          </div>
          <div className="ad-heading">
            <h1>Approval Dashboard</h1>
            <p>Review and action verified loan applications.</p>
          </div>
          <button type="button" className="ad-refresh-button" onClick={refreshQueue}>
            <RefreshCw size={16} aria-hidden="true" />
            Refresh Queue
          </button>
        </header>

        <div className="ad-review-layout">
          <main className="ad-review-main">
            <section className="ad-profile-card">
              <div className="ad-profile-title-row">
                <h2>Applicant Profile</h2>
                <div className="ad-requested-amount">
                  <strong>{formatCurrency(selectedApplication.amountRequested)}</strong>
                  <span>Requested Amount</span>
                </div>
              </div>

              <div className="ad-profile-grid">
                <DetailField label="Full Name" value={applicantName} />
                <DetailField label="Duration" value={term} />
                <DetailField label="Loan Purpose" value={loanPurpose} />
                <DetailField label="Residential Address" value={selectedApplication.homeAddress} />
              </div>
            </section>

            <section className="ad-bank-card">
              <h2>
                <ShieldCheck size={22} aria-hidden="true" />
                Verification &amp; Bank Details
              </h2>

              <div className="ad-bank-grid ad-bank-status-grid">
                <div className="ad-verification-line">
                  <span>BVN Status</span>
                  <strong>
                    <CheckCircle size={20} aria-hidden="true" />
                    {selectedApplication.bvn ? 'Verified - Matches Profile' : '-'}
                  </strong>
                </div>
                <div className="ad-verification-line">
                  <span>Credit Bureau Check</span>
                  <strong>
                    <AlertTriangle size={20} aria-hidden="true" />
                    {selectedApplication.creditBureauCheck || 'Clear'}
                  </strong>
                </div>
              </div>

              <div className="ad-bank-divider" />

              <div className="ad-bank-grid">
                <DetailField label="Bank Name" value={selectedApplication.bank} />
                <DetailField label="Account Number" value={selectedApplication.accountNumber} />
              </div>

              <div className="ad-income-summary">
                <span>Income Proof Summary (6 Months Statement)</span>
                <div>
                  <p>Average Monthly Inflow:</p>
                  <strong>{selectedApplication.monthlyInflow ? formatCurrency(selectedApplication.monthlyInflow) : '-'}</strong>
                </div>
                <div>
                  <p>Consistent Deposits:</p>
                  <strong>{selectedApplication.consistentDeposits || '-'}</strong>
                </div>
              </div>
            </section>
          </main>

          <aside className="ad-side-panel">
            <div className="ad-side-head">
              <div>
                <strong>Approval Review</strong>
                <span>{selectedApplication.id}</span>
              </div>
              <button type="button" aria-label="Close details" onClick={() => setSelectedApplicationId(null)}>
                <X size={24} aria-hidden="true" />
              </button>
            </div>

            <section className="ad-side-applicant">
              <h3>{applicantName}</h3>
              <span className="ad-forwarded-badge">
                <CheckCircle size={12} aria-hidden="true" />
                Pending
              </span>
              <p>
                Application ID: {selectedApplication.id}
                {selectedApplication.loanType ? ` • ${selectedApplication.loanType}` : ''}
              </p>

              <div className="ad-side-amount-card">
                <div>
                  <span>Requested Amount</span>
                  <strong>{formatCurrency(selectedApplication.amountRequested)}</strong>
                </div>
                <div>
                  <span>Term</span>
                  <strong>{selectedApplication.tenor || '-'}</strong>
                  <small>Months</small>
                </div>
              </div>
            </section>

            <section className="ad-notes-section">
              <h4>Verification Notes</h4>
              <div className="ad-note-card">
                <Quote size={20} aria-hidden="true" />
                <p>{verificationNote || 'No verification notes were added for this application.'}</p>
                <span>{selectedApplication.verifiedBy || 'Verification Officer'}{selectedApplication.verifiedAt ? `, ${formatDate(selectedApplication.verifiedAt)}` : ''}</span>
              </div>
            </section>

            <section className="ad-metrics-section">
              <h4>Key Metrics</h4>
              <MetricRow label="Credit Score" value={selectedApplication.creditScore} />
              <MetricRow label="Debt-to-Income" value={selectedApplication.debtToIncome} />
              <MetricRow
                label="Collateral Value"
                value={selectedApplication.collateralValue ? formatCurrency(selectedApplication.collateralValue) : ''}
              />
            </section>
          </aside>
        </div>

        <div className="ad-review-actions">
          <input
            value={rejectionReason}
            onChange={(event) => setRejectionReason(event.target.value)}
            placeholder="Reason for rejection (required if rejecting)..."
          />
          <button type="button" className="ad-reject-button" onClick={() => updateApprovalStatus(REJECTED_STATUS)}>
            <XCircle size={16} aria-hidden="true" />
            Reject Application
          </button>
          <button type="button" className="ad-approve-button" onClick={() => updateApprovalStatus(APPROVED_STATUS)}>
            <CheckCircle size={16} aria-hidden="true" />
            Verify and Forward
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="ad-page">
      <header className="ad-header">
        <div className="ad-brand">
          <img src={LapoLogo} alt="LAPO Microfinance Bank" />
        </div>
        <div className="ad-heading">
          <h1>Approval Dashboard</h1>
          <p>Review and action verified loan applications.</p>
        </div>
        <button type="button" className="ad-refresh-button" onClick={refreshQueue}>
          <RefreshCw size={16} aria-hidden="true" />
          Refresh Queue
        </button>
      </header>

      <div className="ad-stats-grid">
        {stats.map((item) => (
          <article className="ad-stat-card" key={item.label}>
            <div className="ad-stat-card-top">
              <span className={`ad-stat-icon-box ad-stat-icon-box--${item.tone}`}>
                <img className="ad-stat-icon" src={item.icon} alt="" />
              </span>
              <span className="ad-stat-badge">{item.badge}</span>
            </div>
            <span className="ad-stat-label">{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>

      <section className="ad-queue">
        <div className="ad-queue-header">
          <h2>Verified Queue</h2>
          <button type="button" className="ad-filter-button">
            <Filter size={14} aria-hidden="true" />
            Filter
          </button>
        </div>

        <div className="ad-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Loan Type</th>
                <th>Amount<br />({'\u20A6'})</th>
                <th>Verified By</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {approvalQueue.map((application, index) => (
                <tr className={index === 0 ? 'ad-row-highlight' : ''} key={application.id}>
                  <td>
                    <strong>{formatApplicantName(application)}</strong>
                    <span>ID: {application.id}</span>
                  </td>
                  <td>{application.loanType || '-'}</td>
                  <td className="ad-amount">{formatAmount(application.amountRequested)}</td>
                  <td>{application.verifiedBy || formatDate(application.verifiedAt || application.submittedAt)}</td>
                  <td>
                    <button
                      type="button"
                      className="ad-review-button"
                      onClick={() => setSelectedApplicationId(application.id)}
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}

              {approvalQueue.length === 0 && (
                <tr>
                  <td className="ad-empty" colSpan="5">
                    No forwarded applications are pending approval.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="ad-table-footer">
          <span>
            Showing {approvalQueue.length ? 1 : 0} to {approvalQueue.length} of {approvalQueue.length} entries
          </span>
          <div className="ad-pagination" aria-hidden="true">
            <button type="button">&lt;</button>
            <button type="button">&gt;</button>
          </div>
        </footer>
      </section>
    </section>
  );
}
