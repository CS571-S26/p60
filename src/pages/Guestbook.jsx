import { useState, useMemo, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GuestbookEntry from '../components/GuestbookEntry';
import '../styles/guestbook.css';

const MAX_CHARS = 280;
const REPLY_MAX = 200;
const ENTRIES_KEY = 'portfolio-guestbook-entries-v1';
const OWN_IDS_KEY = 'portfolio-guestbook-own-ids-v1';

function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function Guestbook() {
  const [entries, setEntries] = useState(() => loadJSON(ENTRIES_KEY, []));
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [ownIds, setOwnIds] = useState(() => loadJSON(OWN_IDS_KEY, []));
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
    } catch { /* storage unavailable */ }
  }, [entries]);

  useEffect(() => {
    try {
      localStorage.setItem(OWN_IDS_KEY, JSON.stringify(ownIds));
    } catch { /* storage unavailable */ }
  }, [ownIds]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: name.trim(),
      message: message.trim(),
      timestamp: Date.now(),
      reactions: {},
      userReactions: [],
      replies: [],
    };

    setEntries((prev) => [newEntry, ...prev]);
    setOwnIds((prev) => [...prev, newEntry.id]);
    setName('');
    setMessage('');
  };

  const handleAddReply = (entryId, replyName, replyMessage) => {
    const trimmedName = replyName.trim();
    const trimmedMsg = replyMessage.trim();
    if (!trimmedName || !trimmedMsg) return;

    const reply = {
      id: Date.now(),
      name: trimmedName,
      message: trimmedMsg,
      timestamp: Date.now(),
    };

    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id !== entryId) return entry;
        return { ...entry, replies: [...(entry.replies || []), reply] };
      })
    );
  };

  const handleReact = (entryId, emoji) => {
    setEntries((prev) =>
      prev.map((entry) => {
        if (entry.id !== entryId) return entry;

        const alreadyReacted = entry.userReactions?.includes(emoji);
        const newReactions = { ...entry.reactions };
        let newUserReactions = [...(entry.userReactions || [])];

        if (alreadyReacted) {
          newReactions[emoji] = Math.max((newReactions[emoji] || 1) - 1, 0);
          if (newReactions[emoji] === 0) delete newReactions[emoji];
          newUserReactions = newUserReactions.filter((r) => r !== emoji);
        } else {
          newReactions[emoji] = (newReactions[emoji] || 0) + 1;
          newUserReactions.push(emoji);
        }

        return { ...entry, reactions: newReactions, userReactions: newUserReactions };
      })
    );
  };

  const handleDelete = (entryId) => {
    setEntries((prev) => prev.filter((e) => e.id !== entryId));
    setOwnIds((prev) => prev.filter((id) => id !== entryId));
  };

  const totalReactions = (entry) =>
    Object.values(entry.reactions || {}).reduce((sum, n) => sum + n, 0);

  const sortedAndFiltered = useMemo(() => {
    let result = [...entries];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((e) => {
        const inMain =
          e.name.toLowerCase().includes(q) || e.message.toLowerCase().includes(q);
        const inReplies = (e.replies || []).some(
          (r) =>
            r.name.toLowerCase().includes(q) || r.message.toLowerCase().includes(q)
        );
        return inMain || inReplies;
      });
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => b.timestamp - a.timestamp);
        break;
      case 'oldest':
        result.sort((a, b) => a.timestamp - b.timestamp);
        break;
      case 'reactions':
        result.sort((a, b) => totalReactions(b) - totalReactions(a));
        break;
      default:
        break;
    }

    return result;
  }, [entries, sortBy, searchQuery]);

  const charsLeft = MAX_CHARS - message.length;

  return (
    <section className="guestbook">
      <div className="container">
        <h1 className="page-title">Guestbook</h1>
        <p className="page-subtitle">
          Leave a message, reply to threads, react with emojis, and search or sort the feed.
        </p>

        <Card className="guestbook-form-card mb-4">
          <Card.Body>
            <Card.Title as="h2" className="guestbook-form-title h5">
              Leave a Message
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="guestbook-name">
                <Form.Label className="portfolio-form-label">Your name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  maxLength={50}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="guestbook-message">
                <Form.Label className="portfolio-form-label">Your message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Write your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value.slice(0, MAX_CHARS))}
                  required
                />
              </Form.Group>
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
                <span className={`char-counter small ${charsLeft < 30 ? 'warning' : ''}`}>
                  {charsLeft} characters remaining
                </span>
                <Button type="submit" variant="primary" disabled={!name.trim() || !message.trim()}>
                  Post Message
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>

        <Row className="guestbook-controls g-2 mb-4 align-items-center">
          <Col xs={12} md>
            <Form.Group controlId="guestbook-search">
              <Form.Label className="visually-hidden">Search guestbook messages</Form.Label>
              <Form.Control
                type="search"
                placeholder="Search messages and replies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md="auto">
            <Form.Group controlId="guestbook-sort">
              <Form.Label className="visually-hidden">Sort messages</Form.Label>
              <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="reactions">Most Reacted</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={12} md="auto">
            <span className="message-count small text-muted d-block py-md-2">
              {entries.length} {entries.length === 1 ? 'message' : 'messages'}
            </span>
          </Col>
        </Row>

        <div className="guestbook-feed">
          {sortedAndFiltered.length > 0 ? (
            sortedAndFiltered.map((entry) => (
              <GuestbookEntry
                key={entry.id}
                entry={entry}
                onReact={handleReact}
                onDelete={handleDelete}
                onAddReply={handleAddReply}
                canDelete={ownIds.includes(entry.id)}
                replyMaxLength={REPLY_MAX}
              />
            ))
          ) : (
            <p className="guestbook-empty">
              {entries.length === 0
                ? 'No messages yet. Be the first to leave one!'
                : 'No messages match your search.'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Guestbook;
