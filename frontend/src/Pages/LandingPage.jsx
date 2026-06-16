import { Link } from 'react-router-dom';
import '../Components/LandingPage.css';
import PersonApplyLoan from '../assets/PersonApplyLoan.png';
import SecurePlatformImg from '../assets/SecurePlatform-img.png';
import SimpleProcessImg from '../assets/simpleProcess-img.png';
import LapoLogo from '../assets/LapoLogo.png';
import circle from '../assets/circle.png';
import AminaBello from '../assets/AminaBello-img.png';
import MichaelOkoro from '../assets/MichaelOkoro-img.png';
import SarahJohnson from '../assets/SarahJohnson-img.png';

const testimonials = [
  {
    title: "SMOOTH PROCESS",
    quote:
      "The online process was incredibly smooth. I applied for an SME loan and received approval within days. It transformed my business operations.",
    name: "Sarah Johnson",
    role: "SME Owner",
    avatar: SarahJohnson,
    large: true,
  },
  {
    quote:
      "The group loan we secured through the portal allowed our cooperative to buy new equipment. Highly recommend their transparent process.",
    name: "Amina Bello",
    role: "Cooperative Leader",
    avatar: AminaBello,
  },
  {
    quote:
      "I needed quick funds for a personal emergency, and LAPO's digital platform made it hassle-free. Secure and efficient.",
    name: "Michael Okoro",
    role: "Personal Loan Client",
    avatar: MichaelOkoro,
  },
];

function LandingPage() {
    return (
        <div className="landingPage-container">
            <div className="first-box" id="home">
                <h1 className="FirstBox-header">Apply For Your <span className="omo">LAPO</span> Loan Anywhere, Anytime</h1>
                <img src={PersonApplyLoan} alt="PersonApplyingLoan" className="PersonLoan" />
            </div>
            <div className="submit-yada">
                <p className="submit-text">Submit your loan application online and receive updates<br />
                directly from your device. Experience seamless digital<br />
                banking tailored for your needs.<br /></p>
            </div>
            <div>
                <Link to="/eligibility" className="loan-buttons1">Apply Now</Link>
                <Link to="/check-balance" className="loan-buttons2">Check Loan Balance</Link>
            </div>
            <section className="why-choose-us" id="about-us">
            <header className="section-header">
                <p className="section-tagline">WHY CHOOSE US</p>
                <h2 className="section-title">Everything You Need to Apply With Confidence</h2>
            </header>

            <div className="cards-grid">
                {/* Card 1: Easy Application */}
                <article className="card card-easy-app">
                <div className="card-header">
                    <h3 className="card-title">Easy Application</h3>
                    <p className="card-description">Apply in minutes from anywhere.</p>
                </div>
                <div className="card-illustration">
                    <div className="easy-app-mockup">
                    <div className="mockup-header">
                        <span className="mockup-step">Step 1 of 3</span>
                        <div className="mockup-progress-track">
                        <div className="mockup-progress-fill"></div>
                        </div>
                    </div>
                    <div className="mockup-fields">
                        <div className="mockup-field field-active"></div>
                        <div className="mockup-field"></div>
                    </div>
                    </div>
                </div>
                </article>

                {/* Card 2: Fast Processing */}
                <article className="card card-fast-proc">
                <div className="card-header">
                    <h3 className="card-title">Fast Processing</h3>
                    <p className="card-description">Applications are reviewed and processed quickly by our team.</p>
                </div>
                <div className="card-illustration">
                    <ul className="checklist">
                    <li className="checklist-item checklist-item-active">
                        <span className="check-circle"></span>
                        <span className="check-text">Received</span>
                    </li>
                    <li className="checklist-item checklist-item-active">
                        <span className="check-circle"></span>
                        <span className="check-text">Under Review</span>
                    </li>
                    <li className="checklist-item checklist-item-inactive">
                        <span className="check-circle"></span>
                        <span className="check-text">Verification</span>
                    </li>
                    </ul>
                </div>
                </article>

                {/* Card 3: Secure Platform */}
                <article className="card card-secure">
                <div className="card-header">
                    <h3 className="card-title">Secure Platform</h3>
                    <p className="card-description">Your personal and financial data is fully encrypted and protected.</p>
                </div>
                <div className="card-illustration">
                    <img src={SecurePlatformImg} alt="Secure Platform" className="card-image" />
                </div>
                </article>

                {/* Card 4: Simple Process */}
                <article className="card card-simple">
                <div className="card-header">
                    <h3 className="card-title">Simple Process</h3>
                    <p className="card-description">Three guided steps and your application is complete.</p>
                </div>
                <div className="card-illustration">
                    <img src={SimpleProcessImg} alt="Simple Process" className="card-image" />
                </div>
                </article>

                {/* Card 5: Any Loan Type, One Platform */}
                <article className="card card-loan-type">
                <div className="card-header">
                    <h3 className="card-title">Any Loan Type, One Platform</h3>
                    <p className="card-description">From personal loans to SME and agricultural financing, apply for any LAPO loan product in one place.</p>
                </div>
                <div className="card-illustration">
                    <div className="tags-container">
                    <span className="loan-tag">Personal</span>
                    <span className="loan-tag">SME</span>
                    <span className="loan-tag">Agriculture</span>
                    <span className="loan-tag">Education</span>
                    </div>
                </div>
                </article>

                {/* Card 6: Easy Document Upload */}
                <article className="card card-upload">
                <div className="card-header">
                    <h3 className="card-title">Easy Document Upload</h3>
                    <p className="card-description">Upload all required documents directly from your device in one step.</p>
                </div>
                <div className="card-illustration">
                    <div className="upload-mockup">
                    <div className="upload-file-status">
                        <span className="file-name">ID_Card.pdf</span>
                        <span className="check-icon">
                        <svg viewBox="0 0 24 24" className="check-svg" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" fill="#09825d" />
                            <path d="M8.5 12.5 L11 15 L16 9" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        </span>
                    </div>
                    <div className="upload-progress-track">
                        <div className="upload-progress-fill"></div>
                    </div>
                    </div>
                </div>
                </article>
            </div>
            </section>
                <section className="loan-products" id="products">
                <header className="section-header">
                    <h2 className="section-title">Our Loan Products</h2>
                </header>

                <div className="products-grid">
                    {/* Card 1: Business Loans */}
                    <article className="product-card">
                    <div className="card-icon-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#09825d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loan-icon">
                        <path d="M3 9h18M3 9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h18a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2M3 9v12a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M9 22V12h6v10" />
                        </svg>
                    </div>
                    <h3 className="product-title">Business Loans</h3>
                    <p className="product-description">Capital injection to scale your established business operations.</p>
                    <Link to="/eligibility" className="apply-btn">Apply</Link>
                    </article>

                    {/* Card 2: SME Loans */}
                    <article className="product-card">
                    <div className="card-icon-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#09825d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loan-icon">
                        <path d="M3 9h12M3 9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2M3 9v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V9M9 22V12h4v10" />
                        <path d="M19 16v6M16 19h6" />
                        </svg>
                    </div>
                    <h3 className="product-title">SME Loans</h3>
                    <p className="product-description">Tailored support for small and medium enterprises to grow.</p>
                    <Link to="/eligibility" className="apply-btn">Apply</Link>
                    </article>

                    {/* Card 3: Agricultural Loans */}
                    <article className="product-card">
                    <div className="card-icon-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#09825d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loan-icon">
                        <circle cx="7" cy="17" r="3" />
                        <circle cx="17" cy="15" r="5" />
                        <path d="M7 14h5M12 10h3v4h-3zM12 14V8h-3v3H7M17 10h-2v2h4v-2zM2 14h2" />
                        </svg>
                    </div>
                    <h3 className="product-title">Agricultural Loans</h3>
                    <p className="product-description">Funding designed specifically for farming and agribusiness needs.</p>
                    <Link to="/eligibility" className="apply-btn">Apply</Link>
                    </article>

                    {/* Card 4: Education Loans */}
                    <article className="product-card">
                    <div className="card-icon-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#09825d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loan-icon">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                        <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
                        </svg>
                    </div>
                    <h3 className="product-title">Education Loans</h3>
                    <p className="product-description">Invest in the future with funding for educational institutions or fees.</p>
                    <Link to="/eligibility" className="apply-btn">Apply</Link>
                    </article>

                    {/* Card 5: Personal Loans */}
                    <article className="product-card">
                    <div className="card-icon-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#09825d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loan-icon">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                        </svg>
                    </div>
                    <h3 className="product-title">Personal Loans</h3>
                    <p className="product-description">Flexible financing for personal projects, emergencies, or lifestyle needs.</p>
                    <Link to="/eligibility" className="apply-btn">Apply</Link>
                    </article>

                    {/* Card 6: Group Loans */}
                    <article className="product-card">
                    <div className="card-icon-container">
                        <svg viewBox="0 0 24 24" fill="none" stroke="#09825d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="loan-icon">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                    </div>
                    <h3 className="product-title">Group Loans</h3>
                    <p className="product-description">Collaborative funding solutions for cooperatives and joint ventures.</p>
                    <Link to="/eligibility" className="apply-btn">Apply</Link>
                    </article>
                </div>
                </section>
                {/* client success stories*/}
            <section className="success-section" id="sustainability">
            <div className="success-container">
                <h2 className="success-title">Client Success Stories</h2>

                <div className="success-grid">
                <article className="testimonial-card testimonial-card-large">
                    <h3 className="testimonial-heading">{testimonials[0].title}</h3>
                    <div className="quote-icon">❞❞</div>

                    <p className="testimonial-text">{testimonials[0].quote}</p>

                    <div className="author-block author-block-large">
                    <img
                        src={testimonials[0].avatar}
                        alt={testimonials[0].name}
                        className="author-avatar author-avatar-large"
                    />
                    <div className="author-info">
                        <div className="author-name">{testimonials[0].name}</div>
                        <div className="author-role">{testimonials[0].role}</div>
                    </div>
                    </div>
                </article>

                <div className="right-column">
                    <article className="testimonial-card testimonial-card-small">
                    <div className="author-top">
                        <img
                        src={testimonials[1].avatar}
                        alt={testimonials[1].name}
                        className="author-avatar author-avatar-small"
                        />
                    </div>

                    <p className="testimonial-text testimonial-text-small">
                        “The group loan we secured through the portal allowed our
                        cooperative to buy new equipment. Highly recommend their
                        transparent process.”
                    </p>

                    <div className="author-info author-info-small">
                        <div className="author-name">{testimonials[1].name}</div>
                        <div className="author-role">{testimonials[1].role}</div>
                    </div>
                    </article>

                    <article className="testimonial-card testimonial-card-small">
                    <div className="author-top">
                        <img
                        src={testimonials[2].avatar}
                        alt={testimonials[2].name}
                        className="author-avatar author-avatar-small"
                        />
                    </div>

                    <p className="testimonial-text testimonial-text-small">
                        “I needed quick funds for a personal emergency, and LAPO's
                        digital platform made it hassle-free. Secure and efficient.”
                    </p>

                    <div className="author-info author-info-small">
                        <div className="author-name">{testimonials[2].name}</div>
                        <div className="author-role">{testimonials[2].role}</div>
                    </div>
                    </article>
                </div>
                </div>
            </div>
            </section>
            {/* footer */}
            <footer className="footer" id="footer">
            <div className="footer-top-line"></div>

            <div className="footer-content">
                <div className="footer-logo">
                <img src={LapoLogo} alt="LAPO Logo" />
                </div>

                <div className="footer-column">
                <h4>Products</h4>
                <p>Savings</p>
                <p>Cards</p>
                <p>Loans</p>
                <p>PoS</p>
                <p>Digital Banking</p>
                </div>

                <div className="footer-column">
                <h4>Company</h4>
                <p>About Us</p>
                <p>Careers</p>
                <p>Resources</p>
                <p>Awards</p>
                <p>Boards and Executives</p>
                <p>Sustainability</p>
                </div>

                <div className="footer-column">
                <h4>Media</h4>
                <p>Articles</p>
                <p>Gallery</p>
                <p>Press Release</p>
                <p>PoS</p>
                <p>FAQs</p>
                </div>

                <div className="footer-column">
                <h4>Social</h4>
                <p>X (Twitter)</p>
                <p>LinkedIn</p>
                <p>Facebook</p>
                <p>Instagram</p>
                </div>

                <div className="footer-column">
                <h4>Contact</h4>
                <p>Email</p>
                <p>Support</p>
                <p>Branch Locator</p>
                </div>
            </div>

            <div className="footer-bottom-line"></div>

            <div className="footer-bottom">
                <div className="footer-links">
                <span>Privacy Policy</span>
                <span>Cookies Policy</span>
                <span>Terms of Service</span>
                <span>Whistleblowing Policy</span>
                <span>BVN Consent</span>
                </div>

                <div className="copyright">
                © 2025 LAPO. All rights reserved.
                </div>
            </div>
            <div className="shape-green">
                <img src={circle} alt="circle" />
            </div>
            
            </footer>
        </div>
    );
}

export default LandingPage;
