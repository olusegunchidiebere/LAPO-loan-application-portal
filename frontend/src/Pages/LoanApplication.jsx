import { useState } from 'react';
import './LoanApplication.css';

const steps = ['Personal Info', 'Loan Details', 'Review'];

function SectionIcon({ type }) {
  const paths = {
    loan: (
      <>
        <path d="M7 3h7l4 4v14H7z" />
        <path d="M14 3v5h4" />
        <path d="M10 13h5" />
        <path d="M10 16h4" />
      </>
    ),
    user: (
      <>
        <circle cx="12" cy="8" r="3" />
        <path d="M7 19c.7-3 2.4-4.5 5-4.5s4.3 1.5 5 4.5" />
      </>
    ),
    briefcase: (
      <>
        <path d="M9 7V5h6v2" />
        <path d="M5 7h14v12H5z" />
        <path d="M5 12h14" />
      </>
    ),
    id: (
      <>
        <path d="M5 6h14v12H5z" />
        <circle cx="10" cy="11" r="2" />
        <path d="M14 10h3" />
        <path d="M14 14h3" />
        <path d="M8 16c.4-1.1 1.1-1.7 2-1.7s1.6.6 2 1.7" />
      </>
    ),
    agreement: (
      <>
        <path d="M7 4h10v16H7z" />
        <path d="M10 8h4" />
        <path d="M10 12h4" />
        <path d="M10 16h2" />
      </>
    ),
    shield: (
      <>
        <path d="M12 3l7 3v5c0 4.4-2.6 7.6-7 10-4.4-2.4-7-5.6-7-10V6z" />
        <path d="M9 12l2 2 4-5" />
      </>
    ),
  };

  return (
    <svg className="loan-app-card-icon" viewBox="0 0 24 24" aria-hidden="true">
      {paths[type]}
    </svg>
  );
}

function FormCard({ title, icon, children }) {
  return (
    <section className="loan-app-card">
      <h2>
        <SectionIcon type={icon} />
        {title}
      </h2>
      <div className="loan-app-card-divider" />
      {children}
    </section>
  );
}

function Field({ label, children, full = false }) {
  return (
    <label className={`loan-app-field${full ? ' loan-app-field-full' : ''}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function PersonalInfoStep({ onNext }) {
  const [loanType, setLoanType] = useState('New Loan');
  const [sex, setSex] = useState('Male');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    onNext();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="loan-app-heading">
        <h1>Applicant Information</h1>
        <p>Please provide accurate details to ensure smooth processing of your application.</p>
      </div>

      <FormCard title="Loan Type" icon="loan">
        <div className="loan-type-options" role="radiogroup" aria-label="Loan type">
          {['New Loan', 'Top Up', 'Renewal'].map((type) => (
            <label className={`loan-type-option${loanType === type ? ' loan-type-option-active' : ''}`} key={type}>
              <input
                type="radio"
                name="loanType"
                value={type}
                checked={loanType === type}
                onChange={() => setLoanType(type)}
                required
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </FormCard>

      <FormCard title="Personal Details" icon="user">
        <div className="loan-app-grid">
          <Field label="SURNAME">
            <input placeholder="Enter surname" required />
          </Field>
          <Field label="OTHER NAMES">
            <input placeholder="Enter other names" required />
          </Field>
          <Field label="DATE OF BIRTH">
            <input type="date" required />
          </Field>
          <Field label="SEX">
            <div className="segmented-control">
              {['Male', 'Female'].map((option) => (
                <label className={sex === option ? 'segmented-active' : ''} key={option}>
                  <input
                    type="radio"
                    name="sex"
                    value={option}
                    checked={sex === option}
                    onChange={() => setSex(option)}
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          </Field>
          <Field label="MARITAL STATUS">
            <select defaultValue="" required>
              <option value="" disabled>Select status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
            </select>
          </Field>
          <Field label="NO OF CHILDREN">
            <input type="number" placeholder="0" min="0" required />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Contact & Employment" icon="briefcase">
        <div className="loan-app-grid">
          <Field label="BVN">
            <input placeholder="11-digit Bank Verification Number" required />
          </Field>
          <Field label="ORACLE NO">
            <input placeholder="Employee Oracle ID" required />
          </Field>
          <Field label="DATE OF EMPLOYMENT">
            <input type="date" required />
          </Field>
          <Field label="EXPECTED RETIREMENT DATE">
            <input type="date" required />
          </Field>
          <Field label="PHONE NUMBER">
            <input placeholder="+234" required />
          </Field>
          <Field label="ALTERNATE PHONE NO">
            <input placeholder="+234 (Optional)" />
          </Field>
          <Field label="HOME ADDRESS" full>
            <textarea placeholder="Enter full residential address" required />
          </Field>
          <Field label="OFFICE ADDRESS" full>
            <textarea placeholder="Enter current branch/office address" required />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Means of Identification" icon="id">
        <div className="loan-app-grid">
          <Field label="ID TYPE">
            <select defaultValue="" required>
              <option value="" disabled>Select ID type</option>
              <option>National ID</option>
              <option>Driver's License</option>
              <option>Voter's Card</option>
              <option>International Passport</option>
            </select>
          </Field>
          <Field label="ID NUMBER">
            <input placeholder="Enter ID number" required />
          </Field>
          <Field label="DATE ISSUED">
            <input type="date" required />
          </Field>
          <Field label="EXPIRY DATE">
            <input type="date" required />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Loan Agreement Details" icon="agreement">
        <Field label="PURPOSE OF LOAN" full>
          <textarea className="loan-purpose-field" placeholder="Provide a brief description of the intended use of funds" required />
        </Field>
      </FormCard>

      <div className="loan-app-actions loan-app-actions-first">
        <button type="submit" className="loan-app-next">
          Next Step
          <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
    </form>
  );
}

function LoanDetailsStep({ onPrevious, onNext }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    onNext();
  };

  return (
    <form className="loan-step-two" onSubmit={handleSubmit}>
      <div className="loan-app-heading">
        <h1>Loan Application</h1>
        <p>Step 2 of 3: Loan Details &amp; Next of Kin</p>
      </div>

      <FormCard title="Loan Details" icon="user">
        <div className="loan-app-grid loan-details-grid">
          <Field label="AMOUNT REQUESTED (₦)">
            <input type="number" placeholder="e.g. 500000" min="1" required />
          </Field>
          <Field label="TENOR (MONTHS)">
            <input type="number" placeholder="24 Months" min="1" required />
          </Field>
          <Field label="REPAYMENT MODE">
            <select defaultValue="" required>
              <option value="" disabled>Payroll Deduction</option>
              <option>Payroll Deduction</option>
              <option>Direct Debit</option>
              <option>Cash Repayment</option>
            </select>
          </Field>
          <div className="loan-app-field-spacer" />
          <Field label="BANK DETAILS">
            <select defaultValue="" required>
              <option value="" disabled>Select Bank</option>
              <option>Access Bank</option>
              <option>First Bank</option>
              <option>GTBank</option>
              <option>Zenith Bank</option>
              <option>UBA</option>
            </select>
          </Field>
          <Field label="ACCOUNT NUMBER">
            <input inputMode="numeric" placeholder="10 digit account number" required />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Next of Kin" icon="briefcase">
        <div className="loan-app-grid">
          <Field label="FULL NAME">
            <input placeholder="Enter full name" required />
          </Field>
          <Field label="RELATIONSHIP">
            <select defaultValue="" required>
              <option value="" disabled>Select Relationship</option>
              <option>Spouse</option>
              <option>Parent</option>
              <option>Sibling</option>
              <option>Child</option>
              <option>Friend</option>
            </select>
          </Field>
          <Field label="PHONE NUMBER">
            <input placeholder="+234" required />
          </Field>
          <Field label="ALTERNATE PHONE NO">
            <input placeholder="+234 (Optional)" />
          </Field>
          <Field label="ADDRESS" full>
            <textarea placeholder="Enter full residential address" required />
          </Field>
        </div>
      </FormCard>

      <div className="secure-application-note">
        <SectionIcon type="shield" />
        <div>
          <strong>Secure Application</strong>
          <p>Your information is protected with bank-level security. Next of Kin details are strictly for emergency contact purposes during the loan lifecycle.</p>
        </div>
      </div>

      <div className="loan-app-actions">
        <button type="button" className="loan-app-previous" onClick={onPrevious}>
          <span aria-hidden="true">&lt;-</span>
          Previous
        </button>
        <button type="submit" className="loan-app-next">
          Next Step
          <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
    </form>
  );
}

function ReviewStep({ onPrevious }) {
  return (
    <>
      <div className="loan-app-heading">
        <h1>Review</h1>
        <p>Confirm your application information before submission.</p>
      </div>

      <FormCard title="Application Review" icon="agreement">
        <div className="loan-app-placeholder">
          Review section will appear here.
        </div>
      </FormCard>

      <div className="loan-app-actions">
        <button type="button" className="loan-app-previous" onClick={onPrevious}>
          <span aria-hidden="true">&lt;-</span>
          Previous
        </button>
        <button type="button" className="loan-app-next">
          Submit
          <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
    </>
  );
}

function LoanApplication() {
  const [activeStep, setActiveStep] = useState(0);

  const goNext = () => {
    setActiveStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const goPrevious = () => {
    setActiveStep((step) => Math.max(step - 1, 0));
  };

  return (
    <section className="loan-application-page">
      <div className="loan-application-shell">
        <div className="loan-app-stepper" aria-label="Application progress">
          {steps.map((step, index) => (
            <div
              className={`loan-app-step${index <= activeStep ? ' loan-app-step-active' : ''}`}
              key={step}
            >
              <span className="loan-app-step-number">{index + 1}</span>
              <span className="loan-app-step-label">{step}</span>
            </div>
          ))}
        </div>

        {activeStep === 0 && <PersonalInfoStep onNext={goNext} />}
        {activeStep === 1 && <LoanDetailsStep onPrevious={goPrevious} onNext={goNext} />}
        {activeStep === 2 && <ReviewStep onPrevious={goPrevious} />}
      </div>
    </section>
  );
}

export default LoanApplication;
