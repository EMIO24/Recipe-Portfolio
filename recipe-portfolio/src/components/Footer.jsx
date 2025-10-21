
import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Quick Links</h4>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/recipes">Recipes</Link>
            <Link to="/planner">Meal Planner</Link>
            <Link to="/shopping">Shopping List</Link>
          </nav>
        </div>
        <div className="footer-section">
          <h4>About</h4>
          <p>Your personal recipe management and meal planning solution.</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Questions or suggestions? Reach out to us!</p>
          <a href="mailto:contact@recipeportfolio.com">contact@recipeportfolio.com</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Recipe Portfolio. All rights reserved.</p>
      </div>
    </footer>
  );
}
