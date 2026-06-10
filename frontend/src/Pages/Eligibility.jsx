import './Eligibility.css';

function Eligibility() {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.checkValidity()) {
      event.currentTarget.reportValidity();
      return;
    }

    window.location.href = '/loan-application';
  };

  return (
    <section className="eligibility-page">
      <div className="eligibility-heading">
        <h1>Check Your Loan Eligibility</h1>
        <p>
          Provide a few basic details to estimate how much you can borrow securely
          and responsibly.
        </p>
      </div>

      <form className="eligibility-form" onSubmit={handleSubmit}>
        <label className="eligibility-field">
          <span>Do you have a business of your own or a shop?</span>
          <select defaultValue="Yes" aria-label="Business or shop ownership" required>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>

        <label className="eligibility-field">
          <span>Do you have a payslip / salary?</span>
          <select defaultValue="Yes" aria-label="Payslip or salary status" required>
            <option>Yes</option>
            <option>No</option>
          </select>
        </label>

        <button className="eligibility-submit" type="submit">
          Apply
        </button>
      </form>
    </section>
  );
}

export default Eligibility;
