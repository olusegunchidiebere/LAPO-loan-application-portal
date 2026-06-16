import { Link } from 'react-router-dom';
import './Topbar.css';
import LapoLogo from '../assets/LapoLogo.png';

export default function Topbar() {
  const navItems = [
    { label: 'Home', to: '/#home' },
    { label: 'About Us', to: '/#about-us' },
    { label: 'Products', to: '/#products' },
    { label: 'Sustainability', to: '/#sustainability' },
    { label: 'Media', to: '/#footer' },
    { label: 'Contact Us', to: '/#footer' },
  ];

  return (
    <nav className="topbar">
      <div className="topbar-container">
        <div className="topbar-logo">
          <img src={LapoLogo} alt="Lapo Logo" />
        </div>
        <ul className="topbar-nav">
          {navItems.map((item, index) => (
            <li key={index}>
              <Link to={item.to}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link to="/eligibility" className="topbar-cta-button">Get a Loan</Link>
      </div>
    </nav>
  );
}
