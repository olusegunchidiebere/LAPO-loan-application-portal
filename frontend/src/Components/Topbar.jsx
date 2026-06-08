import './Topbar.css';
import LapoLogo from '../assets/LapoLogo.png';
export default function Topbar() {
  const navItems = ['Home', 'About Us', 'Products', 'Sustainability', 'Media', 'Contact Us'];

  return (
    <nav className="topbar">
      <div className="topbar-container">
        <div className="topbar-logo">
          <img src={LapoLogo} alt="Lapo Logo" />
        </div>
        <ul className="topbar-nav">
          {navItems.map((item, index) => (
            <li key={index}>
              <a href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}>
                {item}
              </a>
            </li>
          ))}
        </ul>
        <button className="topbar-cta-button">Get a Loan</button>
      </div>
    </nav>
  );
}
