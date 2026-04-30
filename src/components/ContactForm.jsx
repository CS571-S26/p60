import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const MESSAGE_MAX = 500;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'success'

  const errors = {
    name: !name.trim() ? 'Name is required.' : '',
    email: !email.trim()
      ? 'Email is required.'
      : !EMAIL_RE.test(email.trim())
      ? 'Please enter a valid email address.'
      : '',
    message:
      !message.trim()
        ? 'Message is required.'
        : message.trim().length < 10
        ? 'Message must be at least 10 characters.'
        : '',
  };

  const isValid = !errors.name && !errors.email && !errors.message;
  const charsLeft = MESSAGE_MAX - message.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    if (!isValid) return;

    setStatus('sending');
    // Compose mailto so the user actually has a path forward; also show inline success.
    const subject = encodeURIComponent(`Portfolio contact from ${name.trim()}`);
    const body = encodeURIComponent(`${message.trim()}\n\n— ${name.trim()} (${email.trim()})`);
    const mailto = `mailto:eshaanchaturvedi@gmail.com?subject=${subject}&body=${body}`;

    setTimeout(() => {
      window.location.href = mailto;
      setStatus('success');
      setName('');
      setEmail('');
      setMessage('');
      setTouched({});
    }, 350);
  };

  const handleBlur = (field) => setTouched((prev) => ({ ...prev, [field]: true }));

  const showError = (field) => touched[field] && errors[field];

  return (
    <Card className="contact-form-card">
      <Card.Body>
        <Card.Title as="h3" className="h5 mb-2">
          Get in touch
        </Card.Title>
        <p className="text-muted small mb-3">
          Fill out the form and I&apos;ll get back to you. Submitting opens your mail client with the message pre-filled.
        </p>

        {status === 'success' && (
          <Alert
            variant="success"
            dismissible
            onClose={() => setStatus('idle')}
            className="contact-success"
          >
            Your mail client should have opened. If it didn&apos;t, email{' '}
            <a href="mailto:eshaanchaturvedi@gmail.com">eshaanchaturvedi@gmail.com</a> directly.
          </Alert>
        )}

        <Form onSubmit={handleSubmit} noValidate>
          <Form.Group className="mb-3" controlId="contact-name">
            <Form.Label className="portfolio-form-label">Your name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => handleBlur('name')}
              maxLength={80}
              isInvalid={!!showError('name')}
              required
              placeholder="Jane Doe"
              autoComplete="name"
            />
            <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="contact-email">
            <Form.Label className="portfolio-form-label">Your email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => handleBlur('email')}
              maxLength={120}
              isInvalid={!!showError('email')}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
            <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-2" controlId="contact-message">
            <Form.Label className="portfolio-form-label">Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MESSAGE_MAX))}
              onBlur={() => handleBlur('message')}
              isInvalid={!!showError('message')}
              required
              placeholder="What would you like to talk about?"
            />
            <Form.Control.Feedback type="invalid">{errors.message}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mt-3">
            <span
              className={`char-counter small ${charsLeft < 50 ? 'warning' : ''}`}
              aria-live="polite"
            >
              {charsLeft} characters remaining
            </span>
            <Button
              type="submit"
              variant="primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Opening mail…' : 'Send message'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default ContactForm;
