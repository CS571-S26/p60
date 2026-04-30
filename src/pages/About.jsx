import { useEffect, useRef } from 'react';
import ExperienceCard from '../components/ExperienceCard';
import SkillBar from '../components/SkillBar';
import ContactForm from '../components/ContactForm';
import '../styles/about.css';

const EXPERIENCES = [
  {
    company: 'Meta',
    role: 'Incoming Production Engineer Intern',
    date: 'Summer 2026',
    description:
      'Production engineering focused on infrastructure reliability and performance at massive scale.',
    tags: ['Infrastructure', 'Reliability', 'Performance'],
    isUpcoming: true,
  },
  {
    company: 'Cohere',
    role: 'Software Engineer Intern',
    date: '2025 - 2026',
    description:
      'Worked on the foundational LLM inference team. Built benchmarking infrastructure, automated deployment pipelines, and performance monitoring systems.',
    tags: ['Python', 'AWS', 'LLM Inference', 'CI/CD'],
  },
  {
    company: 'PlayStation (Sony Interactive Entertainment)',
    role: 'Software Engineer Intern',
    date: 'Summer 2025',
    description:
      'Developer infrastructure team. Built CI/CD pipelines and automated release systems used across the organization.',
    tags: ['Docker', 'GitHub Actions', 'Python'],
  },
  {
    company: 'RIPPLR',
    role: 'Software Engineer Intern',
    date: '2024',
    description:
      'Built real-time dashboards and high-performance backend systems with a focus on low-latency data processing.',
    tags: ['React', 'Node.js', 'Real-time Systems'],
  },
  {
    company: 'Infosys',
    role: 'Software Engineer Intern',
    date: 'Late 2023',
    description:
      'Developed web applications and REST APIs for fintech use cases.',
    tags: ['Java', 'REST APIs', 'Fintech'],
  },
];

const SKILL_BARS = [
  { name: 'C++ / Systems', level: 90, color: 'linear-gradient(90deg, #2563eb, #7c3aed)' },
  { name: 'Python', level: 92, color: 'linear-gradient(90deg, #059669, #10b981)' },
  { name: 'React / Frontend', level: 85, color: 'linear-gradient(90deg, #3b82f6, #60a5fa)' },
  { name: 'Node.js / Backend', level: 82, color: 'linear-gradient(90deg, #7c3aed, #a78bfa)' },
  { name: 'AWS / Infrastructure', level: 78, color: 'linear-gradient(90deg, #f59e0b, #fbbf24)' },
  { name: 'ML / Data Science', level: 80, color: 'linear-gradient(90deg, #ef4444, #f87171)' },
];

const SKILL_TAGS = {
  Languages: ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL', 'Go', 'R'],
  Frontend: ['React', 'Node.js', 'HTML/CSS', 'REST APIs', 'WebRTC'],
  'Backend & Infra': ['PostgreSQL', 'MongoDB', 'Redis', 'Docker', 'AWS', 'GitHub Actions'],
  'Data & ML': ['TensorFlow', 'PyTorch', 'NumPy', 'SciPy', 'Pandas'],
};

function About() {
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el) => observerRef.current.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section className="about">
      <div className="container">
        <h1 className="page-title fade-in">About Me</h1>
        <p className="about-intro fade-in">
          I&apos;m Eshaan, a junior at UW-Madison studying Computer Science and Data Science.
          I&apos;ve interned at companies ranging from startups to big tech, working across
          infrastructure, ML systems, and full-stack development. I enjoy building things
          that are fast, reliable, and actually useful.
        </p>

        <div className="about-section fade-in">
          <h2 className="about-section-title">Experience</h2>
          <div className="experience-list stagger-children">
            {EXPERIENCES.map((exp) => (
              <div key={exp.company} className="fade-in">
                <ExperienceCard
                  company={exp.company}
                  role={exp.role}
                  date={exp.date}
                  description={exp.description}
                  tags={exp.tags}
                  isUpcoming={exp.isUpcoming}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="about-section fade-in">
          <h2 className="about-section-title">Education</h2>
          <div className="education-card fade-in">
            <p className="timeline-company">University of Wisconsin-Madison</p>
            <p className="timeline-role">B.S. in Computer Science &amp; Data Science</p>
            <p className="timeline-date">Expected May 2027 &nbsp;&middot;&nbsp; 3.9 / 4.0 GPA</p>
            <p className="timeline-desc">
              Coursework: Data Structures &amp; Algorithms, OOP, Linear Algebra,
              Artificial Intelligence, Machine Learning, Computer Systems, Advanced Statistics
            </p>
          </div>
        </div>

        <div className="about-section fade-in">
          <h2 className="about-section-title">Proficiency</h2>
          <div className="skill-bars-grid">
            {SKILL_BARS.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
                color={skill.color}
              />
            ))}
          </div>
        </div>

        <div className="about-section fade-in">
          <h2 className="about-section-title">Tech Stack</h2>
          <div className="skills-grid stagger-children">
            {Object.entries(SKILL_TAGS).map(([category, tags]) => (
              <div key={category} className="skill-category fade-in">
                <p className="skill-category-title">{category}</p>
                <div className="skill-tags">
                  {tags.map((tag) => (
                    <span key={tag} className="skill-tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="about-section fade-in">
          <h2 className="about-section-title">Contact</h2>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export default About;
