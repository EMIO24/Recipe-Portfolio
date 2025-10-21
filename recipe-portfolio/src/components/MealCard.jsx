import propstypes from 'prop-types';


export default function MealCard({ name, description, calories }) {
  return (
    <div className="meal-card">
      <img src='' alt={name} />
      <h2>{name}</h2>
      <p>{description}</p>
      <span>{calories} calories</span>
    </div>
  );
}

MealCard.propTypes = {
  name: propstypes.string,
  description: propstypes.string,
  calories: propstypes.number,
};
