import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VerificationDashboard.css';
import LapoLogo from '../../assets/LapoLogo.png';
import TotalPending from '../../assets/TotalPending.png';
import VerifiedIcon from '../../assets/VerifiedIcon.png';
import RejectedIcon from '../../assets/RejectedIcon.png';
import PendingStatusIcon from '../../assets/Pending.png';
import VerifiedStatusIcon from '../../assets/Verified.png';

const APPLICATIONS_STORAGE_KEY = 'lapoLoanApplications';
const PENDING_STATUS = 'Pending';
const VERIFIED_STATUS = 'Verified';
const REJECTED_STATUS = 'Rejected';
const statusIcons = {
  [PENDING_STATUS]: PendingStatusIcon,
  [VERIFIED_STATUS]: VerifiedStatusIcon,
  [REJECTED_STATUS]: RejectedIcon,
};

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

function formatAmount(value) {
  const amount = Number(value || 0);
  return amount ? amount.toLocaleString() : '0';
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

function StatusBadge({ status }) {
  const displayStatus = status || 'Pending';
  const normalizedStatus = displayStatus.toLowerCase();
  const icon = statusIcons[displayStatus];

  return (
    <span className={`vd-status vd-status--${normalizedStatus}`}>
      {icon && <img src={icon} alt="" aria-hidden="true" />}
      {displayStatus}
    </span>
  );
}

function DetailField({ label, value }) {
  return (
    <div className="vd-detail-field">
      <span>{label}</span>
      <strong>{value || '-'}</strong>
    </div>
  );
}

function initialsFromName(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase() || 'NA';
}

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('staff');
    navigate('/admin');
  };

  return (
    <button type="button" className="vd-logout-button" onClick={handleLogout}>
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>
      Logout
    </button>
  );
}

export default function VerificationDashboard() {
  const [search, setSearch] = useState('');
  const [applications, setApplications] = useState(() => readApplications());
  const [selectedApplicationId, setSelectedApplicationId] = useState(null);
  const [rejectionReason, setRejectionReason] = useState('');
  const selectedApplication = applications.find((application) => application.id === selectedApplicationId);

  const stats = useMemo(() => {
    const totalByStatus = (status) =>
      applications.filter((application) => (application.status || PENDING_STATUS) === status).length;

    return [
      { label: 'Total Pending', value: totalByStatus(PENDING_STATUS), badge: 'Live', icon: TotalPending, tone: 'pending' },
      { label: 'Verified', value: totalByStatus(VERIFIED_STATUS), badge: 'Today', icon: VerifiedIcon, tone: 'verified' },
      { label: 'Rejected', value: totalByStatus(REJECTED_STATUS), badge: 'Today', icon: RejectedIcon, tone: 'rejected' },
    ];
  }, [applications]);

  const queuedApplications = useMemo(
    () => applications.filter((application) => (application.status || PENDING_STATUS) === PENDING_STATUS),
    [applications]
  );

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return queuedApplications;
    }

    return queuedApplications.filter((application) =>
      [
        application.id,
        formatApplicantName(application),
        application.loanType,
        application.amountRequested,
        application.status,
      ]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [queuedApplications, search]);

  const refreshQueue = () => {
    setApplications(readApplications());
  };

  const updateApplicationStatus = (status) => {
    if (!selectedApplication) return;
    if (status === REJECTED_STATUS && !rejectionReason.trim()) {
      alert('Please enter a reason before rejecting this application.');
      return;
    }

    const allApplications = readApplications();
    const updatedApplications = applications.map((application) =>
      application.id === selectedApplication.id
        ? {
            ...application,
            status,
            rejectionReason: status === REJECTED_STATUS ? rejectionReason : '',
            verifiedAt: status === VERIFIED_STATUS ? new Date().toISOString() : application.verifiedAt,
          }
        : application
    );
    const persistedApplications = allApplications.map((application) =>
      application.id === selectedApplication.id
        ? {
            ...application,
            status,
            rejectionReason: status === REJECTED_STATUS ? rejectionReason : '',
            verifiedAt: status === VERIFIED_STATUS ? new Date().toISOString() : application.verifiedAt,
          }
        : application
    );

    localStorage.setItem(APPLICATIONS_STORAGE_KEY, JSON.stringify(persistedApplications));
    setApplications(updatedApplications);
    setSelectedApplicationId(null);
    setRejectionReason('');
  };

  if (selectedApplication) {
    const applicantName = formatApplicantName(selectedApplication);

    return (
      <section className="vd-page vd-page-review">
        <header className="vd-header">
          <div className="vd-brand">
            <img src={LapoLogo} alt="LAPO Microfinance Bank" />
          </div>
          <div className="vd-heading">
            <h1>Verification Dashboard</h1>
            <p>Manage and review pending loan applications.</p>
          </div>
          <div className="vd-header-actions">
            <button type="button" className="vd-refresh-button" onClick={refreshQueue}>
              <span aria-hidden="true">↻</span>
              Refresh Queue
            </button>
            <LogoutButton />
          </div>
        </header>

        <div className="vd-review-layout">
          <div className="vd-review-main">
            <section className="vd-review-card vd-profile-card">
              <div className="vd-profile-title-row">
                <h2>Applicant Profile</h2>
                <div className="vd-requested-amount">
                  <strong>₦ {formatAmount(selectedApplication.amountRequested)}</strong>
                  <span>Requested Amount</span>
                </div>
              </div>
              <div className="vd-detail-grid">
                <DetailField label="Full Name" value={applicantName} />
                <DetailField label="BVN" value={selectedApplication.bvn} />
                <DetailField label="Phone Number" value={selectedApplication.phone} />
                <DetailField label="Oracle No" value={selectedApplication.oracleNo} />
                <DetailField label="Residential Address" value={selectedApplication.homeAddress} />
              </div>
            </section>

            <section className="vd-review-card">
              <h2>Guarantor Information</h2>
              <div className="vd-detail-grid">
                <DetailField label="Guarantor Name" value={selectedApplication.kinName} />
                <DetailField label="Relationship" value={selectedApplication.kinRelationship} />
                <DetailField label="Phone Number" value={selectedApplication.kinPhone} />
                <DetailField label="Occupation" value={selectedApplication.kinOccupation || selectedApplication.occupation} />
              </div>
            </section>
          </div>

          <aside className="vd-review-side">
            <div className="vd-side-head">
              <div>
                <strong>Application Review</strong>
                <span>{selectedApplication.id}</span>
              </div>
              <button type="button" aria-label="Close details" onClick={() => setSelectedApplicationId(null)}>
                x
              </button>
            </div>

            <div className="vd-side-applicant">
              <div className="vd-avatar">{initialsFromName(applicantName)}</div>
              <h3>{applicantName}</h3>
            </div>

            <div className="vd-eligibility">
              <div className="vd-eligibility-top">
                <span>Auto-calculated eligibility</span>
                <strong>High Match</strong>
              </div>
              <p><strong>85</strong> /100</p>
              <div className="vd-score-track">
                <span />
              </div>
            </div>

            <section className="vd-documents">
              <h4>Submitted Documents</h4>
              <div className="vd-document-row">
                <div className="vd-document-icon">▣</div>
                <div>
                  <strong>{selectedApplication.passportFileName || 'Passport Photograph'}</strong>
                  <span>
                    {selectedApplication.passportPreviewUrl
                      ? 'Preview available'
                      : 'No image preview saved'}
                  </span>
                </div>
                <img src={VerifiedStatusIcon} alt="" />
              </div>
              {selectedApplication.passportPreviewUrl ? (
                <div className="vd-document-preview vd-document-preview-has-image">
                  <img src={selectedApplication.passportPreviewUrl} alt="Uploaded passport preview" />
                </div>
              ) : (
                <div className="vd-document-preview">
                  <span>▧</span>
                  <strong>Document Preview Canvas</strong>
                </div>
              )}
            </section>

            <label className="vd-notes">
              <span>Internal Notes (Optional)</span>
              <textarea placeholder="Add any observations before approving/rejecting..." />
            </label>
          </aside>
        </div>

        <div className="vd-review-actions">
          <input
            value={rejectionReason}
            onChange={(event) => setRejectionReason(event.target.value)}
            placeholder="Reason for rejection (required if rejecting)..."
          />
          <button
            type="button"
            className="vd-reject-button"
            onClick={() => updateApplicationStatus(REJECTED_STATUS)}
          >
            <img src={RejectedIcon} alt="" />
            Reject Application
          </button>
          <button
            type="button"
            className="vd-verify-button"
            onClick={() => updateApplicationStatus(VERIFIED_STATUS)}
          >
            <img src={VerifiedStatusIcon} alt="" />
            Verify and Forward
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="vd-page">
      <header className="vd-header">
        <div className="vd-brand">
          <img src={LapoLogo} alt="LAPO Microfinance Bank" />
        </div>
        <div className="vd-heading">
          <h1>Verification Dashboard</h1>
          <p>Manage and review pending loan applications.</p>
        </div>
        <div className="vd-header-actions">
          <button type="button" className="vd-refresh-button" onClick={refreshQueue}>
            <span aria-hidden="true">↻</span>
            Refresh Queue
          </button>
          <LogoutButton />
        </div>
      </header>

      <div className="vd-stats-grid">
        {stats.map((item) => (
          <article className="vd-stat-card" key={item.label}>
            <div className="vd-stat-card-top">
              <span className={`vd-stat-icon-box vd-stat-icon-box--${item.tone}`}>
                <img className="vd-stat-icon" src={item.icon} alt="" />
              </span>
              <span className="vd-stat-badge">{item.badge}</span>
            </div>
            <span className="vd-stat-label">{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>

      <section className="vd-queue">
        <div className="vd-queue-header">
          <h2>Applications Queue</h2>
          <label className="vd-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search applicant..."
              aria-label="Search applicant"
            />
          </label>
        </div>

        <div className="vd-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Applicant Name</th>
                <th>Loan Type</th>
                <th>Amount<br />(₦)</th>
                <th>Date<br />Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application, index) => (
                <tr className={index === 0 ? 'vd-row-highlight' : ''} key={application.id}>
                  <td>
                    <strong>{formatApplicantName(application)}</strong>
                    <span>ID: {application.id}</span>
                  </td>
                  <td>{application.loanType || '-'}</td>
                  <td className="vd-amount">{formatAmount(application.amountRequested)}</td>
                  <td>{formatDate(application.submittedAt)}</td>
                  <td>
                    <StatusBadge status={application.status} />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="vd-link-button"
                      onClick={() => setSelectedApplicationId(application.id)}
                    >
                      View Details
                      <span aria-hidden="true">→</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td className="vd-empty" colSpan="6">
            No pending applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <footer className="vd-table-footer">
          <span>
            Showing {filteredApplications.length ? 1 : 0} to {filteredApplications.length} of {queuedApplications.length} entries
          </span>
          <div className="vd-pagination" aria-hidden="true">
            <button type="button">‹</button>
            <button type="button">›</button>
          </div>
        </footer>
      </section>
    </section>
  );
}