import proptypes from 'prop-types';

export default function RecipeCard({ id, name, description, calories, image, onView, onEdit, onDelete }) {
  return (
    <article className="recipe-card" aria-labelledby={`recipe-${id}-title`}>
      <div className="recipe-image-wrap">
        <img src={image || '/assets/images/placeholder.png'} alt={name || 'Recipe image'} />
      </div>
      <div className="recipe-card-body">
        <h3 id={`recipe-${id}-title`}>{name}</h3>
        <p className="muted">{description}</p>
        <div className="recipe-meta">
          <span className="meta-item">{calories ?? 0} cal</span>
        </div>
        <div className="recipe-actions">
          {onView && <button className="btn small" onClick={onView}>View</button>}
          {onEdit && <button className="btn small secondary" onClick={onEdit}>Edit</button>}
          {onDelete && <button className="btn small" onClick={onDelete}>Delete</button>}
        </div>
      </div>
    </article>
  );
}

RecipeCard.propTypes = {
  id: proptypes.oneOfType([proptypes.string, proptypes.number]),
  name: proptypes.string,
  description: proptypes.string,
  calories: proptypes.number,
  image: proptypes.string,
  onView: proptypes.func,
  onEdit: proptypes.func,
  onDelete: proptypes.func,
};
