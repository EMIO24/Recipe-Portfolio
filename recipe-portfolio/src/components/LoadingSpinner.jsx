import React from 'react';

export default function LoadingSpinner() {
  return (
    <div role="status" aria-live="polite" className="loading-spinner">
      <svg width="48" height="48" viewBox="0 0 50 50" aria-hidden>
        <circle cx="25" cy="25" r="20" strokeWidth="4" stroke="var(--border)" fill="none" />
        <path d="M45 25a20 20 0 0 0-36.6-11" strokeWidth="4" stroke="var(--primary)" strokeLinecap="round" fill="none">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
        </path>
      </svg>
    </div>
  );
}
