import { NavLink } from 'react-router-dom';
import '../styles/footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h2 className="footer-logo">EC</h2>
            <p className="footer-tagline">
              Building software that scales, from low-latency systems to full-stack apps.
            </p>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <h3 className="footer-nav-title">Navigation</h3>
            <ul className="footer-nav-list">
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/about">About</NavLink></li>
              <li><NavLink to="/projects">Projects</NavLink></li>
              <li><NavLink to="/guestbook">Guestbook</NavLink></li>
            </ul>
          </nav>

          <div className="footer-connect">
            <h3 className="footer-nav-title">Connect</h3>
            <ul className="footer-nav-list">
              <li>
                <a href="https://github.com/esh-07" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/eshaan-chaturvedi-9718851a1" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="mailto:eshaanchaturvedi@gmail.com">
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Eshaan Chaturvedi. Built with React.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
