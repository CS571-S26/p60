import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useNow } from '../hooks/useNow';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Form from 'react-bootstrap/Form';

const REACTIONS = [
  { emoji: '👍', label: 'thumbs up' },
  { emoji: '❤️', label: 'heart' },
  { emoji: '🔥', label: 'fire' },
  { emoji: '😂', label: 'laugh' },
  { emoji: '🎉', label: 'party' },
];

function GuestbookEntry({ entry, onReact, onDelete, onAddReply, canDelete, replyMaxLength }) {
  const now = useNow();
  const [replyOpen, setReplyOpen] = useState(false);
  const [replyName, setReplyName] = useState('');
  const [replyMessage, setReplyMessage] = useState('');

  const timeAgo = (timestamp) => {
    const seconds = Math.floor((now - timestamp) / 1000);
    if (seconds < 60) return 'just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const handleReplySubmit = (e) => {
    e.preventDefault();
    onAddReply(entry.id, replyName, replyMessage);
    setReplyName('');
    setReplyMessage('');
    setReplyOpen(false);
  };

  const replies = entry.replies || [];
  const replyCharsLeft = replyMaxLength - replyMessage.length;

  return (
    <Card className="guestbook-entry-card">
      <Card.Body>
        <div className="entry-header">
          <h3 className="entry-author">{entry.name}</h3>
          <span className="entry-time" title={new Date(entry.timestamp).toLocaleString()}>
            {timeAgo(entry.timestamp)}
          </span>
        </div>
        <Card.Text as="p" className="entry-message mb-3">
          {entry.message}
        </Card.Text>

        {replies.length > 0 && (
          <ul className="entry-replies list-unstyled mb-3" aria-label="Replies to this message">
            {replies.map((r) => (
              <li key={r.id} className="entry-reply-item">
                <span className="entry-reply-author">{r.name}</span>
                <span className="entry-reply-time text-muted small ms-2">{timeAgo(r.timestamp)}</span>
                <p className="entry-reply-text mb-0 small">{r.message}</p>
              </li>
            ))}
          </ul>
        )}

        <div className="entry-footer d-flex flex-wrap align-items-center gap-2 justify-content-between">
          <div className="entry-reactions d-flex flex-wrap gap-1">
            {REACTIONS.map(({ emoji, label }) => {
              const count = entry.reactions?.[emoji] || 0;
              const reacted = entry.userReactions?.includes(emoji);
              return (
                <button
                  key={emoji}
                  type="button"
                  className={`reaction-btn ${reacted ? 'reacted' : ''}`}
                  onClick={() => onReact(entry.id, emoji)}
                  aria-label={`React with ${label}, ${count} reactions`}
                >
                  <span className="reaction-emoji">{emoji}</span>
                  {count > 0 && <span className="reaction-count">{count}</span>}
                </button>
              );
            })}
          </div>
          <div className="d-flex flex-wrap gap-2">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setReplyOpen(!replyOpen)}
              aria-expanded={replyOpen}
              aria-controls={`reply-form-${entry.id}`}
            >
              {replyOpen ? 'Cancel reply' : 'Reply'}
            </Button>
            {canDelete && (
              <Button variant="outline-danger" size="sm" onClick={() => onDelete(entry.id)}>
                Delete
              </Button>
            )}
          </div>
        </div>

        <Collapse in={replyOpen}>
          <div id={`reply-form-${entry.id}`} className="entry-reply-panel">
            <Form onSubmit={handleReplySubmit}>
              <Form.Group className="mb-2" controlId={`reply-name-${entry.id}`}>
                <Form.Label className="portfolio-form-label">Your name</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  value={replyName}
                  onChange={(e) => setReplyName(e.target.value)}
                  maxLength={50}
                  required
                  placeholder="Name for this reply"
                />
              </Form.Group>
              <Form.Group className="mb-2" controlId={`reply-message-${entry.id}`}>
                <Form.Label className="portfolio-form-label">Reply</Form.Label>
                <Form.Control
                  size="sm"
                  as="textarea"
                  rows={2}
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value.slice(0, replyMaxLength))}
                  required
                  placeholder="Write a reply…"
                />
                <Form.Text muted>{replyCharsLeft} characters remaining</Form.Text>
              </Form.Group>
              <Button type="submit" size="sm" variant="primary" disabled={!replyName.trim() || !replyMessage.trim()}>
                Post reply
              </Button>
            </Form>
          </div>
        </Collapse>
      </Card.Body>
    </Card>
  );
}

export default GuestbookEntry;
