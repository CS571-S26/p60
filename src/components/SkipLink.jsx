function SkipLink({ targetId = 'main-content' }) {
  const handleClick = (e) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (!target) return;
    target.focus({ preventScroll: true });
    const top = target.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <a href="#main" className="skip-link" onClick={handleClick}>
      Skip to main content
    </a>
  );
}

export default SkipLink;
