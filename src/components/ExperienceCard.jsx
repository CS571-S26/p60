import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Collapse from 'react-bootstrap/Collapse';
import Button from 'react-bootstrap/Button';

function ExperienceCard({ company, role, date, description, tags, isUpcoming }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className={`experience-card ${isUpcoming ? 'experience-upcoming' : ''}`}>
      <Card.Body className="experience-card-body">
        <div className="experience-card-header">
          <div className="experience-card-info">
            <Card.Title as="h3" className="experience-company h6 mb-0">
              {company}
            </Card.Title>
            <p className="experience-role">{role}</p>
          </div>
          <div className="experience-card-meta">
            <span className="experience-date">{date}</span>
            {isUpcoming && (
              <Badge bg="primary" pill className="experience-upcoming-badge">
                Upcoming
              </Badge>
            )}
          </div>
        </div>

        <Collapse in={expanded}>
          <div>
            <p className="experience-desc">{description}</p>
            {tags && tags.length > 0 && (
              <div className="experience-tags">
                {tags.map((tag) => (
                  <span key={tag} className="experience-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </Collapse>

        <Button
          variant="link"
          size="sm"
          className="experience-toggle p-0"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? 'Show less' : 'Show more'}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default ExperienceCard;
