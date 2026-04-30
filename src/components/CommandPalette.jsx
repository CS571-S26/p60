import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import projects from '../data/projects';
import '../styles/command-palette.css';

function CommandPalette({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);
  const navigate = useNavigate();

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActiveIndex(0);
  }, []);

  const allCommands = useMemo(() => {
    const navCommands = [
      { id: 'nav-home', label: 'Go to Home', hint: 'Navigation', action: () => navigate('/') },
      { id: 'nav-about', label: 'Go to About', hint: 'Navigation', action: () => navigate('/about') },
      { id: 'nav-projects', label: 'Go to Projects', hint: 'Navigation', action: () => navigate('/projects') },
      { id: 'nav-guestbook', label: 'Go to Guestbook', hint: 'Navigation', action: () => navigate('/guestbook') },
    ];

    const actionCommands = [
      {
        id: 'theme-toggle',
        label: `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`,
        hint: 'Theme',
        action: () => onToggleTheme(),
      },
      {
        id: 'open-github',
        label: 'Open GitHub profile',
        hint: 'External',
        action: () => window.open('https://github.com/esh-07', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'open-linkedin',
        label: 'Open LinkedIn',
        hint: 'External',
        action: () => window.open('https://www.linkedin.com/in/eshaan-chaturvedi-9718851a1', '_blank', 'noopener,noreferrer'),
      },
      {
        id: 'send-email',
        label: 'Email Eshaan',
        hint: 'External',
        action: () => { window.location.href = 'mailto:eshaanchaturvedi@gmail.com'; },
      },
    ];

    const projectCommands = projects.map((p) => ({
      id: `project-${p.id}`,
      label: `Open project: ${p.title}`,
      hint: p.category,
      action: () => navigate('/projects'),
    }));

    return [...navCommands, ...actionCommands, ...projectCommands];
  }, [navigate, onToggleTheme, theme]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allCommands;
    return allCommands.filter(
      (c) =>
        c.label.toLowerCase().includes(q) ||
        c.hint.toLowerCase().includes(q)
    );
  }, [query, allCommands]);

  // Global keyboard trigger
  useEffect(() => {
    const handler = (e) => {
      const isMac = navigator.platform.toUpperCase().includes('MAC');
      const modKey = isMac ? e.metaKey : e.ctrlKey;
      if (modKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      const tag = (e.target.tagName || '').toLowerCase();
      const isTyping = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
      if (e.key === '/' && !isTyping && !open) {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  // Focus input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const el = listRef.current.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const runCommand = (cmd) => {
    if (!cmd) return;
    cmd.action();
    close();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      runCommand(filtered[activeIndex]);
    }
  };

  return (
    <Modal
      show={open}
      onHide={close}
      centered
      backdropClassName="cp-backdrop"
      contentClassName="cp-content"
      dialogClassName="cp-dialog"
      aria-labelledby="cp-search-label"
    >
      <div className="cp-search-row">
        <span className="cp-search-icon" aria-hidden="true">⌘</span>
        <Form.Label htmlFor="cp-search-input" id="cp-search-label" className="visually-hidden">
          Search commands and pages
        </Form.Label>
        <Form.Control
          ref={inputRef}
          id="cp-search-input"
          type="search"
          placeholder="Type a command or search... (Esc to close)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
          className="cp-input"
        />
        <span className="cp-kbd-hint" aria-hidden="true">ESC</span>
      </div>

      <ul
        ref={listRef}
        className="cp-list"
        role="listbox"
        aria-label="Available commands"
      >
        {filtered.length === 0 ? (
          <li className="cp-empty">No matches for &ldquo;{query}&rdquo;</li>
        ) : (
          filtered.map((cmd, i) => (
            <li
              key={cmd.id}
              data-index={i}
              role="option"
              aria-selected={i === activeIndex}
              className={`cp-item ${i === activeIndex ? 'active' : ''}`}
              onMouseEnter={() => setActiveIndex(i)}
              onClick={() => runCommand(cmd)}
            >
              <span className="cp-item-label">{cmd.label}</span>
              <span className="cp-item-hint">{cmd.hint}</span>
            </li>
          ))
        )}
      </ul>

      <div className="cp-footer">
        <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
        <span><kbd>↵</kbd> select</span>
        <span><kbd>esc</kbd> close</span>
      </div>
    </Modal>
  );
}

export default CommandPalette;
