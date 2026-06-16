import { useState } from 'react';
import './LoanApplication.css';

const steps = ['Personal Info', 'Loan Details', 'Review'];

const initialApplicationData = {
  loanType: 'New Loan',
  sex: 'Male',
};

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
    image: (
      <>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <circle cx="10" cy="10" r="2" />
        <path d="M7 17l4-4 2 2 2-2 2 4" />
      </>
    ),
    check: (
      <>
        <circle cx="12" cy="12" r="8" />
        <path d="M8.5 12.5l2.5 2.5 4.5-5" />
      </>
    ),
    edit: (
      <>
        <path d="M4 20h4l11-11-4-4L4 16z" />
        <path d="M13 7l4 4" />
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

function getFormValues(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function formatAmount(value) {
  const amount = Number(value || 0);
  if (!amount) return '\u20A60';
  return `\u20A6${amount.toLocaleString()}`;
}

function PersonalInfoStep({ data, onNext }) {
  const [loanType, setLoanType] = useState(data.loanType || 'New Loan');
  const [sex, setSex] = useState(data.sex || 'Male');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    onNext(getFormValues(event.currentTarget));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="loan-app-heading">
        <h1>Applicant Information</h1>
        <p>Please provide accurate details to ensure smooth processing of your application.</p>
      </div>
      <p className="loan-app-required-note">Please fill all required fields to proceed.</p>

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
            <input name="surname" defaultValue={data.surname || ''} placeholder="Enter surname" required />
          </Field>
          <Field label="OTHER NAMES">
            <input name="otherNames" defaultValue={data.otherNames || ''} placeholder="Enter other names" required />
          </Field>
          <Field label="DATE OF BIRTH">
            <input name="dateOfBirth" defaultValue={data.dateOfBirth || ''} type="date" required />
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
            <select name="maritalStatus" defaultValue={data.maritalStatus || ''} required>
              <option value="" disabled>Select status</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
            </select>
          </Field>
          <Field label="NO OF CHILDREN">
            <input name="children" defaultValue={data.children || ''} type="number" placeholder="0" min="0" required />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Contact & Employment" icon="briefcase">
        <div className="loan-app-grid">
          <Field label="BVN">
            <input name="bvn" defaultValue={data.bvn || ''} placeholder="11-digit Bank Verification Number" required />
          </Field>
          <Field label="ORACLE NO">
            <input name="oracleNo" defaultValue={data.oracleNo || ''} placeholder="Employee Oracle ID" required />
          </Field>
          <Field label="DATE OF EMPLOYMENT">
            <input name="employmentDate" defaultValue={data.employmentDate || ''} type="date" required />
          </Field>
          <Field label="EXPECTED RETIREMENT DATE">
            <input name="retirementDate" defaultValue={data.retirementDate || ''} type="date" required />
          </Field>
          <Field label="PHONE NUMBER">
            <input name="phone" defaultValue={data.phone || ''} placeholder="+234" required />
          </Field>
          <Field label="ALTERNATE PHONE NO">
            <input name="alternatePhone" defaultValue={data.alternatePhone || ''} placeholder="+234 (Optional)" />
          </Field>
          <Field label="HOME ADDRESS" full>
            <textarea name="homeAddress" defaultValue={data.homeAddress || ''} placeholder="Enter full residential address" required />
          </Field>
          <Field label="OFFICE ADDRESS" full>
            <textarea name="officeAddress" defaultValue={data.officeAddress || ''} placeholder="Enter current branch/office address" required />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Means of Identification" icon="id">
        <div className="loan-app-grid">
          <Field label="ID TYPE">
            <select name="idType" defaultValue={data.idType || ''} required>
              <option value="" disabled>Select ID type</option>
              <option>National ID</option>
              <option>Driver's License</option>
              <option>Voter's Card</option>
              <option>International Passport</option>
            </select>
          </Field>
          <Field label="ID NUMBER">
            <input name="idNumber" defaultValue={data.idNumber || ''} placeholder="Enter ID number" required />
          </Field>
          <Field label="DATE ISSUED">
            <input name="dateIssued" defaultValue={data.dateIssued || ''} type="date" required />
          </Field>
          <Field label="EXPIRY DATE">
            <input name="expiryDate" defaultValue={data.expiryDate || ''} type="date" required />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Loan Agreement Details" icon="agreement">
        <Field label="PURPOSE OF LOAN" full>
          <textarea name="loanPurpose" defaultValue={data.loanPurpose || ''} className="loan-purpose-field" placeholder="Provide a brief description of the intended use of funds" required />
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

function LoanDetailsStep({ data, onPrevious, onNext }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    onNext(getFormValues(event.currentTarget));
  };

  return (
    <form className="loan-step-two" onSubmit={handleSubmit}>
      <div className="loan-app-heading">
        <h1>Loan Application</h1>
        <p>Step 2 of 3: Loan Details &amp; Next of Kin</p>
      </div>
      <p className="loan-app-required-note">Please fill all required fields to proceed.</p>

      <FormCard title="Loan Details" icon="user">
        <div className="loan-app-grid loan-details-grid">
          <Field label={`AMOUNT REQUESTED (\u20A6)`}>
            <input name="amountRequested" defaultValue={data.amountRequested || ''} type="number" placeholder="e.g. 500000" min="1" required />
          </Field>
          <Field label="TENOR (MONTHS)">
            <input name="tenor" defaultValue={data.tenor || ''} type="number" placeholder="24 Months" min="1" required />
          </Field>
          <Field label="REPAYMENT MODE">
            <select name="repaymentMode" defaultValue={data.repaymentMode || ''} required>
              <option value="" disabled>Payroll Deduction</option>
              <option>Payroll Deduction</option>
              <option>Direct Debit</option>
              <option>Cash Repayment</option>
            </select>
          </Field>
          <div className="loan-app-field-spacer" />
          <Field label="BANK DETAILS">
            <select name="bank" defaultValue={data.bank || ''} required>
              <option value="" disabled>Select Bank</option>
              <option>Access Bank</option>
              <option>First Bank</option>
              <option>GTBank</option>
              <option>Zenith Bank</option>
              <option>UBA</option>
            </select>
          </Field>
          <Field label="ACCOUNT NUMBER">
            <input name="accountNumber" defaultValue={data.accountNumber || ''} inputMode="numeric" placeholder="10 digit account number" required />
          </Field>
        </div>
      </FormCard>

      <FormCard title="Next of Kin" icon="briefcase">
        <div className="loan-app-grid">
          <Field label="FULL NAME">
            <input name="kinName" defaultValue={data.kinName || ''} placeholder="Enter full name" required />
          </Field>
          <Field label="RELATIONSHIP">
            <select name="kinRelationship" defaultValue={data.kinRelationship || ''} required>
              <option value="" disabled>Select Relationship</option>
              <option>Spouse</option>
              <option>Parent</option>
              <option>Sibling</option>
              <option>Child</option>
              <option>Friend</option>
            </select>
          </Field>
          <Field label="PHONE NUMBER">
            <input name="kinPhone" defaultValue={data.kinPhone || ''} placeholder="+234" required />
          </Field>
          <Field label="ALTERNATE PHONE NO">
            <input name="kinAlternatePhone" defaultValue={data.kinAlternatePhone || ''} placeholder="+234 (Optional)" />
          </Field>
          <Field label="ADDRESS" full>
            <textarea name="kinAddress" defaultValue={data.kinAddress || ''} placeholder="Enter full residential address" required />
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

function SummaryRow({ label, value, large = false }) {
  return (
    <div className={`review-summary-row${large ? ' review-summary-row-large' : ''}`}>
      <span>{label}</span>
      <strong>{value || '-'}</strong>
    </div>
  );
}

function ReviewSummary({ data, onEdit }) {
  const fullName = `${data.otherNames || ''} ${data.surname || ''}`.trim();

  return (
    <aside className="review-summary-card">
      <div className="review-summary-header">
        <h2>Application Review</h2>
        <button type="button" onClick={onEdit}>
          <SectionIcon type="edit" />
          Edit
        </button>
      </div>

      <section className="review-summary-section">
        <h3>PERSONAL INFORMATION</h3>
        <div className="review-summary-block">
          <SummaryRow label="Full Name" value={fullName} />
          <SummaryRow label="Phone Number" value={data.phone} />
          <SummaryRow label="Email" value={data.email || 'Not provided'} />
        </div>
      </section>

      <section className="review-summary-section">
        <h3>LOAN DETAILS</h3>
        <div className="review-summary-block review-summary-loan">
          <SummaryRow label="Requested Amount" value={formatAmount(data.amountRequested)} large />
          <SummaryRow label="Loan Purpose" value={data.loanPurpose} />
          <SummaryRow label="Tenure" value={data.tenor ? `${data.tenor} Months` : ''} />
        </div>
      </section>

      <section className="review-summary-section">
        <h3>NEXT OF KIN</h3>
        <div className="review-summary-block">
          <SummaryRow label="Name" value={data.kinName} />
          <SummaryRow label="Relationship" value={data.kinRelationship} />
        </div>
      </section>
    </aside>
  );
}

function ReviewStep({ data, onPrevious, onEdit }) {
  const [passportFile, setPassportFile] = useState(null);

  const handleFileChange = (event) => {
    setPassportFile(event.target.files?.[0] || null);
  };

  return (
    <form className="loan-step-three">
      <div className="loan-app-heading">
        <h1>Loan Application</h1>
        <p>Step 3 of 3: Loan Details &amp; Next of Kin</p>
      </div>

      <div className="review-layout">
        <section className="document-upload-card">
          <h2>Document Upload</h2>
          <p>Please upload clear, legible copies of the required documents. Supported formats: JPG, PNG, PDF (Max 5MB each).</p>

          <label className={`passport-upload-box${passportFile ? ' passport-upload-box-complete' : ''}`}>
            <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleFileChange} required />
            <SectionIcon type={passportFile ? 'check' : 'image'} />
            <strong>Passport Photo</strong>
            <span>{passportFile ? passportFile.name : 'Click or drag file here'}</span>
          </label>
        </section>

        <ReviewSummary data={data} onEdit={onEdit} />
      </div>

      <label className="confirmation-check">
        <input type="checkbox" required />
        <span>I confirm all information provided is accurate and true to the best of my knowledge. I understand that submitting false information may result in application rejection or legal action.</span>
      </label>

      <div className="loan-app-actions review-actions">
        <button type="button" className="loan-app-previous" onClick={onPrevious}>
          <span aria-hidden="true">&lt;-</span>
          Previous
        </button>
        <button type="submit" className="loan-app-next">
          Submit
          <span aria-hidden="true">-&gt;</span>
        </button>
      </div>
    </form>
  );
}

function LoanApplication() {
  const [activeStep, setActiveStep] = useState(0);
  const [applicationData, setApplicationData] = useState(initialApplicationData);

  const saveAndGoNext = (values) => {
    setApplicationData((data) => ({ ...data, ...values }));
    setActiveStep((step) => Math.min(step + 1, steps.length - 1));
  };

  const goPrevious = () => {
    setActiveStep((step) => Math.max(step - 1, 0));
  };

  return (
    <section className="loan-application-page">
      <div className="loan-application-shell">
        <div className={`loan-app-stepper loan-app-stepper-${activeStep}`} aria-label="Application progress">
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

        {activeStep === 0 && <PersonalInfoStep data={applicationData} onNext={saveAndGoNext} />}
        {activeStep === 1 && <LoanDetailsStep data={applicationData} onPrevious={goPrevious} onNext={saveAndGoNext} />}
        {activeStep === 2 && <ReviewStep data={applicationData} onPrevious={goPrevious} onEdit={() => setActiveStep(0)} />}
      </div>
    </section>
  );
}

export default LoanApplication;
