import Topbar from './Components/Topbar';
import LandingPage from './Pages/LandingPage';
import Eligibility from './Pages/Eligibility';
import LoanApplication from './Pages/LoanApplication';
import './App.css';

function App() {
  const currentPath = window.location.pathname;
  const pages = {
    '/eligibility': <Eligibility />,
    '/loan-application': <LoanApplication />,
  };

  return (
    <div>
      <Topbar />
      <main>
        {pages[currentPath] || <LandingPage />}
      </main>
    </div>
  );
}

export default App;
