import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/terminal.css';

const COMMANDS = {
  help: () => [
    '  help           show available commands',
    '  about          learn about Eshaan',
    '  experience     work history',
    '  skills         technical skills',
    '  projects       featured projects',
    '  education      academic background',
    '  contact        get in touch',
    '  theme          toggle dark/light mode',
    '  goto [page]    navigate to a page',
    '  clear          clear the terminal',
    '',
    '  Tab to autocomplete | Arrow keys for history',
  ],
  about: () => [
    '',
    '  Eshaan Chaturvedi',
    '  CS & Data Science @ UW-Madison',
    '  Junior | 3.9 GPA',
    '',
    '  I build things that are fast, reliable, and',
    '  actually useful. From low-latency C++ systems',
    '  to full-stack web apps and ML pipelines.',
    '',
    '  Currently: SWE Intern @ Cohere (LLM Inference)',
    '  Next up:   Production Engineer Intern @ Meta',
  ],
  experience: () => [
    '',
    '  WORK EXPERIENCE',
    '  ===============',
    '',
    '  [2026]  Meta | Production Engineer Intern',
    '          Infrastructure reliability at scale',
    '',
    '  [2025]  Cohere | Software Engineer Intern',
    '          LLM inference benchmarking & deployment',
    '',
    '  [2025]  PlayStation | Software Engineer Intern',
    '          CI/CD pipelines & release automation',
    '',
    '  [2024]  RIPPLR | Software Engineer Intern',
    '          Real-time dashboards & low-latency backends',
    '',
    '  [2023]  Infosys | Software Engineer Intern',
    '          Web apps & REST APIs for fintech',
  ],
  skills: () => [
    '',
    '  Languages   C++ | Python | Java | JS/TS | Go | SQL | R',
    '  Frontend    React | Node.js | HTML/CSS | WebRTC',
    '  Backend     PostgreSQL | MongoDB | Redis | Docker | AWS',
    '  ML/Data     TensorFlow | PyTorch | NumPy | Pandas',
    '  DevOps      GitHub Actions | Docker | CI/CD | Helm',
    '',
    '  Type "projects" to see these in action.',
  ],
  projects: () => [
    '',
    '  1. QuantFlow         Real-time options pricing engine (C++)',
    '  2. PixelForge Tech   Full-stack platform w/ AI (React+Python)',
    '  3. AstroClassifier   Space debris ML model (TensorFlow)',
    '  4. LLM Benchmarking  Inference perf testing (Python+AWS)',
    '  5. CI/CD Automation  Release pipelines (Docker+Actions)',
    '  6. This Portfolio    Interactive React app',
    '',
    '  Type "goto projects" for the full interactive view.',
  ],
  education: () => [
    '',
    '  University of Wisconsin-Madison',
    '  B.S. Computer Science & Data Science',
    '  Expected May 2027 | GPA: 3.9/4.0',
    '',
    '  Key Coursework:',
    '    Data Structures & Algorithms',
    '    Artificial Intelligence',
    '    Machine Learning',
    '    Computer Systems',
    '    Advanced Statistics',
  ],
  contact: () => [
    '',
    '  Email     eshaanchaturvedi@gmail.com',
    '  GitHub    github.com/esh-07',
    '  LinkedIn  linkedin.com/in/eshaan-chaturvedi',
    '',
    '  Feel free to reach out!',
  ],
};

const COMMAND_NAMES = [...Object.keys(COMMANDS), 'clear', 'theme', 'goto'];
const VALID_PAGES = ['home', 'about', 'projects', 'guestbook'];

function InteractiveTerminal({ onToggleTheme }) {
  const [lines, setLines] = useState([
    { type: 'system', text: "Welcome to Eshaan's Portfolio Terminal v1.0" },
    { type: 'system', text: 'Type "help" for available commands.' },
    { type: 'blank', text: '' },
  ]);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const addOutputLines = useCallback((outputLines) => {
    setLines((prev) => [
      ...prev,
      ...outputLines.map((text) => ({
        type: text === '' ? 'blank' : 'output',
        text,
      })),
      { type: 'blank', text: '' },
    ]);
  }, []);

  const handleCommand = useCallback(
    (cmd) => {
      const trimmed = cmd.trim().toLowerCase();
      const parts = trimmed.split(/\s+/);
      const command = parts[0];
      const args = parts.slice(1);

      // Add the input line
      setLines((prev) => [...prev, { type: 'input', text: cmd }]);

      if (cmd.trim()) {
        setHistory((prev) => [cmd.trim(), ...prev]);
      }
      setHistoryIndex(-1);

      if (!command) {
        setLines((prev) => [...prev, { type: 'blank', text: '' }]);
        return;
      }

      if (command === 'clear') {
        setLines([]);
        return;
      }

      if (command === 'theme') {
        if (onToggleTheme) onToggleTheme();
        addOutputLines(['  Theme toggled!']);
        return;
      }

      if (command === 'goto') {
        const page = args[0];
        if (VALID_PAGES.includes(page)) {
          addOutputLines([`  Navigating to /${page === 'home' ? '' : page}...`]);
          setTimeout(() => {
            navigate(page === 'home' ? '/' : `/${page}`);
          }, 300);
          return;
        }
        addOutputLines([
          `  Unknown page: "${page || ''}"`,
          `  Valid pages: ${VALID_PAGES.join(', ')}`,
        ]);
        return;
      }

      if (COMMANDS[command]) {
        addOutputLines(COMMANDS[command]());
        return;
      }

      addOutputLines([
        `  Command not found: "${command}"`,
        '  Type "help" for available commands.',
      ]);
    },
    [navigate, onToggleTheme, addOutputLines]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(input);
      setInput('');
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (!input) return;
      const matches = COMMAND_NAMES.filter((c) =>
        c.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      } else if (matches.length > 1) {
        setLines((prev) => [
          ...prev,
          { type: 'system', text: `  ${matches.join('  ')}` },
        ]);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      className="terminal-window"
      onClick={focusInput}
      role="application"
      aria-label="Interactive terminal"
    >
      <div className="terminal-titlebar">
        <div className="terminal-dots">
          <span className="terminal-dot terminal-dot-red" />
          <span className="terminal-dot terminal-dot-yellow" />
          <span className="terminal-dot terminal-dot-green" />
        </div>
        <span className="terminal-title">eshaan@portfolio ~ %</span>
        <div className="terminal-dots-spacer" />
      </div>

      <div className="terminal-body" ref={terminalRef}>
        {lines.map((line, i) => (
          <div key={i} className={`terminal-line terminal-line-${line.type}`}>
            {line.type === 'input' && (
              <span className="terminal-prompt">$ </span>
            )}
            <span>{line.text}</span>
          </div>
        ))}

        <div className="terminal-input-line">
          <span className="terminal-prompt">$ </span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
          />
        </div>
      </div>
    </div>
  );
}

export default InteractiveTerminal;
