import './Topbar.css';
import LapoLogo from '../assets/LapoLogo.png';
export default function Topbar() {
  const navItems = [
    { label: 'Home', href: '/#home' },
    { label: 'About Us', href: '/#about-us' },
    { label: 'Products', href: '/#products' },
    { label: 'Sustainability', href: '/#sustainability' },
    { label: 'Media', href: '/#footer' },
    { label: 'Contact Us', href: '/#footer' },
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
              <a href={item.href}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="/eligibility" className="topbar-cta-button">Get a Loan</a>
      </div>
    </nav>
  );
}
