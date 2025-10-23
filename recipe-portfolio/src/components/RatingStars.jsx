import React from 'react';

export default function RatingStars({ rating }) {
  return (
    <div className="rating-stars">
      {[...Array(5)].map((_, index) => (
        <span key={index} className={index < rating ? "filled" : "empty"}>
          ★
        </span>
      ))}
    </div>
  );
}
