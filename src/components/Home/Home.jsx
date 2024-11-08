import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = ({ onThemeToggle, isActive }) => {
  const navigate = useNavigate();

  const navigateToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className="main">
      <h2>Movies.com</h2>

      <nav className="signin">
        <div className="nav">
          {/* Sign-in Link */}
          <p className="sign-in-link" onClick={navigateToLoginPage}>
            Sign In
          </p>

          {/* Theme Toggle */}
          <div
            className={`theme ${isActive ? 'active' : ''}`}
            onClick={onThemeToggle}
            role="button"
            aria-label="Toggle theme"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && onThemeToggle()}
          >
            <span className="slider"></span>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Home;
