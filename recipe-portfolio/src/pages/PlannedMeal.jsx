import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePlanner } from '../context/PlannerContext';
import Navbar from '../components/Navbar.jsx';

export default function PlannedMeal(){
  const { id } = useParams();
  const { plans } = usePlanner();
  const meal = plans.find(p => String(p.id) === String(id));

  if(!meal) return (
    <div style={{padding:24}}>
      <h2>Planned meal not found</h2>
      <Link to="/planner">Back to planner</Link>
    </div>
  );

  return (
    <div style={{padding:24, textAlign: 'center', marginTop: 100}}>
      <Navbar />
      <h1>{meal.name}</h1>
      <p>{meal.description}</p>
      <p>Calories: {meal.calories}</p>
      <div style={{marginTop:16}}>
        <Link to="/planner" className="btn">Back to Planner</Link>
      </div>
    </div>
  );
}
