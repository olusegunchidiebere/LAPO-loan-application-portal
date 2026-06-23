import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Filter, RefreshCw, Wallet, X } from 'lucide-react';
import './DisbursementDashboard.css';
import LapoLogo from '../../assets/LapoLogo.png';
import TotalPending from '../../assets/TotalPending.png';
import VerifiedIcon from '../../assets/VerifiedIcon.png';

const APPLICATIONS_STORAGE_KEY = 'lapoLoanApplications';
const APPROVED_STATUS = 'Approved';
const DISBURSED_STATUS = 'Disbursed';

function readApplications() {
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

function numericAmount(value) {
  return Number(value || 0);
}

function formatAmount(value) {
  const amount = numericAmount(value);
  return amount ? amount.toLocaleString() : '0';
}

function formatCurrency(value) {
  return `\u20A6 ${formatAmount(value)}`;
}

function formatCompactCurrency(value) {
  const amount = numericAmount(value);

  if (amount >= 1000000) {
    return `\u20A6 ${(amount / 1000000).toFixed(amount % 1000000 === 0 ? 0 : 1)}M`;
  }

  return formatCurrency(amount);
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

function isSameDay(value, dateToMatch) {
  if (!value) return false;
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return date.toDateString() === dateToMatch.toDateString();
}

function isSameMonth(value, dateToMatch) {
  if (!value) return false;
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return false;
  }

  return date.getFullYear() === dateToMatch.getFullYear() && date.getMonth() === dateToMatch.getMonth();
}

function makeDisbursementReference(application) {
  const suffix = String(Date.now()).slice(-5);
  const appSuffix = String(application.id || 'APP').replace(/[^a-z0-9]/gi, '').slice(-4).toUpperCase();
  return `LAPO-DIS-${appSuffix}${suffix}`;
}

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('staff');
    navigate('/admin');
  };

  return (
    <button type="button" className="dd-logout-button" onClick={handleLogout}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Logout
    </button>
  );
}

export default function DisbursementDashboard() {
  const [applications, setApplications] = useState(() => readApplications());
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const selectedApplication = applications.find((application) => application.id === selectedApplicationId);

  const disbursementQueue = useMemo(
    () => applications.filter((application) => application.status === APPROVED_STATUS),
    [applications]
  );

  const disbursedApplications = useMemo(
    () => applications.filter((application) => application.status === DISBURSED_STATUS),
    [applications]
  );

  const stats = useMemo(() => {
    const today = new Date();
    const disbursedToday = disbursedApplications.filter((application) =>
      isSameDay(application.disbursedAt, today)
    );
    const disbursedThisMonth = disbursedApplications.filter((application) =>
      isSameMonth(application.disbursedAt, today)
    );
    const sumAmounts = (items) =>
      items.reduce((total, application) => total + numericAmount(application.amountRequested), 0);

    return {
      pendingCount: disbursementQueue.length,
      pendingAmount: sumAmounts(disbursementQueue),
      todayCount: disbursedToday.length,
      todayAmount: sumAmounts(disbursedToday),
      monthAmount: sumAmounts(disbursedThisMonth),
      monthCount: disbursedThisMonth.length,
    };
  }, [disbursementQueue, disbursedApplications]);

  const refreshQueue = () => {
    setApplications(readApplications());
    setSelectedApplicationId(null);
  };

  const confirmDisbursement = () => {
    if (!selectedApplication) return;

    const disbursedAt = new Date().toISOString();
    const updatedApplications = readApplications().map((application) =>
      application.id === selectedApplication.id
        ? {
            ...application,
            status: DISBURSED_STATUS,
            disbursementStatus: DISBURSED_STATUS,
            disbursedAt,
            disbursementReference:
              application.disbursementReference || makeDisbursementReference(application),
          }
        : application
    );

    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(updatedApplications));
    setApplications(updatedApplications);
    setSelectedApplicationId(null);
  };

  return (
    <section className={`dd-page${selectedApplication ? ' dd-page-modal-open' : ''}`}>
      <header className="dd-header">
        <div className="dd-brand">
          <img src={LapoLogo} alt="LAPO Microfinance Bank" />
        </div>
        <div className="dd-heading">
          <h1>Disbursement Dashboard</h1>
          <p>Manage and execute approved loan disbursements.</p>
        </div>
        <div className="dd-header-actions">
          <button type="button" className="dd-refresh-button" onClick={refreshQueue}>
            <RefreshCw size={16} aria-hidden="true" />
            Refresh Queue
          </button>
          <LogoutButton />
        </div>
      </header>

      <div className="dd-stats-grid">
        <article className="dd-stat-card">
          <div className="dd-stat-card-top">
            <span className="dd-stat-icon-box dd-stat-icon-box--pending">
              <img className="dd-stat-icon" src={TotalPending} alt="" />
            </span>
            <span className="dd-stat-badge">Live</span>
          </div>
          <span className="dd-stat-label">Pending Disbursement</span>
          <strong>{stats.pendingCount}</strong>
          <small>{formatCurrency(stats.pendingAmount)}</small>
        </article>

        <article className="dd-stat-card">
          <div className="dd-stat-card-top">
            <span className="dd-stat-icon-box dd-stat-icon-box--verified">
              <img className="dd-stat-icon" src={VerifiedIcon} alt="" />
            </span>
            <span className="dd-stat-badge">Today</span>
          </div>
          <span className="dd-stat-label">Disbursed Today</span>
          <strong>{stats.todayCount}</strong>
          <small>{formatCurrency(stats.todayAmount)}</small>
        </article>

        <article className="dd-month-card">
          <div className="dd-month-top">
            <span>
              <Wallet size={22} aria-hidden="true" />
            </span>
            <small>MTD</small>
          </div>
          <p>Total Disbursed This Month</p>
          <strong>{formatCompactCurrency(stats.monthAmount)}</strong>
          <span>Across {stats.monthCount} loans</span>
        </article>
      </div>

      <section className="dd-queue">
        <div className="dd-queue-header">
          <h2>Disbursement Queue</h2>
          <button type="button" className="dd-filter-button">
            <Filter size={14} aria-hidden="true" />
            Filter
          </button>
        </div>

        <div className="dd-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Account Info</th>
                <th>Amount<br />({'\u20A6'})</th>
                <th>Approval Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {disbursementQueue.map((application, index) => (
                <tr className={index === 0 ? 'dd-row-highlight' : ''} key={application.id}>
                  <td>
                    <strong>{formatApplicantName(application)}</strong>
                    <span>ID: {application.id}</span>
                  </td>
                  <td>
                    <strong>{application.accountNumber || '-'}</strong>
                    <span>{application.bank || '-'}</span>
                  </td>
                  <td className="dd-amount">{formatAmount(application.amountRequested)}</td>
                  <td>{formatDate(application.approvalReviewedAt || application.approvedAt)}</td>
                  <td>
                    <button
                      type="button"
                      className="dd-disburse-button"
                      onClick={() => setSelectedApplicationId(application.id)}
                    >
                      Disburse
                    </button>
                  </td>
                </tr>
              ))}

              {disbursementQueue.length === 0 && (
                <tr>
                  <td className="dd-empty" colSpan="5">
                    No approved applications are pending disbursement.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="dd-table-footer">
          <span>
            Showing {disbursementQueue.length ? 1 : 0} to {disbursementQueue.length} of {disbursementQueue.length} entries
          </span>
          <div className="dd-pagination" aria-hidden="true">
            <button type="button">&lt;</button>
            <button type="button">&gt;</button>
          </div>
        </footer>
      </section>

      {selectedApplication && (
        <div className="dd-modal-backdrop" role="presentation">
          <section className="dd-modal" role="dialog" aria-modal="true" aria-labelledby="disbursement-title">
            <button
              type="button"
              className="dd-modal-close"
              aria-label="Cancel and return"
              onClick={() => setSelectedApplicationId(null)}
            >
              <X size={20} aria-hidden="true" />
            </button>
            <div className="dd-modal-icon">
              <Wallet size={34} aria-hidden="true" />
            </div>
            <h2 id="disbursement-title">Confirm Disbursement</h2>
            <p>Review the details below before confirming. This action cannot be undone.</p>

            <div className="dd-confirm-card">
              <div className="dd-confirm-top">
                <div>
                  <span>Applicant Name</span>
                  <strong>{formatApplicantName(selectedApplication)}</strong>
                </div>
                <div>
                  <span>Approved Amount</span>
                  <strong>{formatCurrency(selectedApplication.amountRequested)}</strong>
                </div>
              </div>

              <div className="dd-confirm-divider" />

              <div className="dd-confirm-grid">
                <div>
                  <span>Bank Name</span>
                  <strong>{selectedApplication.bank || '-'}</strong>
                </div>
                <div>
                  <span>Account Number</span>
                  <strong>{selectedApplication.accountNumber || '-'}</strong>
                </div>
                <div>
                  <span>Approval Reference</span>
                  <strong>{selectedApplication.approvalReference || selectedApplication.id}</strong>
                </div>
                <div>
                  <span>Date Approved</span>
                  <strong>{formatDate(selectedApplication.approvalReviewedAt || selectedApplication.approvedAt)}</strong>
                </div>
              </div>
            </div>

            <button type="button" className="dd-confirm-button" onClick={confirmDisbursement}>
              <CheckCircle size={18} aria-hidden="true" />
              Confirm Disbursement
            </button>
            <button type="button" className="dd-cancel-button" onClick={() => setSelectedApplicationId(null)}>
              Cancel &amp; Return
            </button>
          </section>
        </div>
      )}
    </section>
  );
}