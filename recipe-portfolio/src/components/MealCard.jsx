import React from 'react';
import PropTypes from 'prop-types';

export default function MealCard({ name, description, calories, onViewRecipe, onSaveToShopping }) {
  return (
    <article className="meal-card">
      <div className="meal-card-body">
        <h3>{name}</h3>
        <p className="meal-desc">{description}</p>
        <div className="meal-meta">{calories} cal</div>
      </div>
      {(onViewRecipe || onSaveToShopping) && (
        <div className="meal-card-actions">
          {onViewRecipe && <button className="btn small" onClick={onViewRecipe}>View</button>}
          {onSaveToShopping && <button className="btn small" onClick={onSaveToShopping}>Add to Shopping</button>}
        </div>
      )}
    </article>
  );
}

MealCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  calories: PropTypes.number,
  onViewRecipe: PropTypes.func,
  onSaveToShopping: PropTypes.func,
};
