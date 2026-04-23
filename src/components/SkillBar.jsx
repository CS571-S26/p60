import { useEffect, useRef, useState } from 'react';

function SkillBar({ name, level, color }) {
  const barRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="skill-bar-wrapper" ref={barRef}>
      <div className="skill-bar-header">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-level">{level}%</span>
      </div>
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${level}%` : '0%',
            background: color || 'var(--color-primary)',
          }}
        />
      </div>
    </div>
  );
}

export default SkillBar;
