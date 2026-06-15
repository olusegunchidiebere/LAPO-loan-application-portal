import { useMemo, useState } from 'react';
import './VerificationDashboard.css';

const applications = [
  {
    id: 'APP-2023-8901',
    name: 'Chukwuemeka Obi',
    loanType: 'SME Business Loan',
    amount: 'NGN 1,500,000',
    date: 'Oct 26, 2023',
    status: 'Pending',
  },
  {
    id: 'APP-2023-8902',
    name: 'Oluwaseun Adeyemi',
    loanType: 'Agric Loan',
    amount: 'NGN 2,500,000',
    date: 'Oct 26, 2023',
    status: 'Pending',
  },
  {
    id: 'APP-2023-8895',
    name: 'Amina Bello',
    loanType: 'Personal Loan',
    amount: 'NGN 500,000',
    date: 'Oct 26, 2023',
    status: 'Verified',
  },
  {
    id: 'APP-2023-8880',
    name: 'Ngozi Eze',
    loanType: 'Education Loan',
    amount: 'NGN 300,000',
    date: 'Oct 25, 2023',
    status: 'Rejected',
  },
];

const stats = [
  { label: 'Total Pending', value: 42, tone: 'pending' },
  { label: 'Verified', value: 18, tone: 'verified' },
  { label: 'Rejected', value: 3, tone: 'rejected' },
];

function StatusBadge({ status }) {
  return <span className={`vd-status vd-status--${status.toLowerCase()}`}>{status}</span>;
}

export default function VerificationDashboard() {
  const [search, setSearch] = useState('');

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return applications;
    }

    return applications.filter((application) =>
      [application.id, application.name, application.loanType, application.status]
        .join(' ')
        .toLowerCase()
        .includes(query)
    );
  }, [search]);

  return (
    <section className="vd-page">
      <header className="vd-header">
        <div>
          <p className="vd-eyebrow">LAPO Microfinance Bank</p>
          <h1>Verification Dashboard</h1>
          <p>Manage and review loan applications waiting for verification.</p>
        </div>
        <button type="button" className="vd-refresh-button">
          Refresh Queue
        </button>
      </header>

      <div className="vd-stats-grid">
        {stats.map((item) => (
          <article className="vd-stat-card" key={item.label}>
            <div className={`vd-stat-icon vd-stat-icon--${item.tone}`} />
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </div>

      <section className="vd-queue">
        <div className="vd-queue-header">
          <h2>Applications Queue</h2>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search applicant..."
            aria-label="Search applicant"
          />
        </div>

        <div className="vd-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Applicant</th>
                <th>Loan Type</th>
                <th>Amount</th>
                <th>Date Submitted</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredApplications.map((application) => (
                <tr key={application.id}>
                  <td>
                    <strong>{application.name}</strong>
                    <span>{application.id}</span>
                  </td>
                  <td>{application.loanType}</td>
                  <td>{application.amount}</td>
                  <td>{application.date}</td>
                  <td>
                    <StatusBadge status={application.status} />
                  </td>
                  <td>
                    <button type="button" className="vd-link-button">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}

              {filteredApplications.length === 0 && (
                <tr>
                  <td className="vd-empty" colSpan="6">
                    No matching applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
