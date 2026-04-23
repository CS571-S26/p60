import { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Stack from 'react-bootstrap/Stack';
import ParticleField from '../components/ParticleField';
import InteractiveTerminal from '../components/InteractiveTerminal';
import '../styles/home.css';

const TITLES = [
  'Software Engineer',
  'Systems Builder',
  'Full-Stack Developer',
  'ML Enthusiast',
];

const STATS = [
  { value: 5, label: 'Internships' },
  { value: 6, label: 'Projects' },
  { value: 12, suffix: '+', label: 'Technologies' },
  { value: 3.9, label: 'GPA', isDecimal: true },
];

function Home({ onToggleTheme }) {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0, 0]);

  // Typing animation
  useEffect(() => {
    const current = TITLES[titleIndex];
    const speed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === current.length) {
      const pause = setTimeout(() => setIsDeleting(true), 1800);
      return () => clearTimeout(pause);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((prev) => (prev + 1) % TITLES.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, titleIndex]);

  // Stats counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsVisible) return;

    const duration = 1500;
    const steps = 40;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setCounts(
        STATS.map((s) =>
          s.isDecimal
            ? Math.round(eased * s.value * 10) / 10
            : Math.round(eased * s.value)
        )
      );

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, [statsVisible]);

  const displayedTitle = TITLES[titleIndex].slice(0, charIndex);

  return (
    <section className="home">
      <div className="home-bg-shapes" aria-hidden="true">
        <ParticleField />
        <div className="home-shape home-shape-1" />
        <div className="home-shape home-shape-2" />
        <div className="home-shape home-shape-3" />
      </div>

      <div className="home-content">
        <p className="home-greeting">Hello, I&apos;m</p>
        <h1 className="home-name">
          <span className="home-name-gradient">Eshaan Chaturvedi</span>
        </h1>
        <p className="home-typing" aria-label="Rotating titles">
          <span className="home-typing-text">{displayedTitle}</span>
          <span className="home-cursor" aria-hidden="true">|</span>
        </p>
        <p className="home-tagline">
          Computer Science &amp; Data Science @ UW-Madison.
          Building software that scales, from low-latency systems to full-stack applications.
        </p>
        <Stack direction="horizontal" gap={3} className="home-links flex-wrap justify-content-center">
          <Button
            variant="primary"
            href="https://github.com/esh-07"
            target="_blank"
            rel="noopener noreferrer"
            as="a"
            className="home-btn-primary"
          >
            GitHub
          </Button>
          <Button
            variant="outline-primary"
            href="https://www.linkedin.com/in/eshaan-chaturvedi-9718851a1"
            target="_blank"
            rel="noopener noreferrer"
            as="a"
            className="home-btn-outline"
          >
            LinkedIn
          </Button>
          <Button
            variant="outline-secondary"
            href="mailto:eshaanchaturvedi@gmail.com"
            as="a"
            className="home-btn-outline"
          >
            Email Me
          </Button>
        </Stack>
      </div>

      <div className="home-stats" ref={statsRef}>
        {STATS.map((stat, i) => (
          <div key={stat.label} className="home-stat-item">
            <span className="home-stat-value">
              {stat.isDecimal ? counts[i].toFixed(1) : counts[i]}
              {stat.suffix || ''}
            </span>
            <span className="home-stat-label">{stat.label}</span>
          </div>
        ))}
      </div>

      <div className="home-terminal-section">
        <div className="home-terminal-label">
          <p>Try the interactive terminal below. Type <span>help</span> to get started.</p>
        </div>
        <InteractiveTerminal onToggleTheme={onToggleTheme} />
      </div>
    </section>
  );
}

export default Home;
