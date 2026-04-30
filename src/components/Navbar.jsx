import { NavLink } from 'react-router-dom';
import RBNavbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ThemeToggle from './ThemeToggle';
import '../styles/navbar.css';

const IS_MAC =
  typeof navigator !== 'undefined' &&
  navigator.platform.toUpperCase().includes('MAC');

function Navbar({ theme, toggleTheme }) {
  const triggerCommandPalette = () => {
    const isMacNow = navigator.platform.toUpperCase().includes('MAC');
    window.dispatchEvent(
      new KeyboardEvent('keydown', {
        key: 'k',
        metaKey: isMacNow,
        ctrlKey: !isMacNow,
        bubbles: true,
      })
    );
  };

  return (
    <RBNavbar expand="lg" className="navbar-portfolio" sticky="top" role="navigation" aria-label="Main navigation">
      <Container fluid className="navbar-inner-portfolio">
        <RBNavbar.Brand as={NavLink} to="/" end className="navbar-logo">
          EC
        </RBNavbar.Brand>
        <RBNavbar.Toggle aria-controls="main-navbar-nav" aria-label="Toggle navigation menu" />
        <RBNavbar.Collapse id="main-navbar-nav">
          <Nav className="ms-auto navbar-nav-portfolio align-items-lg-center">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/projects">
              Projects
            </Nav.Link>
            <Nav.Link as={NavLink} to="/guestbook">
              Guestbook
            </Nav.Link>
            <button
              type="button"
              className="cmd-k-hint"
              onClick={triggerCommandPalette}
              aria-label="Open command palette"
              title="Open command palette"
            >
              <kbd aria-hidden="true">{IS_MAC ? '⌘' : 'Ctrl'}</kbd>
              <kbd aria-hidden="true">K</kbd>
              <span className="cmd-k-label">Search</span>
            </button>
            <div className="navbar-theme-wrap">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            </div>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}

export default Navbar;
