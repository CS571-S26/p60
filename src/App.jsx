import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import CommandPalette from './components/CommandPalette';
import SkipLink from './components/SkipLink';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Guestbook from './pages/Guestbook';
import './styles/global.css';
import './styles/bootstrap-overrides.css';
import './styles/extras.css';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute(
      'data-bs-theme',
      theme === 'light' ? 'light' : 'dark'
    );
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <SkipLink targetId="main-content" />
      <ScrollToTop />
      <ScrollProgress />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main id="main-content" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home onToggleTheme={toggleTheme} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/guestbook" element={<Guestbook />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <CommandPalette theme={theme} onToggleTheme={toggleTheme} />
    </>
  );
}

export default App;
