import React from 'react';
import './QuoteCard.css';

const QuoteCard = ({ quote }) => {
  return (
    <div className="quote-card">
      <div className="quote-content">
        <p>"{quote.quoteText}"</p>
        <h5>- {quote.quoteAuthor}</h5>
      </div>
    </div>
  );
};

export default QuoteCard;
